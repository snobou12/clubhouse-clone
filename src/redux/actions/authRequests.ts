import AuthService from "../../services/AuthService";

import { API_URL } from "../../api";
import axios from "axios";
import { CollectionsBookmarkOutlined } from "@material-ui/icons";




export const setActivationMsg=(str:string,err:boolean)=>({
    type:"SET_ACTIVATION_MSG",
    payload:{message:str,error:err}
})

export const postActivationCode = (phone:string)=>async(dispatch:any)=>{ 
    try{
     const response = await AuthService.postActivationCode(phone);
     dispatch(setActivationMsg(response.data,false));
    }
    catch(e){
        if(e.response?.data?.message){
            dispatch(setActivationMsg(e.response.data.message,true));
        }
        
    }
}





export const setRegistrationMsg=(str:string,err:boolean)=>({
    type:"SET_REGISTRATION_MSG",
    payload:{message:str,error:err}
})

export const registration = (username:string,userImagePath:string,userPhone:string,activationCode:string)=>async(dispatch:any)=>{ 
    try{
     const response = await AuthService.registration(username,userImagePath,userPhone,activationCode);
     dispatch(setRegistrationMsg(response.data,false));
    }
    catch(e){
        if(e.response?.data?.message){
            dispatch(setRegistrationMsg(e.response.data.message,true));
        }
    }
}




export const setLoginMsg=(str:string,err:boolean)=>({
    type:"SET_LOGIN_MSG",
    payload:{message:str,error:err}
})


export const setFullUserData=(id:string,isActivated:boolean,phone:string,userImagePath:string,username:string,isAuth:boolean)=>({
    type:"SET_FULL_USER_DATA",
    payload:{
        id,
        isActivated,
        phone,
        userImagePath,
        username,
        isAuth
    }
})


export const login = (phone:string,password:string)=>async(dispatch:any)=>{ 
    try{
     dispatch(setLoadingAuth(true));
     const response = await AuthService.login(phone,password);
     dispatch(setLoginMsg("Log In successfully",false));
     localStorage.setItem("token",response.data.accessToken);
     const user_id = response.data.user.id
     const user_isActivated = response.data.user.isActivated
     const user_phoneUser = response.data.user.phone
     const user_userImagePath = response.data.user.userImagePath
     const user_username = response.data.user.username
     dispatch(setFullUserData(user_id,user_isActivated,user_phoneUser,user_userImagePath,user_username,true))
     window.location.reload();

    }
    catch(e){
        if(e.response?.data?.message){
            dispatch(setLoginMsg(e.response.data.message,true));
            dispatch(setLoadingAuth(false));
        }
    }
}





export const setCheckAuthMsg=(str:string,err:boolean)=>({
    type:"SET_CHECK_AUTH_MSG",
    payload:{message:str,error:err}
})

export const setLoadingAuth=(bool:boolean)=>({
    type:"SET_LOADING_AUTH",
    payload:bool
})


export const checkAuth= ()=>async(dispatch:any)=>{
    try{
        dispatch(setLoadingAuth(true));
        const response = await axios.get(`${API_URL}/refresh`,{withCredentials:true})
        dispatch(setCheckAuthMsg("Authorization successfully",false));
        localStorage.setItem('token', response.data.accessToken);
        const user_id = response.data.user.id
        const user_isActivated = response.data.user.isActivated
        const user_phoneUser = response.data.user.phone
        const user_userImagePath = response.data.user.userImagePath
        const user_username = response.data.user.username
        dispatch(setFullUserData(user_id,user_isActivated,user_phoneUser,user_userImagePath,user_username,true))
        dispatch(setLoadingAuth(false));
    }

    catch(e){
        if(e.response?.data?.message){
            dispatch(setCheckAuthMsg(e.response.data.message,true));
            dispatch(setLoadingAuth(false));
        }
    }   
   
    
    
}



export const logout = ()=>async(dispatch:any)=>{
    try{
        const response = await AuthService.logout();
        localStorage.removeItem("token")
        dispatch(setFullUserData("",false,"","","",false));
        window.location.reload();
    }
    catch(e){
        console.log(e);
    }
}



