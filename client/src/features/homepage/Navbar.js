import { useState } from "react"
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../users/userSlice'
import { fetchUserById } from '../users/showUserSlice'
import logoWhite from '../../img/logoWhite.png' 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import { Avatar } from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';


export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null)
  const isMenuOpen = Boolean(anchorEl);

	const dispatch = useDispatch()
  const history = useHistory()

	const userState = useSelector((state) => state.user)
  const user = userState.entities.length > 0 && userState.errors.length === 0 ? userState.entities[0] : null
	const fullName = userState.entities.length > 0 && userState.errors.length === 0 ? user.fullname : null
	const imageUrl = userState.entities.length > 0 && userState.errors.length === 0 ? user.image : null

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

	const handleMenuClose = () => {
    setAnchorEl(null);
  };

	const handleProfileClick = () => {
		handleMenuClose()
		dispatch(fetchUserById(user.id))
		history.push(`/users/${user.id}`)
	}

	const handleLoginClick = () => {
		handleMenuClose()
    history.push('/login')
	}

  const handleLogout = () => {
		handleMenuClose()
    dispatch(logoutUser())
    history.push('/login')
	}

	const handleTextsClick = () => {
		history.push('/texts')
	}

	const handleUsersClick = () => {
		history.push('/users')
	}

	const handleAboutClick = () => {
		// history.push('/users')
	}

	const handleNameClick = () => {
		history.push('/')
	}

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
			{userState.entities.length > 0 ?
				<MenuItem onClick={handleProfileClick}>Profile</MenuItem>
				: <MenuItem onClick={handleLoginClick}>Login</MenuItem> }
			{userState.entities.length > 0 ?
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
				: null}
    </Menu>
  );



	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" >
				<Toolbar>
          <Tooltip title="Home" arrow>
						<img src={logoWhite} alt="Marginalia Logo" style={{ height: "69px", paddingRight: "20px", paddingBottom: "1px", cursor: "pointer"}} onClick={handleNameClick} />
					</Tooltip>
          <Tooltip title="Home" arrow>
						<Typography
							variant="h3"
							noWrap
							component="div"
							sx={{ 
								display: { xs: 'none', sm: 'block' }, 
								cursor: "pointer",
								fontFamily: "Didot",
							}}
							onClick={handleNameClick}
						>
							<b>Marginalia</b>
						</Typography>
					</Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}></Box>
						<Tooltip title="About" arrow>
							<IconButton aria-label="about" color="inherit" onClick={handleAboutClick} >
								<InfoIcon sx={{ fontSize: 31, pl: 1 }} />
							</IconButton>
						</Tooltip>
						<Tooltip title="Users" arrow>
							<IconButton aria-label="all users" color="inherit" onClick={handleUsersClick} >
								<PeopleIcon sx={{ fontSize: 39, pl: 2 }} />
							</IconButton>
						</Tooltip>
            <Tooltip title="Texts" arrow>
							<IconButton aria-label="all texts" color="inherit" onClick={handleTextsClick} >
								<MenuBookIcon sx={{ fontSize: 40, pl: 2 }} />
							</IconButton>
						</Tooltip>
						{userState.entities.length === 0 ?
							<Tooltip title="Me" arrow>
								<IconButton
									edge="end"
									aria-label="account of current user"
									aria-controls={menuId}
									aria-haspopup="true"
									onClick={handleProfileMenuOpen}
									color="inherit"
								>
									<AccountCircle sx={{ fontSize: 55, pl: 2 }} />
								</IconButton>
							</Tooltip>
						:
							<Tooltip title="Me" arrow>
								<Avatar 
									alt={fullName} 
									src={imageUrl} 
									sx={{ width: 55, height: 55, cursor: "pointer", ml: 3 }}
									edge="end"
									aria-label="account of current user"
									aria-controls={menuId}
									aria-haspopup="true"
									onClick={handleProfileMenuOpen}
									color="inherit"
								/>
							</Tooltip>
						}
					</Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
	)

	// 	<header style={{ backgroundColor: "Gainsboro", 'paddingTop':5, 'paddingBottom':5 }} >
	// 		<Link to='/' style={{ 'paddingLeft':15, 'paddingRight':15, fontSize:30 }} >Marginalia</Link>
	// 		{/* {user && allUsers ? */}
	// 		{userState.entities.length > 0 ?
	// 			<Fragment>
	// 				<Link to='/users'>Users</Link>
	// 				<Link to='/texts' style={{ 'paddingLeft':15}} >Texts</Link>
	// 			</Fragment>
	// 		: null}
	// 		{userState.entities.length > 0 ? 
	// 			<Fragment>
	// 				<span style={{ float: "right", 'paddingRight':15, 'paddingTop':10 }} >
	// 					<span style={{'paddingLeft':15, 'paddingRight':15}}>Welcome, <Link to={`/users/${user.id}`} >{user.fullname}</Link></span>
	// 					<button onClick={handleLogout}>Logout</button>
	// 				</span>				
	// 			</Fragment>
	// 		:
	// 			<span style={{ float: "right", 'paddingRight':15, 'paddingTop':10 }} ><b><Link to='/login'>Please login</Link></b></span>
	// 		}
	// 	</header>
	// )
}