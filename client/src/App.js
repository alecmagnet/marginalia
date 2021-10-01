import { useState, useEffect, Fragment } from 'react'
import { Switch, Route, Link, useHistory, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { fetchLitTexts } from './features/litTexts/litTextsSlice'
import './App.css';
// import { useSelector } from 'react-redux'
import LitTextsContainer from './features/litTexts/LitTextsContainer';
import LitTextShow from './features/litTexts/LitTextShow';
import LoginContainer from './features/homepage/LoginContainer';
import Navbar from './features/homepage/Navbar';
import UsersContainer from './features/users/UsersContainer'
import UserShow from './features/users/UserShow';
import Homepage from './features/homepage/Homepage'
import { fetchLitTexts } from './features/litTexts/litTextsSlice';
// import TestParseLitText from './TestParseLitText';
// import TestFormNewText from './TestFormNewText'


function App() {
  const [user, setUser] = useState(null)
  const [allUsers, setAllUsers] = useState([])
  // const [litTexts, setLitTexts] = useState([])
  const dispatch = useDispatch()

  const [changeState, setChangeState] = useState(false)

  	function forceRender(){
		setChangeState(!changeState)
	}

  let history = useHistory()

  // CHECKS TO SEE IF A USER IS ALREADY LOGGED IN
  useEffect(() => {
    fetch("/auth").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setUser(data)
          dispatch(fetchLitTexts())
          // fetchingLitTexts()
          fetchingUsers()
        });
      } else {
        history.push("/")
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
  // function fetchingLitTexts(){
  //   fetch("/lit_texts")
  //   .then((r) => r.json())
  //   .then((data) =>{ 
  //     let newestFirst = data.sort((a, b) => b.id - a.id)
  //     setLitTexts(newestFirst) 
  //   })
  // }

  function onLogin(newUser) {
    setUser(newUser)
    // fetchingLitTexts()
    // const LitTexts = useGetLitTexts()
    dispatch(fetchLitTexts())
    fetchingUsers()
    history.push('/')
  }

  function onLogout() {
    setUser(null)
    history.push('/')
 }


  // function updateUser(data) {
  //   setUser(data)
  // }


  return (
    <Fragment>
      <Navbar 
        onLogout={onLogout} 
        user={user} 
        allUsers={allUsers}
      />
      {user ?
        <div>
          <Switch>
            <Route exact path='/texts'>
              <LitTextsContainer
                user={user}
                // litTexts={litTexts} 
              />
            </Route>

            <Route exact path='/texts/:id'>
              <LitTextShow
                forceRender={forceRender}
                user={user}
                allUsers={allUsers}
                // litTexts={litTexts} 
              />
            </Route>

            <Route exact path='/users'>
              <h1>UsersContainer</h1>
              <UsersContainer 
                user={user}
                allUsers={allUsers} 
              />
            </Route>

            <Redirect from="/x-users/:id" to="/users/:id" />
            <Route exact path='/users/:id'>
              <UserShow
                user={user}
                allUsers={allUsers} />
            </Route>

            <Route exact path='/'>
              <Homepage />
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
