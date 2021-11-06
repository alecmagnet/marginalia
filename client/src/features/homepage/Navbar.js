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

	const handleSignupClick = () => {
		handleMenuClose()
    history.push('/signup')
	}

  const handleLogout = () => {
    dispatch(logoutUser())
		handleLoginClick()
	}

	const handleTextsClick = () => {
		userState.entities.length === 0 ?
    history.push('/login') :
		history.push('/texts') 
	}

	const handleUsersClick = () => {
		userState.entities.length === 0 ?
    history.push('/login') :
		history.push('/users')
	}

	const handleAboutClick = () => {
		history.push('/about')
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
				: <MenuItem onClick={handleLoginClick}>Log in</MenuItem> }
			{userState.entities.length > 0 ?
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
				: <MenuItem onClick={handleSignupClick}>Sign up</MenuItem>}
    </Menu>
  );



	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" >
				<Toolbar>
          <Tooltip title="Home" arrow>
						<img src={logoWhite} alt="Marginalia Logo" style={{ height: "70px", paddingRight: "20px", paddingBottom: "0px", cursor: "pointer"}} onClick={handleNameClick} />
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
						<Tooltip title="About" arrow>
							<IconButton aria-label="about" color="inherit" onClick={handleAboutClick} >
								<InfoIcon sx={{ fontSize: 32, px: 1, mb: -1  }} />
							</IconButton>
						</Tooltip>
						<Tooltip title="Members" arrow>
							<IconButton aria-label="all users" color="inherit" onClick={handleUsersClick} sx={{ px: 1, mb: -1 }}>
								<PeopleIcon sx={{ fontSize: 35, }} />
							</IconButton>
						</Tooltip>
            <Tooltip title="Library" arrow>
							<IconButton aria-label="all texts" color="inherit" onClick={handleTextsClick} >
								<MenuBookIcon sx={{ fontSize: 35, px: 1, mb: -1 }} />
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
}