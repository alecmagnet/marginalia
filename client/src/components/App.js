import { useState, useEffect, Fragment } from 'react'
import '../App.css';
import LitTextShow from './LitTextShow';
import LoginContainer from './LoginContainer';
// import TestFormNewText from './TestFormNewText'

function App() {
  const [user, setUser] = useState(null)
  const [allUsers, setAllUsers] = useState(null)
  const [litTexts, setLitTexts] = useState(null)

  // CHECKS TO SEE IF A USER IS ALREADY LOGGED IN
  useEffect(() => {
    fetch("/auth").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setUser(data)
          fetchingLitTexts()
          fetchingUsers()
        });
      }
    });
  }, []);

  // FETCHES ALL USERS
  function fetchingUsers(){
    fetch("/users")
    .then((res) => res.json())
    .then((data)=> setAllUsers(data))
  }

  // FETCHES ALL LIT_TEXTS
  function fetchingLitTexts(){
    fetch("/lit_texts")
    .then((r) => r.json())
    .then((data) =>{ 
      let newestFirst = data.sort((a, b) => b.id - a.id)
      setLitTexts(newestFirst) 
    })
  }

  function onLogin(newUser) {
    setUser(newUser)
    fetchingLitTexts()
    fetchingUsers()
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
      onLogout()
    )
  }

  return (
    <Fragment>
      {user && litTexts ?
        <div>
          <h1>Welcome, {user.username}</h1>
          <button onClick={handleLogout} >Logout</button>
          <LitTextShow litText={litTexts[0]} />
          {/* <TestFormNewText /> */}
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
