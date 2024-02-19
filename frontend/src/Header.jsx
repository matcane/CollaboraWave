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

    function handleBackToDashboard() {
        window.localStorage.removeItem("boardOpen");
        window.location.reload(false);
    }

    function Logout(e) {
        e.preventDefault();
        client.post(
            "/api/logout/", {
                refresh_token:localStorage.getItem('refresh_token')
                },
            {withCredentials: true}
        ).then(function(res) {
            window.localStorage.removeItem("isLogged");
            window.location.reload(false);
        });
    }

    function submitLogin(e) {
        e.preventDefault();
        console.log(password);
        client.post(
          "/token/",
          {
            username: username,
            password: password
          }
        ).then(function(res) {
            window.localStorage.clear();
            window.localStorage.setItem('access_token', res.data.access);
            window.localStorage.setItem('refresh_token', res.data.refresh);
            //axios.defaults.headers.common['Authorization'] = `Bearer ${res.data['access']}`;
            window.localStorage.setItem("isLogged", true);
            setUsername("");
            setPassword("");
            setLoginFormVisibility(false);
            window.location.reload(false);
            console.log(res);
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
            window.localStorage.setItem("isLogged", true);
            setUsername("");
            setPassword("");
            setRegisterFormVisibility(false);
            window.location.reload(false);
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
                        <img src={Logo} alt="Logo" onClick={() => handleBackToDashboard()}/>
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