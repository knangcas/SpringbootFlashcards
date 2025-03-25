import {Outlet} from 'react-router-dom'
import {Link} from 'react-router'
import Axios from 'axios'
import {useState} from "react";



export default function Layout() {




    return (
        <>
        <header>
            <h1>F L A S H C A R D S</h1>
            <nav>
                <Link to= "/">- Study -  </Link> <Link to= "/manage">   Manage Deck -</Link>
            </nav>
        </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}