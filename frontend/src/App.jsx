import { useState } from 'react'
import Header from './Header.jsx';


function App() {
  
  const [loggedUser, setLoggedUser] = useState(false);

  if (loggedUser){
    return (
      <>
        <Header user={loggedUser} onUserChange={setLoggedUser}/>
      </>
    )
  }
  return (
    <>
      <Header user={loggedUser} onUserChange={setLoggedUser}/>
    </>
  )
}

export default App
