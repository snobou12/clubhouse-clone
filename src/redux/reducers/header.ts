import {headerAction,headerState} from "../types/header-types";



const initialState:headerState={
    selected_header:0,
}

const header=(state = initialState,action:headerAction):headerState=>{
   
    if(action.type === "SET_SELECTED_HEADER"){
        return{
            ...state,
            selected_header:action.payload
        }
    }
    
    return state;
}

export default header;
