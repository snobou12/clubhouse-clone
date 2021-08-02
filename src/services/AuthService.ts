import $api from "../api";
import {AxiosResponse} from "axios";

export default class AuthService{ 
    
    static async postActivationCode(phone:string):Promise<AxiosResponse>{ 
        return $api.post("/postActivationCode",{phone}); 
    }
    static async registration(username:string,userImagePath:string,userPhone:string,activationCode:string):Promise<AxiosResponse>{
        return $api.post("/registration",{username,userImagePath,userPhone,activationCode});
    }

    static async login(phone:string,password:string):Promise<AxiosResponse>{
        return $api.post("/login",{phone,password});
    }

    static async logout():Promise<AxiosResponse>{
        return $api.post("/logout");
    }
    

}