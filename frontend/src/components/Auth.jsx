import { useState } from 'react';
import { sign_in, sign_up } from '../services/auth';
import './Auth.css';

function Auth({type, update}) {
    console.log(type);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const clear = () => {
        setUsername("");
        setPassword("");
        window.location.reload(false);
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (type === "sign up") {
            const response = await sign_up(username, password);
            type = "sign in";
        }
        if (type === "sign in") {
            const response = await sign_in(username, password);
            window.localStorage.clear();
            window.localStorage.setItem('access_token', response.access);
            window.localStorage.setItem('refresh_token', response.refresh);
            window.localStorage.setItem("isLogged", true);
            window.localStorage.setItem("view", "Dashboard");
            clear();
        }
      };
    
    return(
        <div className='auth-form-container'>
            <form className='auth-form'>
                <label htmlFor="email-login">Username</label>
                <input
                    type="text" 
                    name="login" 
                    id="email-login" 
                    autoComplete="off"
                    required value={username} 
                    onChange={e => setUsername(e.target.value)}
                /> 
                <label htmlFor="password-login">Password</label>
                <input
                    type="password" 
                    name='passowrd' 
                    id="password-login" 
                    autoComplete="off"
                    required value={password} 
                    onChange={e => setPassword(e.target.value)}
                />
            <button onClick={e => handleOnSubmit(e)}>{type[0].toUpperCase() + type.slice(1)}</button>
            <button onClick={update}>Close</button>
            </form>
        </div>
    )
}

export default Auth