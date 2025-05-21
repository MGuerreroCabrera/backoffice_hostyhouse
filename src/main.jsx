import './index.css'
import "./GlobalCSS.css";
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UsersProvider from './providers/UsersProvider.jsx'

createRoot(document.querySelector("#root")).render(
    <BrowserRouter>
    <UsersProvider>
        <App />
    </UsersProvider>
    </BrowserRouter>
)
