import React,{useEffect,useContext} from 'react';
import Spinner from '../components/Layout/Spinner';
import NavBar from '../components/Layout/NavBar';
import Body from '../components/Layout/Body';
function projectDashboard() {


    return (
        <div className="flex flex-col h-screen w-screen">
            <NavBar />
            <Body />
        </div>
    )
}

export default projectDashboard
