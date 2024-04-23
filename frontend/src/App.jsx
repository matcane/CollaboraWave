import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';


function App() {

  let isLogged = window.localStorage.getItem("isLogged");

  return (
    <>
    {isLogged ? <HomePage /> : <LandingPage />}
    </>
  )
}

export default App