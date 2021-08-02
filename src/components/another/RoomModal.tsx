import React,{FC} from 'react'

import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch,useSelector } from 'react-redux';
import {createRoom} from "../../redux/actions/rooms";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import "../../styles/another/RoomModal.css"
import { RootState } from '../../redux/reducers';
const useStyles = makeStyles((theme:Theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    paper: {
    height:"350px",
      width:"450px",
      backgroundColor: "white",
      borderRadius: '15px',
      padding: theme.spacing(2, 4, 3),
    },
  }));

interface RoomModalProps{
    hiddenModal:boolean
}

const RoomModal:FC<RoomModalProps> =({hiddenModal})=> {
    const classes=useStyles();
    const dispatch = useDispatch();
    const reduxUserId = useSelector((state:RootState)=>{
        return state.authRequests.user.id;
    })

    const reduxCreateRoomMsg= useSelector((state:RootState)=>{
        return state.rooms.createRoomMsg;
    })

    const [openRoomModal, setOpenRoomModal] = React.useState<boolean>(false);

    const [inputTitleRoom,setInputTitleRoom]=React.useState<string>("");
    const [inputDescriptionRoom,setInputDescriptionRoom]=React.useState<string>("");

    const [errorMsg,setErorMsg]=React.useState<string>("");

    const handleChangeInputTitleRoom = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setInputTitleRoom(e.target.value);
    }

    const handleChangeInputDescriptionRoom = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setInputDescriptionRoom(e.target.value);
    }

    const handleOpenRoomModal = () => {
        setOpenRoomModal(true);
    };

     const handleCloseRoomModal = () => {
        setOpenRoomModal(false);
     };


     const handleSubmit = ()=>{
         if (inputTitleRoom.length < 6 || inputTitleRoom.length > 15 ){
            setErorMsg("The room name must be at least 6 and no more than 16 characters")
            setTimeout(()=>{
                setErorMsg("");
            },3000)
            return null;
         }

         if (inputDescriptionRoom.length < 10 || inputDescriptionRoom.length > 30 ){
            setErorMsg("The description must be at least 10 and no more than 30 characters")
            setTimeout(()=>{
                setErorMsg("");
            },3000)
            return null;
         }

         const title = inputTitleRoom;
         const description =inputDescriptionRoom;
         const userCreator = reduxUserId;
         dispatch(createRoom(title,description,userCreator));
         setErorMsg("");
     }

    return (
        <div className="room-modal-wrapper">
            {!hiddenModal ? <button className="button-auth-success" onClick={handleOpenRoomModal}>
        Create room
             </button> : <> </>}
            
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openRoomModal}
        onClose={handleCloseRoomModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openRoomModal}>
          <div className={classes.paper}>
            <div className="title-room-modal">
            <span className="left-side-span-title">
                    <MeetingRoomIcon color="secondary" fontSize="large"/>
                    </span> 
                Create your room 
                <span className="right-side-span-title">
                    <MeetingRoomIcon color="secondary" fontSize="large"/>
                     </span> 
            </div>
            <div className="room-modal-input-title-selection">
                <div className="room-modal-label-title">
                    Room name
                </div>
                <div className="room-modal-input-title">
                    <input type="text" value={inputTitleRoom} onChange={handleChangeInputTitleRoom} />
                </div>
            </div>

            <div className="room-modal-input-description-selection">
                 <div className="room-modal-label-description">
                    Description
                </div>
                <div className="room-modal-input-description">
                     <input type="text" value={inputDescriptionRoom} onChange={handleChangeInputDescriptionRoom} />
                </div>
            </div>
            <div className="room-modal-button-selection">
                <button onClick={handleSubmit} className="button-auth" >Create</button>
            </div>

            {errorMsg ? 
                <div className="error-text-room-modal">
                    {errorMsg}
                </div>:<> </>
                }
                {reduxCreateRoomMsg.error ? <div className="error-text-room-modal">
                    {reduxCreateRoomMsg.message}
                </div>:<> </>
                }
                {!reduxCreateRoomMsg.error ? <div className="success-text-room-modal">
                    {reduxCreateRoomMsg.message}
                </div>:<> </>
                }

          </div>
        </Fade>
      </Modal>
        </div>
    )
}

export default RoomModal
