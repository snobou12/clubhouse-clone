import { authState,authAction } from "../types/auth-steps-types";






const initialState:authState = {
    step:0,
    user_name:"",
    user_image_url:"default",
   user_image_file:"",
    user_phone:{
        formattedValue :"",
        value:" "
    },
    cut_user_letters_name:"",
  };

const authSteps=(state = initialState,action:authAction):authState=>{
    
    if(action.type === "SET_AUTH_STEP"){
        return{
            ...state,
            step:action.payload
        }
    }
    
    if(action.type==="INCREMENT_AUTH_STEP"){
        return{
            ...state,
            step:state.step+1
        }
    }
    
    if(action.type==="DECREMENT_AUTH_STEP"){
        return{
            ...state,
            step:state.step-1
        }
    }
    

    if(action.type==="SET_USER_NAME"){
        const username = action.payload;
        let cutUsername= username.split(" ");
        let cutUserLettersName = cutUsername[0][0] +cutUsername[1][0];
       
        return{
            ...state,
            user_name:action.payload,
            cut_user_letters_name:cutUserLettersName
        }
    }
    
    if(action.type==="SET_USER_IMAGE_URL"){
        return{
            ...state,
            user_image_url:action.payload
        }
    }
    

    if(action.type==="SET_USER_IMAGE_FILE"){
        return{
            ...state,
            user_image_file:action.payload
        }
    }

    
    if(action.type==="SET_USER_PHONE"){
        return{
            ...state,
            user_phone:action.payload
        }
    }
  
    return state;
}

export default authSteps;