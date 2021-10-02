import { useEffect, Fragment } from 'react'
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import LitTextsContainer from './features/litTexts/LitTextsContainer';
import LitTextShow from './features/litTexts/LitTextShow';
import LoginContainer from './features/homepage/LoginContainer';
import Navbar from './features/homepage/Navbar';
import UsersContainer from './features/users/UsersContainer'
import UserShow from './features/users/UserShow';
import Homepage from './features/homepage/Homepage'
import { fetchLitTexts } from './features/litTexts/litTextsSlice';
import { fetchAllUsers } from './features/users/allUsersSlice'
import { authorize, loginUser, logoutUser, signupUser } from './features/users/userSlice'
// import TestParseLitText from './TestParseLitText';
// import TestFormNewText from './TestFormNewText'


function App() {
  const dispatch = useDispatch()
  const history = useHistory()

  const userState = useSelector((state) => state.user)
  const user = userState.entities.length > 0 ? userState.entities[0] : null

  const onAuth = () => {
    dispatch(authorize())
    .then (() => {
      if (userState.status === "idle") {
        dispatch(fetchLitTexts())
        dispatch(fetchAllUsers())
      } else {
      history.push("/")
    }})
  }

  useEffect(() => {
    onAuth()
  }, [])

  function onLogin(newUser) {
    dispatch(fetchLitTexts())
    dispatch(fetchAllUsers())
    history.push('/')
  }

  function onLogout() {
    dispatch(logoutUser())
    history.push('/')
 }


  // function updateUser(data) {
  //   setUser(data)
  // }


  return (
    <Fragment>
      <Navbar 
        onLogout={onLogout} 
      />
      {user ?
        <div>
          <Switch>
            <Route exact path='/texts'>
              <LitTextsContainer />
            </Route>

            <Route exact path='/texts/:id'>
              <LitTextShow />
            </Route>

            <Route exact path='/users'>
              <h1>UsersContainer</h1>
              <UsersContainer />
            </Route>

            <Redirect from="/x-users/:id" to="/users/:id" />
            <Route exact path='/users/:id'>
              <UserShow />
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
