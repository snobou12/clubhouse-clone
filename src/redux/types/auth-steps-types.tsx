type UserPhone={
    formattedValue:string;
    value:string
}


export interface authState{
    step:number;
    user_name:string;
    user_image_url:string ;
    user_image_file:string;
    user_phone:UserPhone;
    cut_user_letters_name:string;
   
}


export interface authAction{
    type:string;
    payload?:any;
}