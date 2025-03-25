import {Outlet} from 'react-router-dom'
import {Link} from 'react-router'

export default function Layout() {

    return (
        <>
        <header>
            <h1>Test</h1>
            <nav>
                <Link to= "/">Study</Link> <Link to= "/manage">Manage Deck</Link>
            </nav>
        </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}