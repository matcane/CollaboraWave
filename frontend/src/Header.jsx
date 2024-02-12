import { useState } from 'react'
import Logo from './assets/logo.png'
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function Header(props) {

    const [isLoginFormVisible, setLoginFormVisibility] = useState(false);
    const [isRegisterFormVisible, setRegisterFormVisibility] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function Logout(e) {
        e.preventDefault();
        client.post(
            "/api/logout/",
            {withCredentials: true}
        ).then(function(res) {
            props.onUserChange(false);
        });
    }

    function submitLogin(e) {
        e.preventDefault();
        console.log(password);
        client.post(
          "/api/login/",
          {
            username: username,
            password: password
          }
        ).then(function(res) {
            props.onUserChange(true);
            setUsername("");
            setPassword("");
            setLoginFormVisibility(false);
        }).catch(function(error) {
            console.log(error.response.data);
        });
      }
    
    function submitRegister(e) {
        e.preventDefault();
        console.log(password);
        client.post(
          "/api/register/",
          {
            username: username,
            password: password
          }
        ).then(function(res) {
            props.onUserChange(true);
            setUsername("");
            setPassword("");
            setRegisterFormVisibility(false);
        }).catch(function(error) {
            console.log(error.response.data);
        });
      }

    const LoginForm = (e) => {
        e.preventDefault();
        setLoginFormVisibility(true);
        setRegisterFormVisibility(false);
      };

    const RegisterForm = (e) => {
        e.preventDefault();
        setRegisterFormVisibility(true);
        setLoginFormVisibility(false);
      };

    if (props.user) {
        return (
            <>
                <header>
                    <div className="logo">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <button className="login-button" onClick={e => Logout(e)}>Wyloguj się</button>
                </header>
            </>
          )
    }
    else {
        return (
            <>
                <header>
                    <div className="logo">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <button className="login-button" onClick={RegisterForm}>Zarejestruj się</button>
                    <button className="login-button" onClick={LoginForm}>Zaloguj się</button>
                </header>
                {isLoginFormVisible && (
                    <div className='login-form'>
                        <form onSubmit={e => submitLogin(e)}>
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" name="username" required value={username} onChange={e => setUsername(e.target.value)} />
                            <br />
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" required  value={password} onChange={e => setPassword(e.target.value)} />
                            <br />
                            <p></p>
                            <button type="submit">Login</button>
                            <button type="button" onClick={() => setLoginFormVisibility(false)}>Close</button>
                        </form>
                    </div>)}
                
                    {isRegisterFormVisible && (
                    <div className='login-form'>
                        <form onSubmit={e => submitRegister(e)}>
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" name="username" required value={username} onChange={e => setUsername(e.target.value)} />
                            <br />
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" required  value={password} onChange={e => setPassword(e.target.value)} />
                            <br />
                            <p></p>
                            <button type="submit">Register</button>
                            <button type="button" onClick={() => setRegisterFormVisibility(false)}>Close</button>
                        </form>
                    </div>)}
            </>
          )
    }
}

export default Header