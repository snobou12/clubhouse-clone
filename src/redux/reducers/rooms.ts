export interface roomsAction{
    type:string;
    payload?:any;
}

type IActionMsg={
    message:string;
    error:boolean
}

type IRoom={
    connectedPeople:string[];
    _id:string;
    title:string;
    description:string;
    connectedCount:number;
    createdData:string;
    userCreator:string;
}

export interface roomsState{
    createRoomMsg:IActionMsg;
    getAllRoomsMsg:IActionMsg;
    allRooms:IRoom[];
}



const initialState:roomsState={
    createRoomMsg:{message:"",error:true},
    getAllRoomsMsg:{message:"",error:true},
    allRooms:[]
}

const rooms=(state = initialState,action:roomsAction):roomsState=>{
    
    if(action.type === "SET_CREATE_ROOM_MSG"){
        return{
            ...state,
            createRoomMsg:action.payload
        }
    }

    if(action.type === "SET_GET_ALL_ROOMS_MSG"){
        return{
            ...state,
            getAllRoomsMsg:action.payload
        }
    }

    if(action.type === "SET_ALL_ROOMS"){
        return{
            ...state,
            allRooms:action.payload
        }
    }

    if(action.type === "UPDATE_ROOM_CONNECTED_PEOPLE"){
            
        if(action.payload.roomId){
            
            const rooms = [...state.allRooms];
            const newRooms = rooms.map(room=>{
                if(room._id=== action.payload.roomId){
                    room.connectedPeople=action.payload.speakers;
                    room.connectedCount=action.payload.speakers.length;
                }
                return room;
            })
            return {
                ...state,
                allRooms:newRooms
            }

        }
        else{
           
            const rooms = [...state.allRooms];
            const newRooms =rooms.map(room=>{
                if(room._id===action.payload.speakers[0].roomId){
                    room.connectedPeople = action.payload.speakers;
                    room.connectedCount=action.payload.speakers.length;
                } 
                return room
            })
    
            return{
                ...state,
                 allRooms:newRooms
            }
        }
        
    }

    


    
    return state;
}

export default rooms;
