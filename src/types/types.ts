import {FC} from "react";


export interface RouteItem{
    name:string;
    path:string;
    exact:boolean;
    private:boolean;
    always:boolean;
    component:FC 
}

export interface ConnectedPplType{
    id:string;
    isActivated:boolean;
    isAuth:boolean;
    phone:string;
    roomId:string;
    userImagePath:string;
    username:string;
}





export interface ICardRoom{
    id:string;
    connectedPeople:ConnectedPplType[]; 
    title:string;
    description:string;
    connectedCount:number;
    createdData:string;
}





