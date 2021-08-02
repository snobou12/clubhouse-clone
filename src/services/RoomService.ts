import $api from "../api";
import {AxiosResponse} from "axios";
import { IRoom } from "../models/IRoom";

export default class RoomService{ 
   
    static async createRoom(title:string,description:string,userCreator:string):Promise<AxiosResponse>{
        return $api.post("/createRoom",{title,description,userCreator});
    }


    

    static async getRoomById(roomId:string):Promise<AxiosResponse>{
        return $api.get(`/getRoomById/${roomId}`);
    }

    

    static async getAllRooms():Promise<AxiosResponse<IRoom[]>>{
        return $api.get<IRoom[]>("/getAllRooms");
    }

    

 

}