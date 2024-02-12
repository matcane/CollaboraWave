import { useState } from 'react'
import Header from './Header.jsx';
import Board from './Board.jsx';


function App() {
  
  let loggedUser = window.localStorage.getItem("isLogged");

  if (loggedUser){
    return (
      <>
        <Header user={loggedUser}/>
        <Board />
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
