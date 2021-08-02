import axios from 'axios';
import React,{FC} from 'react'
import { Link, useParams } from 'react-router-dom'
import roomService from '../services/RoomService';



import Peer from "simple-peer";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useSocket } from '../hooks/useSocket';

import { Header } from '../components/another';
import Speaker, { SpeakerProps } from '../components/another/Speaker';
import { RootState } from '../redux/reducers';
import "../styles/pages-styles/RoomPage.css"
import { IUser } from '../models/IUser';


interface RoomPageParamsType{
    id:string;
}




let peers:any=[]; 

const RoomPage:FC =()=> {
    const history = useHistory();
    const reduxUser=useSelector((state:RootState)=>{
        return state.authRequests.user;
    })

    const socket=useSocket();
   
  
    const params=useParams<RoomPageParamsType>();
    const roomId= params.id;
    const [roomData,setRoomData]=React.useState<any>({}); 

    const [users,setUsers]=React.useState<IUser[]>([]);

   

    React.useEffect(() => {
        if(!reduxUser.isAuth){
            history.push("/auth");
        }
        fetchRoomById();
        if (typeof window !== 'undefined') {
          navigator.mediaDevices
            .getUserMedia({
              audio: true,
            })
            .then((stream) => {
              socket.emit('CLIENT@ROOMS:JOIN', {
                user:reduxUser,
                roomId,
              });
    
              socket.on('SERVER@ROOMS:JOIN', (allUsers: any) => { 
                setUsers(allUsers);
    
                allUsers.forEach((speaker:any) => {
                  if (reduxUser.id !== speaker.id && !peers.find((obj:any) => obj.id !== speaker.id)) {
                    const peerIncome = new Peer({
                      initiator: true,
                      trickle: false,
                      stream,
                    });
    
                    
                    peerIncome.on('signal', (signal) => {
                     
                      socket.emit('CLIENT@ROOMS:CALL', {
                        targetUserId: speaker.id,
                        callerUserId: reduxUser.id,
                        roomId,
                        signal,
                      });
                      peers.push({
                        peer: peerIncome,
                        id: speaker.id,
                      });
                    });
    
                    socket.on(
                      'SERVER@ROOMS:CALL',
                      ({ targetUserId, callerUserId, signal: callerSignal }) => {
                       
    
                        const peerOutcome = new Peer({
                          initiator: false,
                          trickle: false,
                          stream,
                        });
    
                        
                        peerOutcome.signal(callerSignal);
    
                        peerOutcome
                          
                          .on('signal', (outSignal) => {
                            
                            socket.emit('CLIENT@ROOMS:ANSWER', {
                              targetUserId: callerUserId,
                              callerUserId: targetUserId,
                              roomId,
                              signal: outSignal,
                            });
                          })
                          
                          .on('stream', (stream) => {
                             
                             let audioTag =document.querySelector('audio');
                             if(audioTag){
                                 audioTag.srcObject=stream;
                                 audioTag.play();
                             }     
                     
                          });
                      },
                    );
    
                    socket.on('SERVER@ROOMS:ANSWER', ({ callerUserId, signal }) => {
                      const obj = peers.find((obj:any) => Number(obj.id) === Number(callerUserId));
                      if (obj) {
                        obj.peer.signal(signal);
                      }
                     
                    });
                  }
                });
              });
    
              socket.on('SERVER@ROOMS:LEAVE', (leaveUser: any) => {
                
                setUsers((prev) =>
                  prev.filter((prevUser) => {
                    const peerUser = peers.find((obj:any) => Number(obj.id) === Number(leaveUser.id));
                    if (peerUser) {
                      peerUser.peer.destroy();
                    }
                    return prevUser.id !== leaveUser.id;
                  }),
                );
              });
            })
            .catch(() => {
              console.error('No access to microphone');
            });
        }
    
        return () => {
          peers.forEach((obj:any) => {
            obj.peer.destroy();
          });
        };
      }, []);

    const fetchRoomById = async()=>{
        try{
            const response = await roomService.getRoomById(params.id);
            setRoomData(response.data);
        }
        catch(e){
            console.log(e);
        }
    }

    const handleCLickLeave = ()=>{

    }
    return (
        <>
        
            <Header hidden={true} />
        <div className="room-page-wrapper">
            
            <div className="room-page-block">
            <audio id="audio" controls />
                <div className="room-page-header">
                    <div className="room-page-title">
                         {roomData.title}
                     </div>
                     <span className="room-page-leave-button">
                     <Link to="/">
                     <div onClick={handleCLickLeave} className="button-auth-disabled">Leave quietly</div>
                     </Link>
                        
                     </span>
                </div>
                <div className="room-page-users">
                    {users.map((obj,index)=>
                        <Speaker key={obj.username} heightSpeak="100px" widthSpeak="100px" userImagePath={obj.userImagePath} username={obj.username} usernameFontSize="speaker-username-fontsize-20"  />
                    )}
                </div>

                
                
            </div>
        </div>
        </>
    )
}

export default RoomPage
