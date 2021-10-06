import { useState } from "react"
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../users/userSlice'

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';


export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null)
  const isMenuOpen = Boolean(anchorEl);

	const dispatch = useDispatch()
  const history = useHistory()

	const userState = useSelector((state) => state.user)
  const user = userState.entities.length > 0 && userState.errors.length === 0 ? userState.entities[0] : null


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

	const handleMenuClose = () => {
    setAnchorEl(null);
  };

	const handleProfileClick = () => {
		handleMenuClose()
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
		handleMenuClose()
		history.push('/texts')
	}

	const handleUsersClick = () => {
		handleMenuClose()
		history.push('/users')
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
					<Typography
						variant="h4"
						noWrap
						component="div"
						sx={{ 
							display: { xs: 'none', sm: 'block' }, 
							cursor: "pointer",
						}}
						onClick={handleNameClick}
					>
            MARGINALIA
          </Typography>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}></Box>
            <Tooltip title="Texts" arrow>
							<IconButton size="large" aria-label="all texts" color="inherit" onClick={handleTextsClick} >
								<MenuBookIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title="Users" arrow>
							<IconButton size="large" aria-label="all users" color="inherit" onClick={handleUsersClick} >
								<PeopleIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title="Me" arrow>
							<IconButton
								size="large"
								edge="end"
								aria-label="account of current user"
								aria-controls={menuId}
								aria-haspopup="true"
								onClick={handleProfileMenuOpen}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
						</Tooltip>
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