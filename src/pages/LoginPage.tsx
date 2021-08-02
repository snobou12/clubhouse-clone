import React,{FC} from 'react'

import {Link} from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux';
import {login} from "../redux/actions/authRequests";
import NumberFormat from 'react-number-format';
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import "../styles/pages-styles/LoginPage.css"
import { RootState } from '../redux/reducers';

type InputPhoneValueState={
    formattedValue:string;
    value:string;
}
const LoginPage:FC=()=> {
    const dispatch = useDispatch();

    const [inputPhone,setInputPhone]=React.useState<InputPhoneValueState>({formattedValue:"",value:""});
    const [inputPassword,setInputPassword]=React.useState<string>("");
    const [errorMsg,setErrorMsg]=React.useState<string>("");

    const handleChangeInputPassword =(e:React.ChangeEvent<HTMLInputElement>)=>{
        setInputPassword(e.target.value);
    }

    const errorValidPhone:boolean=!inputPhone.formattedValue || inputPhone.formattedValue.includes("_");

    const reduxLoginMessage = useSelector((state:RootState)=>{
        return state.authRequests.loginMsg;
    })

    const handleSubmit =()=>{
        if(errorValidPhone){
            setErrorMsg("Invalid number phone, please try again")
            setTimeout(()=>{
                setErrorMsg("");
            },3000)
            return null;
        }
        if(inputPassword.length!=12){
            setErrorMsg("Password must contain 12 letters")
            setTimeout(()=>{
                setErrorMsg("");
            },3000)
            return null;
        }
        dispatch(login(inputPhone.value,inputPassword));
            setErrorMsg("");
        
        
        

    }   
    return (
        <div className="login-page-wrapper">
            <div className="login-block">
                <div className="main-title-loginPage">
                <span className="left-side-span-title">
                   
                   <BeachAccessIcon color="secondary" fontSize="large"/>
                    </span> 
                    Welcome to Clubhouse!
                    <span className="right-side-span-title">
                    <BeachAccessIcon className="rotated-materialUI-icon" color="secondary" fontSize="large"/>
                    </span>
                </div>
                <div className="title-loginPage-phone">
                        Enter your phone 
                </div>
                <div className="input-loginPage-phone">
                <NumberFormat className="field" format="+# (###) ###-##-##" mask="_" placeholder="+7 (999) 333-22-11" value={inputPhone.value} onValueChange={({formattedValue,value})=>setInputPhone({formattedValue,value})} />
                </div>

                <div className="title-loginPage-password">
                        Enter your password 
                </div>
                <div className="input-loginPage-password">
                <input  type="password"   placeholder="********" value={inputPassword} onChange={handleChangeInputPassword} />
                </div>
                <div className="button-loginPage-login">
                        <button onClick={handleSubmit} className="button-auth btn-back">Enter to Clubhouse :)</button>
                </div>
                <div className="footer-loginPage">
                    <Link to="/auth">
                    Don't have an account yet? Sign up 
                    </Link>  
                </div>
                {errorMsg ? 
                    <div className="error-text-loginPage">
                      {errorMsg}  
                     </div> : <> </>}
                     {reduxLoginMessage.error ? <div className="error-text-loginPage"> 
                    {reduxLoginMessage.message}
                </div>:<> </>}
                {!reduxLoginMessage.error ? <div className="access-text-loginPage">
                    {reduxLoginMessage.message}
                </div>:<> </>}

            </div>
        </div>
    )
}

export default LoginPage
