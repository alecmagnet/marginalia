import { useState, useEffect, Fragment } from 'react'
import { Switch, Route, Link, useHistory, Redirect } from 'react-router-dom';
import '../App.css';
import LitTextsContainer from './LitTextsContainer';
import LitTextShow from './LitTextShow';
import LoginContainer from './LoginContainer';
import Navbar from './Navbar';
import UsersContainer from './UsersContainer'
import UserShow from './UserShow';
// import TestParseLitText from './TestParseLitText';
// import TestFormNewText from './TestFormNewText'


function App() {
  const [user, setUser] = useState(null)
  const [allUsers, setAllUsers] = useState([])
  const [litTexts, setLitTexts] = useState([])
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
    history.push('/')
  }

  function onLogout() {
    setUser(null)
    history.push('/')
 }

  // function appOnAddComment(data) {
  //   setPosts([data, ...posts])
  // }
  
  // function appOnEditPost(data) {
  //   let editedPostArr = posts.filter(post => parseInt(post.id) !== parseInt(data.id))
  //   setPosts([data, ...editedPostArr])
  // }
  
  // function appOnDeletePost(data) {
  //   let newArr = posts.filter(post => post.id !== data)
  //   setPosts(newArr)
  // }

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
      {user && litTexts ?
        <div>
          <Switch>
            <Route exact path='/'>
              <div className="centered-in-window" >
                <div className="centered-in-div" >
                  <h1>Welcome to Marginalia</h1>
                  <div className="centered-in-div" style={{ width: "75%" }} >
                    <Link to='/texts'><div style={{ borderStyle: "solid", borderWidth: 1, padding: 5, position: "relative", textAlign: "center" }} ><h1>Browse Texts</h1></div></Link>
                    <p />
                    <Link to='/users'><div style={{ borderStyle: "solid", borderWidth: 1, padding: 5, position: "relative", textAlign: "center" }} ><h1>Browse Users</h1></div></Link>
                    {/* <TestParseLitText /> */}
                  </div>
                </div>
              </div>
            </Route>

            <Route exact path='/texts'>
              <LitTextsContainer
                user={user}
                litTexts={litTexts} 
              />
            </Route>

            <Route exact path='/texts/:id'>
              <LitTextShow
                forceRender={forceRender}
                user={user}
                allUsers={allUsers}
                litTexts={litTexts} 
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
