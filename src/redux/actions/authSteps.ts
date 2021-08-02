

export const setAuthStep = (num:number)=>({ 
    type:"SET_AUTH_STEP",
    payload:num,
})

export const incrementAuthStep = ()=>({ 
    type:"INCREMENT_AUTH_STEP",
})

export const decrementAuthStep = ()=>({ 
    type:"DECREMENT_AUTH_STEP",
})

export const setUserName= (str:string)=>({
    type:"SET_USER_NAME",
    payload:str,
})



export const setUserImageUrl= (str:string)=>({
    type:"SET_USER_IMAGE_URL",
    payload:str,
})

export const setUserImageFile= (obj:object)=>({
    type:"SET_USER_IMAGE_FILE",
    payload:obj,
})




export const setUserPhone=(str:object)=>({
    type:"SET_USER_PHONE",
    payload:str,
})



