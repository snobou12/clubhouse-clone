
import  {authRequestAction,authRequestState} from "../types/auth-requests-types";



const initialState:authRequestState={
    user:{id:"",isActivated:false,phone:"",userImagePath:"",username:"",isAuth:false},
    activationMsg:{message:"",error:true},
    registrationMsg:{message:"",error:true},
    loginMsg:{message:"",error:true},
    loadingAuth:true,
}

const authRequests=(state = initialState,action:authRequestAction):authRequestState=>{
    
    if(action.type === "SET_ACTIVATION_MSG"){
        return{
            ...state,
            activationMsg:action.payload
        }
    }

    if(action.type === "SET_REGISTRATION_MSG"){
        return{
            ...state,
            registrationMsg:action.payload
        }
    }

    if(action.type === "SET_LOGIN_MSG"){
        return{
            ...state,
            loginMsg:action.payload
        }
    }

    if(action.type === "SET_FULL_USER_DATA"){
        return{
            ...state,
            user:action.payload
        }
    }

    if(action.type === "SET_LOADING_AUTH"){
        return{
            ...state,
            loadingAuth:action.payload
        }
    }


    
    return state;
}

export default authRequests;
