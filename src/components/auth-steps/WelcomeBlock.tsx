import React,{FC} from 'react'

import { Link } from 'react-router-dom';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import "../../styles/auth-steps-styles/WelcomeBlock.css"

interface WelcomeBlockProps {
    handleClickNext:()=>void;
    
}

const  WelcomeBlock:FC<WelcomeBlockProps> = ({handleClickNext})=> {
    const handleClickButton = ()=>{
        handleClickNext();
    }
 
    return (
        <div className="auth-block">
            <div className="welcome-block-wrapper">
                <div className="title-welcome-block">
                    <span className="left-side-span-title">
                    <BeachAccessIcon color="secondary" fontSize="large"/>
                    </span>
                   Welcome to Clubhouse!
                   <span className="right-side-span-title">
                    <BeachAccessIcon className="rotated-materialUI-icon" color="secondary" fontSize="large"/>
                    </span>
                </div>
                <div className="description-welcome-block">
                        We're working hard to get Clubhouse ready for everyone! While we wrap up the finishing youches, we're adding people gradually to make sure nothing breaks :)
                </div>
                <div className="button-welcome-block">
                   <button onClick={handleClickButton}  className="button-auth">Get your username</button>
                </div>
               
                <div className="footer-welcome-block">
                <Link to="/login">
                Already have an account? Sign in 
                </Link> 
                </div>
            </div>
                
                
           </div>
    )
}

export default WelcomeBlock
