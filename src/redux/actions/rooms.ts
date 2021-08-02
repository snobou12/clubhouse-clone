

import RoomService from "../../services/RoomService";




export const setCreateRoomMsg=(str:string,err:boolean)=>({
    type:"SET_CREATE_ROOM_MSG",
    payload:{message:str,error:err}
})

export const createRoom = (title:string,description:string,userCreator:string)=>async(dispatch:any)=>{
    try{
        const response = await RoomService.createRoom(title,description,userCreator);
        dispatch(setCreateRoomMsg(response.data,false));
    }
    catch(e){
        if(e.response?.data?.message){
            dispatch(setCreateRoomMsg(e.response.data.message,true));
        }
    }
}




export const setGetAllRoomsMsg=(str:string,err:boolean)=>({
    type:"SET_GET_ALL_ROOMS_MSG",
    payload:{message:str,error:err}
})

export const setAllRooms=(rooms:any)=>({
    type:"SET_ALL_ROOMS",
    payload:rooms
})




export const getAllRooms = ()=>async(dispatch:any)=>{
    try{
        const response = await RoomService.getAllRooms();
        dispatch(setGetAllRoomsMsg("",false));
        dispatch(setAllRooms(response.data))
        
    }
    catch(e){
        if(e.response?.data?.message){
            dispatch(setGetAllRoomsMsg(e.response.data.message,true));
        }
    }
}



export const updateRoomConnectedPeople=(obj:any)=>({
    type:"UPDATE_ROOM_CONNECTED_PEOPLE",
    payload:obj
})




