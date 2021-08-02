 type IActionMsg={
    message:string;
    error:boolean;
}

  type IUser={
    id:string;
    isActivated:boolean;
    phone:string;
    userImagePath:string;
    username:string;
    isAuth:boolean;
}




export interface authRequestAction{
    type:string;
    payload?:any;
}



export interface authRequestState{
    user:IUser
    activationMsg: IActionMsg
    registrationMsg:IActionMsg
    loginMsg:IActionMsg,
    loadingAuth:boolean,
 }