import React,{FC} from 'react'


import Avatar from './Avatar'
import "../../styles/another/Speaker.css"



export type SpeakerProps={
    username:string;
    userImagePath:string;
    heightSpeak:string;
    widthSpeak:string;
    usernameFontSize:string;
}

const Speaker:FC<SpeakerProps> = ({username,userImagePath,heightSpeak,widthSpeak,usernameFontSize})=>{
    return (
        <div className="speaker-wrapper">
            <Avatar src="https://www.meme-arsenal.com/memes/be50e6ba99654b5455027dcc82beb5b3.jpg" height={heightSpeak} width={widthSpeak} isVoice={false} /> {/* letters + userImagePath */}
            <div className={usernameFontSize}>{username}</div>
        </div>
    )
}

export default Speaker
