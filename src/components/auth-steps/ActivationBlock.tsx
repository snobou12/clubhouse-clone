import React,{FC} from 'react'

import DoneAllIcon from '@material-ui/icons/DoneAll';
import "../../styles/auth-steps-styles/ActivationBlock.css"
import {useSelector,useDispatch} from "react-redux";
import { registration } from '../../redux/actions/authRequests';
import { RootState } from '../../redux/reducers';


interface ActivationBlockProps{
    handleClickNext:()=>void;
    handleClickPrev:()=>void;
}
const  ActivationBlock:FC<ActivationBlockProps> =({handleClickNext,handleClickPrev})=> {
    
    const dispatch = useDispatch();

    
    
    const [codes,setCodes]=React.useState(["", "", "", ""]);
    const [errorMsg,setErrorMsg]=React.useState<string>("");
    const  userData = useSelector((state:RootState)=>{
        return state.authSteps
    })
    const reduxRegistrationMessage=useSelector((state:RootState)=>{
        return state.authRequests.registrationMsg;
    })

    

    const errorValid:boolean=codes.some((v)=>(!v)) || codes.length <4;

    const handleSubmit = ()=>{
        if(errorValid){
            setErrorMsg("Invalid code, please try again")
            setTimeout(()=>{
                setErrorMsg("");
            },3000)
            return null;

        }    
        let username = userData.user_name;
        let userImagePath=!userData.user_image_file ? "defalut" : userData.user_image_file;
        
        let phone = userData.user_phone.value;
        let activationCode = "";
        for(let i=0;i<codes.length;i++){
            activationCode+=codes[i];
        }
           dispatch(registration(username,userImagePath,phone,activationCode));
           setErrorMsg("");
    }


    const handleClickNextButton=()=>{
        handleClickNext();
    }
    const handleClickPrevButton =()=>{
        handleClickPrev();
    }

    const handleChangeInput =(e:React.ChangeEvent<HTMLInputElement>)=>{ 
        const indexId= Number(e.target.getAttribute("id"))-1;
        const value = e.target.value;

        setCodes((prev)=>{
            const newArr = [...prev] as string[];
            newArr[indexId] = value;
            return newArr;
        })
        if(e.target.nextSibling){
            (e.target.nextSibling as HTMLInputElement).focus();
        }

    }
    return (
        <div className="auth-block">
            <div className="activation-block-wrapper">
                
                <div className="title-activation-block">
                    <span className="left-side-span-title">
                    <DoneAllIcon color="secondary" fontSize="large"/>
                    </span> 
                         Enter your activate code
                    <span className="right-side-span-title">
                    <DoneAllIcon color="secondary" fontSize="large"/>
                     </span> 
                </div>
                <div className="inputs-activation-block">
                        <input className="first-activation-input" id="1" type="tel" placeholder="" maxLength={1} onChange={handleChangeInput} />
                        <input className="second-activation-input" id="2" type="tel" placeholder="" maxLength={1} onChange={handleChangeInput}/>
                        <input className="third-activation-input" id="3" type="tel" placeholder="" maxLength={1} onChange={handleChangeInput}/>
                        <input className="fouth-activation-input"  id="4" type="tel" placeholder="" maxLength={1} onChange={handleChangeInput}/>
                </div>
                <div className="button-activation-block">
                <button onClick={handleClickPrevButton} className="button-auth btn-back">{'<'}- Back</button>
                     <span className="activation-block-activate-button">
                            <button disabled={!reduxRegistrationMessage.error} onClick={handleSubmit} className={reduxRegistrationMessage.error ? "button-auth-success" : "button-auth-disabled" }>Activate</button>
                    </span>
                <button disabled={reduxRegistrationMessage.error} onClick={handleClickNextButton} className={!reduxRegistrationMessage.error ?"button-auth-success " : "button-auth-disabled "}>Next -{'>'}</button>
                </div>

                <div className="footer-activation-block">
                By entering your number, you're agreeing to our Terms of Serivice and Privacy. Thanks!
                </div>
                {errorMsg ?
                 <div className="error-text-activation-block"> 
                    {errorMsg}
                 </div> 
                 : <> </>}
                 {reduxRegistrationMessage.error ? <div className="error-text-activation-block"> 
                    {reduxRegistrationMessage.message}
                </div>:<> </>}
                {!reduxRegistrationMessage.error ? <div className="success-text-activation-block">
                    {reduxRegistrationMessage.message}
                </div>:<> </>}
            </div>
        </div>
    )
}

export default ActivationBlock
