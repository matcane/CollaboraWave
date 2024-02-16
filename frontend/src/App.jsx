import { useState } from 'react'
import Header from './Header.jsx';
import Dashboard from './Dashboard.jsx';


function App() {
  
  let loggedUser = window.localStorage.getItem("isLogged");

  if (loggedUser){
    return (
      <>
        <Header user={loggedUser}/>
        <Dashboard />
      </>
    )
  }
  else {
    return (
      <>
        <Header user={loggedUser}/>
      </>
    )
  }
  
}

export default App
