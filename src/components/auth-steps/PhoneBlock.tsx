import React,{FC} from 'react'

import NumberFormat from 'react-number-format';
import {setUserPhone} from "../../redux/actions/authSteps";
import {postActivationCode} from "../../redux/actions/authRequests";
import { useDispatch,useSelector } from 'react-redux';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import "../../styles/auth-steps-styles/PhoneBlock.css"
import { RootState } from '../../redux/reducers';

interface PhoneBlockProps {
    handleClickNext:()=>void;
    handleClickPrev:()=>void;
}

type InputValueState={
    formattedValue:string;
    value:string;
}

const  PhoneBlock:FC<PhoneBlockProps> =({handleClickNext,handleClickPrev})=> {

    const dispatch=useDispatch();

    const reduxUserPhone = useSelector((state:RootState)=>{
        return state.authSteps.user_phone;
    })

    const reduxActivationMessage = useSelector((state:RootState)=>{
        return state.authRequests.activationMsg;
    })

    const [inputValue,setInputValue]=React.useState<InputValueState>(reduxUserPhone);
    const [errorMsg,setErrorMsg]=React.useState<string>("");
    const errorValid:boolean=!inputValue.formattedValue || inputValue.formattedValue.includes("_");
    
    const handleClickSend =()=>{
        if(errorValid){
            setErrorMsg("Invalid number phone, please try again")
            setTimeout(()=>{
                setErrorMsg("");
            },3000)
            return null;
        }

        dispatch(setUserPhone(inputValue));
        dispatch(postActivationCode(inputValue.value));
        setErrorMsg("");
        
    }
    const handleClickButton = ()=>{
        handleClickNext();
    }
    const handleClickPrevButton =()=>{
        handleClickPrev();
    }
    return (
        <div className="auth-block">
            <div className="phone-block-wrapper">
                <div className="title-phone-block">
                     <span className="left-side-span-title">
                        <LocalPhoneIcon color="secondary" fontSize="large"/>
                     </span> 
                    Enter your phone #
                     <span className="right-side-span-title">
                        <LocalPhoneIcon className="rotatedPhoneIcon" color="secondary" fontSize="large"/>
                     </span> 
                </div>
                <div className="title-afterPhone-block">
                    We will send you a confirmation code
                </div>

                <div className="input-phone-block">
                    <NumberFormat className="field" format="+# (###) ###-##-##" mask="_" placeholder="+7 (999) 333-22-11" value={inputValue.value} onValueChange={({formattedValue,value})=>setInputValue({formattedValue,value})} />
                </div>
                <div className="button-phone-block">
                <button onClick={handleClickPrevButton} className="button-auth btn-back">{'<'}- Back</button>
                <span className="phone-block-send-button">
                <button disabled={!reduxActivationMessage.error} onClick={handleClickSend}  className={reduxActivationMessage.error ? "button-auth-success" : "button-auth-disabled" }>Send</button>
                </span>
                <button disabled={reduxActivationMessage.error} onClick={handleClickButton} className={!reduxActivationMessage.error ? "button-auth-success" : "button-auth-disabled" }>Next -{'>'}</button>
                </div>
                <div className="footer-phone-block">
                    By entering your number, you're agreeing to our Terms of Serivice and Privacy. Thanks!
                </div>
                {errorMsg ? 
                <div className="error-text-phone-block">
                    {errorMsg}
                </div>:<> </>
                }
                {reduxActivationMessage.error ? <div className="error-text-phone-block">
                    {reduxActivationMessage.message}
                </div>:<> </>
                }
                {!reduxActivationMessage.error ? <div className="success-text-phone-block">
                    {reduxActivationMessage.message}
                </div>:<> </>
                }
                
            </div>
        </div>
    )
}

export default PhoneBlock
