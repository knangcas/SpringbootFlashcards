import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Pages/index.css'
import App from './Pages/App.jsx'
import {BrowserRouter, Route, Routes} from "react-router";
import Layout from "./Layout";
import Manage from "./Pages/Manage.jsx";

createRoot(document.getElementById('root')).render(

      <BrowserRouter>
          <Routes>
            <Route path ="/" element={<Layout/>}>
                <Route index element={<App/>}/>
                <Route path="/manage" element={<Manage/>}/>
            </Route>
          </Routes>
      </BrowserRouter>
,
)
