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
            <h1 className="title">F L A S H C A R D S</h1>
            <nav className="jbFont navStyle" >
                <Link to= "/"><ControlButton controlText={"Study"}/></Link>  <Link to= "/manage"> <ControlButton controlText={"Manage Deck"}/> </Link>
            </nav>
        </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}