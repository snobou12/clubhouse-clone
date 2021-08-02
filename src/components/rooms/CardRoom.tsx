import React,{FC} from 'react'


import { ConnectedPplType, ICardRoom } from '../../types/types'
import PeopleIcon from '@material-ui/icons/People';
import "../../styles/rooms/CardRoom.css"
import { Link } from 'react-router-dom'
import { Speaker } from '../another';

const CardRoom:FC<ICardRoom> = ({id,connectedPeople,title,description,connectedCount,createdData})=> {
   
    return (
        <div className="card-room-wrapper">
            <div className="title-card-room">
                {title} 
            </div>
            <div className="people-count-card-room-wrapper">
                <div className="people-card-room">
                        {connectedPeople && connectedPeople.map((obj:ConnectedPplType,index:number)=>
                        <Speaker key={`${obj.id}:${index}`} username={obj.username} userImagePath={obj.userImagePath} heightSpeak="30px" widthSpeak="30px" usernameFontSize="speaker-username-fontsize-10" />
                        )}
                </div>
                <div className="people-count-room">
                     {connectedCount && connectedCount}         
                        <span >
                        <PeopleIcon  className="people-icon-room" fontSize="small"/>
                        </span>
                </div>
             
                
               
            </div>
            <div className="description-card-room">
            {description}
            </div>
            <div className="button-card-room">
            <Link to={`/room/${id}`} className="button-auth">Enter to room </Link>
                
            </div>
            
        </div>
    )
}

export default CardRoom
