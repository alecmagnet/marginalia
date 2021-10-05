import { useEffect, Fragment } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Navbar from './features/homepage/Navbar';
import Signup from './features/homepage/Signup';
import Login from './features/homepage/Login';
import LitTextsContainer from './features/litTexts/LitTextsContainer';
import LitTextShow from './features/litTexts/LitTextShow';
import UsersContainer from './features/users/UsersContainer'
import UserShow from './features/users/UserShow';
import Homepage from './features/homepage/Homepage'
import { fetchLitTexts } from './features/litTexts/litTextsSlice';
import { fetchAllUsers } from './features/users/allUsersSlice'
import { fetchComments } from './features/comments/commentsSlice';
import { authorize, addLoginUser } from './features/users/userSlice'
// import TestParseLitText from './TestParseLitText';
// import TestFormNewText from './TestFormNewText'


export default function App() {
  const dispatch = useDispatch()
  const history = useHistory()

  const userState = useSelector((state) => state.user)
  const user = userState.entities.length > 0 ? userState.entities[0] : null

  const onAuth = () => {
    fetch("/auth").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          addLoginUser(data)
          dispatch(fetchLitTexts())
          dispatch(fetchAllUsers())
          dispatch(fetchComments())
        });
      } else {
        history.push("/login")
      }
    });
  }
  // const onAuth = () => {
  //   dispatch(authorize())
  //   .then (() => {
  //     if (userState.errors.length > 0) {
  //       history.push("/login")
  //     } else if (userState.entities.length !== 1) {
  //       history.push("/login")
  //     } else {
  //       dispatch(fetchLitTexts())
  //       dispatch(fetchAllUsers())
  //       dispatch(fetchComments())
  //     }
  //   })
  // }

  useEffect(() => {
    onAuth()
  }, [])

  // function onLogin(newUser) {
  //   dispatch(fetchLitTexts())
  //   dispatch(fetchAllUsers())
  //   history.push('/')
  // }

  // function onLogout() {
  //   dispatch(logoutUser())
  //   history.push('/')
  // }


  // function updateUser(data) {
  //   setUser(data)
  // }


  return (
    <Fragment>
      <Navbar />
      <Switch>
        {user ?
          <div>
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

            {/* <Redirect from="/x-users/:id" to="/users/:id" /> */}
            <Route exact path='/users/:id'>
              <UserShow />
            </Route>

            <Route exact path='/'>
              <Homepage />
              {/* <TestFormNewText /> */}
            </Route>
          </div>
        :
          <div className="centered-in-window" >
            <div style={{ padding: 15 }} >
            <Route exact path="/login">
              {/* <LoginContainer onLogin={onLogin} /> */}
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            </div>
          </div>
        }
      </Switch>
    </Fragment>
  );
}
