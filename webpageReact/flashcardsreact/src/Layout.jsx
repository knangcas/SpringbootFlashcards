import {Outlet} from 'react-router-dom'
import {Link} from 'react-router'
import Axios from 'axios'
import {useState} from "react";
import './layout.css';
import ControlButton from "./Components/ControlButton.jsx";


export default function Layout() {




    return (
        <>
        <header>
            <h1>F L A S H C A R D S</h1>
            <nav style={{width:"60%", margin: "auto", display:"flex", justifyContent:"Space-Evenly",  alignItems:"Center"}}>
                <Link to= "/"><ControlButton controlText={"Study"}/></Link>  <Link to= "/manage"> <ControlButton controlText={"Manage Deck"}/> </Link>
            </nav>
        </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}