import React,{FC} from 'react'

import "../../styles/another/Avatar.css"
interface AvatarProps{
    src: string;
    width: string;
    height: string;
    isVoice?: boolean;  
    letters?:string
}

const  Avatar:FC<AvatarProps> =({src,width,height,isVoice,letters}) =>{
    return (
        <div className={isVoice ? "avatar-is-voice" : "avatar-ist-voice"}
         style={{width,height,backgroundImage:src ? `url(${src})` : "",backgroundPosition:"center",borderRadius:"50px"}}>
            {!src ? letters : null}
        </div>
    )
}

export default Avatar
