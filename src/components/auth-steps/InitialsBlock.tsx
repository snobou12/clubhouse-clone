import React,{FC} from 'react'

import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import {useDispatch,useSelector} from "react-redux";
import {setUserName} from "../../redux/actions/authSteps";
import {RootState} from "../../redux/reducers/index";
import "../../styles/auth-steps-styles/InitialsBlock.css"



interface InitialsBlockProps {
    handleClickNext: ()=>void ;
    handleClickPrev:()=>void;
}

const  InitialsBlock:FC<InitialsBlockProps> =({handleClickNext,handleClickPrev})=> {
    const dispatch=useDispatch();
    const reduxUsername = useSelector((state:RootState)=>{
        return state.authSteps.user_name;
    })
    const [username,setUsername]=React.useState<string>(reduxUsername);
    const [errorMsg,setErrorMsg]=React.useState<string>("");
    const handleChangeUsername= (e:React.ChangeEvent<HTMLInputElement>)=>{
        setUsername(e.target.value);
    }

    const handleClickPrevButton =()=>{
        handleClickPrev();
    }


    const handleClickButton = ()=>{
        setUsername(username.trim());
        let usernameSplit = username.split(" ");
       
        if(username.length < 5 || username.length > 18){
            setErrorMsg("Username must contain no more than 16 and no less than 5 letters")
            setTimeout(()=>{
                setErrorMsg("");
            },3000)
            return null;
        }
        
        if(usernameSplit.length !=2 || usernameSplit.includes("")){
            setErrorMsg("Invalid username, please write last name and first name")
            setTimeout(()=>{
                setErrorMsg("");
            },3000)
            return null;
        }
        
            dispatch(setUserName(username));
            handleClickNext();
            setErrorMsg("");
       
    }
    return (
        <div className="auth-block">
            <div className="initials-block-wrapper">
                <div className="title-initials-block">
                   <span className="left-side-span-title">
                   
                   <InsertEmoticonIcon color="secondary" fontSize="large"/>
                    </span> 
                       What's your full name? 
                    <span className="right-side-span-title">
                    <InsertEmoticonIcon color="secondary" fontSize="large"/>
                    </span>
                </div>
                <div className="title-afterInitials-block">
                    People use real names on Clubhouse :) Thnx!
                </div>
                <div className="input-initials-block">
                <input value={username} onChange={handleChangeUsername}  type="text" placeholder="username" />
                </div>

                <div className="button-initials-block">
                  
                <button onClick={handleClickPrevButton} className="button-auth btn-back">{'<'}- Back</button>
             
                <button onClick={handleClickButton} className="button-auth">Next -{'>'}</button>
                </div>
                    {errorMsg ? 
                    <div className="error-text-initials-block">
                      {errorMsg}  
                     </div> : <> </>}
            </div>
            
        </div>
    )
}

export default InitialsBlock
