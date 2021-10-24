import { useEffect, useState, Fragment } from 'react'
import { Switch, Route } from 'react-router-dom';
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
import Homepage from './features/homepage/Homepage';
import { fetchLitTexts } from './features/litTexts/litTextsSlice';
import { fetchAllUsers } from './features/users/allUsersSlice'
import { fetchComments } from './features/comments/commentsSlice';
import { addLoginUser } from './features/users/userSlice'

export default function App() {
  const commentsState = useSelector((state) => state.comments)  
  const userState = useSelector((state) => state.user)
  const user = userState.entities.length > 0 && userState.errors.length === 0 ? userState.entities[0] : null
  const dispatch = useDispatch()

  const onAuth = () => {
    fetch("/auth").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          dispatch(addLoginUser(data))
          dispatch(fetchLitTexts())
          dispatch(fetchAllUsers())
          dispatch(fetchComments())
          // handleAuth()
        });
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
  })

  return (
    <ThemeProvider theme={theme}>
        <Fragment>
          <Navbar />
          <Switch>
            {user ?
              <Fragment>
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
                </Route>
              </Fragment>
            : userState.status === "pending" || commentsState.status === "pending" ?
              <Fragment>
                <div className="centered-in-window" >
                  <div className="dot-flashing"></div>
                </div>
              </Fragment>
            : 
              <Fragment>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/signup">
                  <Signup />
                </Route>
                <Route exact path='/'>
                  <Homepage />
                </Route>
              </Fragment>
            }      
          </Switch>
        </Fragment>
    </ThemeProvider>
  );
}