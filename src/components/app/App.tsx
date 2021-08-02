import React,{FC} from 'react';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {checkAuth} from "../../redux/actions/authRequests";
import {getAllRooms} from "../../redux/actions/rooms"
import { RootState } from '../../redux/reducers';

import { routes } from '../../routes/routes';

import Loader from "react-loader-spinner";
import "../../styles/main-styles/App.css"


const App:FC=()=> {
   const dispatch = useDispatch();
   const reduxLoadingAuth=useSelector((state:RootState)=>{
     return state.authRequests.loadingAuth;
   })
   const userIsAuth=useSelector((state:RootState)=>{
     return state.authRequests.user.isAuth;
   })
  
  React.useEffect(()=>{
    dispatch(checkAuth());
    if (localStorage.getItem('token')) {
      dispatch(getAllRooms());
    }
    
  },[])

  
  
  return (
    <div className="app-wrapper">
      {reduxLoadingAuth ? 
        <div className="spinner-app"> 
              <Loader type="RevolvingDot" color="#fd9a2f" height={100} width={100} />
         </div> 
         :
      <Switch>
        {
          routes.map((route)=>(
            <Route path={route.path} exact={route.exact} key={route.name}>
               {route.always ? 
              (
                <route.component />
              ):

              route.private ?
               (
                userIsAuth ? 
                (<route.component />):
                (
                <Redirect to={"/auth"} /> 
                ) ):
                userIsAuth ?
             (
                <Redirect to={"/"} />
             )
             :
             (
              <route.component />
              )
              } 
              
            
            </Route>
          ))
        }
      </Switch>
}
    </div>
  );
}

export default App;
