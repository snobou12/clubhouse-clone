import {RouteItem} from "../types/types"
import { AuthPage,LoginPage,RoomsPage,NotFoundPage,RoomPage } from "../pages";

export const routes:RouteItem[]=
[
    {
        name:"auth",
        path:"/auth",
        exact:true,
        private:false,
        always:false,
        component:AuthPage
    },
    {
        name:"login",
        path:"/login",
        exact:true,
        private:false,
        always:false,
        component:LoginPage
    },
    {
        name:"roomsPage",
        path:"/",
        exact:true,
        private:true,
        always:false,
        component:RoomsPage
    },
    {
        name:"roomPage",
        path:"/room/:id",
        exact:true,
        private:true,
        always:true,
        component:RoomPage
    },
    {
        name:"routeNotFound",
        path:"*",
        exact:false,
        private:false,
        always:true,
        component:NotFoundPage
    }
    
]

