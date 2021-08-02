import React,{FC} from 'react'

import MoodBadIcon from '@material-ui/icons/MoodBad';
import "../styles/pages-styles/NotFoundPage.css"
import { Link } from 'react-router-dom';

const  NotFoundPage:FC=()=> {
    
    return (
        <div className="not-found-page-wrapper">
            <div className="not-found-block">
                <div className="not-found-oops-title">
                <span className="left-side-span-title">
                    <MoodBadIcon  color="secondary"  style={{fontSize:60}}/>
                    </span>
                    Ooops...
                    <span className="right-side-span-title">
                    <MoodBadIcon   color="secondary" style={{fontSize:100}} />
                    </span>
                </div>
                <div className="not-found-title">
                    We cannot find this page, please go back
                </div>
                <div className="not-found-button">
                <Link to="/" className="button-auth">{"<"}- Back</Link>
                    
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage
