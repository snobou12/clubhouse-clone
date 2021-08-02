import { combineReducers } from 'redux';
import authStepsReducer from "./authSteps"
import headerReducer from "./header"
import authRequestsReducer from "./authRequests";
import roomsReducer from "./rooms"

 const rootReducer = combineReducers({
    authSteps:authStepsReducer,
    header:headerReducer,
    authRequests:authRequestsReducer,
    rooms:roomsReducer,
});

export default rootReducer;

export type RootState =ReturnType<typeof rootReducer>