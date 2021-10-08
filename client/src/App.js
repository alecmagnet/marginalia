import { useEffect, useState, Fragment } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles'
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
import { addLoginUser } from './features/users/userSlice'
// import TestParseLitText from './TestParseLitText';

export default function App() {
  const [authorized, setAuthorized] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const userState = useSelector((state) => state.user)
  const commentsState = useSelector((state) => state.comments)  
  const user = userState.entities.length > 0 && userState.errors.length === 0 ? userState.entities[0] : null
  
  const handleAuth = () => {
    setAuthorized(true)
  }

  const onAuth = () => {
    fetch("/auth").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          dispatch(addLoginUser(data))
          dispatch(fetchLitTexts())
          dispatch(fetchAllUsers())
          dispatch(fetchComments())
          handleAuth()
        });
      } else {
        history.push("/login")
      }
    });
  }

  useEffect(() => {
    onAuth()
  }, [])

  const theme = createTheme({
    palette: {
      primary: {
        main: "#3e2723",
      },
      secondary: {
        main: "#263238",
      },
    },
    // typography: {
    //   fontFamily: "Georgia"
    // }
  })

  return (
    <ThemeProvider theme={theme}>
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
                  <UsersContainer />
                </Route>

                <Route exact path='/users/:id'>
                  <UserShow />
                </Route>

                <Route exact path='/'>
                  <Homepage />
                  {/* <TestFormNewText /> */}
                </Route>
              </div>
            : userState.status === "pending" || commentsState.status === "pending" ?
              <div className="centered-in-window" >
                <h1>Loading...</h1>
              </div>
            : 
              <div className="centered-in-window" >
                <div style={{ padding: 15 }} >
                <Route exact path="/login">
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
    </ThemeProvider>
  );
}
