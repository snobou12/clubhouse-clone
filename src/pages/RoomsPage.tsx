import React,{FC} from 'react'



import {Header} from "../components/another"
import { CardRoom } from '../components/rooms'
import {useDispatch,useSelector} from "react-redux"
import "../styles/pages-styles/RoomsPage.css"
import { RootState } from '../redux/reducers'
import { useSocket } from '../hooks/useSocket'
import { updateRoomConnectedPeople } from '../redux/actions/rooms'


const RoomsPage:FC=()=> {
    const dispatch = useDispatch();

    const reduxRooms = useSelector((state:RootState)=>{
        return state.rooms.allRooms;
    })

    const socket= useSocket();

    React.useEffect(()=>{
        socket.on('SERVER@ROOMS:HOME',(obj)=>{ 
            dispatch(updateRoomConnectedPeople(obj))
        })
    },[])
    return (
        <div className="rooms-wrapper">
            <Header hidden={false} />
            <div className="filter-rooms-page-button">
                <div className="filter-room">
                
                </div>
            </div>
            
            <div className="room-cards">
            {reduxRooms.length<1 ? <div className="rooms-empty"> No rooms yet :( </div> : 
            reduxRooms.map((obj:any,index)=>
             <CardRoom key={index} id={obj._id} connectedPeople={obj.connectedPeople} title={obj.title} description={obj.description} connectedCount={obj.connectedCount} createdData={obj.createdData} />
            )
            }
            </div>
        </div>
    )
}

export default RoomsPage
