import React,{FC} from 'react'

import axios from "axios";
import {useSelector,useDispatch} from "react-redux";
import {setUserImageUrl,setUserImageFile} from "../../redux/actions/authSteps"
import {RootState} from "../../redux/reducers/index";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import "../../styles/auth-steps-styles/ImageBlock.css"


const uploadFile = async(file:File)=>{
    
    const formData = new FormData();

    formData.append("photo",file)
   
    const {data} = await axios.post("http://localhost:3001/api/upload",formData,{headers:{
        "Content-Type":"multipart/form-data",
    }});
    
   
    return data.url;
}

interface ImageBlockProps{
    handleClickNext:()=>void;
    handleClickPrev:()=>void;
}
const ImageBlock:FC<ImageBlockProps> =({handleClickNext,handleClickPrev})=> {
    const dispatch = useDispatch();
    const reduxUsername= useSelector((state:RootState)=>{
        return state.authSteps.user_name;
    })

    const reduxCutUsername= useSelector((state:RootState)=>{
        return state.authSteps.cut_user_letters_name;
    })

    const reduxUserImageUrl= useSelector((state:RootState)=>{
        return state.authSteps.user_image_url;
    })

    const inputFileRef=React.useRef<HTMLInputElement>(null)
    
    const handleChangeImage = async (e:React.ChangeEvent<HTMLInputElement>)=>{
        
        if(e.target.files){
            const file= e.target.files[0];
            const imageUrl=URL.createObjectURL(file);
            dispatch(setUserImageUrl(imageUrl));
            const data = await uploadFile(file);
            dispatch(setUserImageFile(data));
        }
    }

    const handleDeleteImageUrl = ()=>{
        dispatch(setUserImageUrl("default"));
        dispatch(setUserImageFile({}));
    }

    const handleClickButton = ()=>{
        handleClickNext();
    }

    const handleClickPrevButton =()=>{
        handleClickPrev();
    }
    
    return (
        <div className="auth-block">
            <div className="image-block-wrapper">
                <div className="title-image-block">
                    <span className="left-side-span-title">
                    <PhotoCameraIcon color="secondary" fontSize="large"/>
                    </span>
                         Okay, {reduxUsername} !
                     <span className="right-side-span-title">
                    <PhotoCameraIcon color="secondary" fontSize="large"/>
                    </span>
                </div>
                <div className="title-afterImage-block">
                    How's this photo?
                </div>
                <div className="photo-image-block">
                    {reduxUserImageUrl === "default" ? <div> {reduxCutUsername} </div> : <img alt="ooops...your image" src={reduxUserImageUrl} height="100px" width="100px" /> }
                </div>
                <div className="photo-desc">
                    <label htmlFor="image" className="link cup">
                    Choose a different photo
                    </label>
                    
                </div>
                {reduxUserImageUrl != "default" ?  <div onClick={handleDeleteImageUrl} className="photo-desc image-delete">
                    Delete back
                </div> : <> </>}
               
                <input onChange={handleChangeImage} id="image" ref={inputFileRef} type="file" hidden/>
                <div className="button-image-block">
                <button onClick={handleClickPrevButton} className="button-auth btn-back">{'<'}- Back</button>
                <button onClick={handleClickButton} className="button-auth">Next -{'>'}</button>
                </div>
            </div>
            
        </div>
    )
}

export default ImageBlock
