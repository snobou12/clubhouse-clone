import React,{FC} from 'react'

import Loader from "react-loader-spinner";
import "../../styles/auth-steps-styles/FinishBlock.css"

const  FinishBlock:FC = () =>{
    

    React.useEffect(()=>{
        setTimeout(()=>{
           window.location.replace("http://localhost:3000/login");
        },3000)
    },[])
    return (
        <div className="auth-block">
            <div className="finish-block-wrapper">
                
                <div className="spinner-finish-block">
                <Loader type="RevolvingDot" color="#fd9a2f" height={100} width={100} />
                </div>
                <div className="title-afterFinish-block">
                    Activation in progress...    
                </div>
            </div>
        </div>
        
    )
}

export default FinishBlock
