import React,{FC} from 'react'

import headerLogo from "../../assets/main/hand_logo.png"
import {RoomModal} from "./"
import {setSelectedHeader} from "../../redux/actions/header"
import {logout} from "../../redux/actions/authRequests";
import { useDispatch,useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
import {Avatar} from "../../components/another/"
import "../../styles/another/Header.css"
import { Link } from 'react-router-dom';



interface HeaderProps{
    hidden:boolean
}

const Header:FC<HeaderProps> =({hidden})=> {
    const dispatch = useDispatch();
    const selectedHeaderItem = useSelector((state:RootState)=>{
        return state.header.selected_header;
    })
    const username =useSelector((state:RootState)=>{
        return state.authRequests.user.username
    })

    const userImagePath=useSelector((state:RootState)=>{
        return state.authRequests.user.userImagePath
    })


    

    const handleSelectHeaderItem = (item:number)=>{
        dispatch(setSelectedHeader(item));
    }

    const handleLogout = ()=>{
        dispatch(logout());
        
    }
    return (
        <div className="header-wrapper">    
                    
            <div className="header-section">
                {!hidden ?   <div className="header-logo">
                    <Link to="/">
                     <img alt="ooops...it's logo" src={headerLogo} />
                     </Link>
                 </div> :
                 
                 <div className="header-logo">
                    
                     <img alt="ooops...it's logo" src={headerLogo} />
                     
                 </div> 
                 }
               

                <div onClick={()=>handleSelectHeaderItem(0)} className={selectedHeaderItem ===0 ? "header-item header-rooms header-rooms-active" : "header-item header-rooms" }>
                    Rooms
                 </div>

                 <div onClick={()=>handleSelectHeaderItem(1)} className={selectedHeaderItem===1 ? "header-item header-profile header-profile-active" : "header-item header-profile"}>
                        Profile
                 </div>
            </div>

            <div className="header-section">
                <div className="header-button">
                <RoomModal hiddenModal={hidden} />
                </div>
                 <div className="header-username-logo">
                       {username} <Avatar src={userImagePath} width="20px" height="20px" isVoice={false} letters="TS" /> {/* пофиксить картинку*/}
                 </div>

                 <div  className="header-button">
                        <button onClick={handleLogout} className="button-auth-disabled">Logout</button>
                 </div>   
            </div>
            
        </div>
    )
}

export default Header
