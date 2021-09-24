import { useState, useEffect, Fragment } from 'react'
import { Switch, Route } from 'react-router';
import '../App.css';
import LitTextsContainer from './LitTextsContainer';
import LitTextShow from './LitTextShow';
import LoginContainer from './LoginContainer';
// import TestFormNewText from './TestFormNewText'
import Navbar from './Navbar';
import UsersContainer from './UsersContainer'
import UserShow from './UserShow';

function App() {
  const [user, setUser] = useState(null)
  const [allUsers, setAllUsers] = useState([])
  const [litTexts, setLitTexts] = useState([])

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


  return (
    <Fragment>
      <Navbar 
        onLogout={onLogout} 
        user={user} 
        allUsers={allUsers}
      />
      {user && litTexts ?
        <div>
          <Switch>
            <Route exact path='/'>
              <h1>This is the homepage. I don't know what goes here yet...</h1>
            </Route>

            <Route exact path='/texts'>
              <LitTextsContainer
                user={user}
                litTexts={litTexts} />
            </Route>

            <Route exact path='/texts/:id'>
              <LitTextShow
                // litText={litTexts[0]}
                user={user}
                litTexts={litTexts} />
            </Route>

            <Route exact path='/users'>
              <h1>UsersContainer</h1>
              <UsersContainer 
                user={user}
                allUsers={allUsers} />
            </Route>

            <Route exact path='/users/:id'>
              <UserShow
                user={user}
                allUsers={allUsers} />
            </Route>

            {/* <TestFormNewText /> */}
          </Switch>
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
