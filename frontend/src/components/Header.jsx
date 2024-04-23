import { sign_out } from "../services/auth"
import './Header.css'

function Header({auth, update}) {
    let header_title = window.localStorage.getItem("board_title") || "";
    let view = window.localStorage.getItem("view");
    const handleLogout = async () => {
        const response = await sign_out();
        update();
    }
    const handleHomeButton = async () => {
        if (window.localStorage.getItem("view")) {window.localStorage.setItem("view", "Dashboard");}
        window.localStorage.removeItem("board_title");
        window.location.reload(false);
    }
    return(
        <header>
            <h1>
                <span className="app-title" onClick={() => handleHomeButton()}>CollaboraWave</span>
                <span className="spacer"> | </span>
                <span className="data">{view !== "Dashboard" ? header_title : "Dashboard"}</span>
            </h1>
            {auth ? <button onClick={handleLogout}>Sign out</button> : <div><button onClick={() => update("sign up")}>Sign up</button><button onClick={() => update("sign in")}>Sign in</button></div>}
        </header>
    )
}

export default Header