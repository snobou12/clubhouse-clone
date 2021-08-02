import React,{FC} from 'react'

import { WelcomeBlock,InitialsBlock,ImageBlock,PhoneBlock,ActivationBlock,FinishBlock } from '../components/auth-steps'
import { incrementAuthStep,decrementAuthStep } from '../redux/actions/authSteps';
import { useSelector,useDispatch } from 'react-redux';
import {RootState} from "../redux/reducers/index";
import "../styles/pages-styles/AuthPage.css"



const AuthPage:FC = ()=> {
    const dispatch= useDispatch();
    const authStep = useSelector((state: RootState )=>{
        return state.authSteps.step})
    const handleNextStep=()=>{
        dispatch(incrementAuthStep());
    }
    const handlePrevStep=()=>{
        dispatch(decrementAuthStep());
    }
    return (
       <div className="authPage-wrapper">
           {
               authStep === 0 ? <WelcomeBlock  handleClickNext={handleNextStep} /> :
                authStep===1 ? <InitialsBlock  handleClickPrev={handlePrevStep} handleClickNext={handleNextStep} /> : 
                authStep === 2 ? <ImageBlock handleClickPrev={handlePrevStep} handleClickNext={handleNextStep}  /> : 
                authStep===3 ? <PhoneBlock handleClickPrev={handlePrevStep} handleClickNext={handleNextStep} /> :
                 authStep ===4 ? <ActivationBlock handleClickPrev={handlePrevStep} handleClickNext={handleNextStep} /> :
                  <FinishBlock />
           }
       </div>
    )
}

export default AuthPage
