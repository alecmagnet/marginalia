import { useState, Fragment } from 'react'
import '../App.css';
import LoginContainer from './LoginContainer';

function App() {
  const [user, setUser] = useState(null)

  function onLogin(newUser) {
    setUser(newUser)
  }

  function onLogout() {
    setUser(null)
  }

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => 
      // console.log(r)
      // r.errors ? console.log(r.errors) : onLogout
      onLogout
    )
  }

  return (
    <Fragment>
      {user ?
        <div>
          <h1>Welcome, {user.username}</h1>
          <button onClick={handleLogout} >Logout</button>
        </div>
      :
        <div className="centered-in-window" >
          <LoginContainer onLogin={onLogin} />
        </div>
      }
    </Fragment>
  );
}

export default App;
