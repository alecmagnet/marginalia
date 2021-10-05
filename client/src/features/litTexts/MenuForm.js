import { Typography, Grid, List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material'

export default function MenuForm() {
	const options = ["All", "Poetry", "Prose"]

  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(1)
  const open = Boolean(anchorEl)
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

	return(
		<div></div>
	)
}