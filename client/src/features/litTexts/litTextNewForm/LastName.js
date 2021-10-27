import { useMemo } from 'react'
import { Grid, TextField, } from '@mui/material'
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'

export default function LastName({ 
	famNameFirst, 
	handleFamNameFirstClick, 
	handleFormChange, 
	firstName, 
	lastName, 
	isAuthor 
}) {

	const nameField = (label) => {
		const firstLast = label.includes("ast") || label.includes("amily") ? "last_name" : "first_name"
		const name = label.includes("ast") || label.includes("amily") ? lastName : firstName
		return (
			<TextField
				onChange={handleFormChange}
				autoComplete={firstLast}
				name={firstLast}
				value={name}
				required
				id={firstLast}
				sx={{ backgroundColor: "#fff", width: "100%" }}
				label={label}
			/>			
		)
	}

	const nameLabel = (nameType) => {
		if (isAuthor) {
			return `Author's ${nameType.toLowerCase()}`
		} else {
			return nameType
		}
	}
	
	const firstLastTt = () => {
		if (isAuthor) {
			return (
				<div>
					Include middle names and initials in <b>FIRST NAME</b>
					<br/><br/>If an author only has one name, include it in <b>LAST NAME</b>
					<br/><br/>See <a 
						href="https://libguides.dickinson.edu/citing/mla7capitalization/" 
						rel="noreferrer" target="_blank" 
						style={{ color: "#d1dbe0"}}
					>guidelines</a> for where to put particles like <em>de</em>, <em>Del</em>, or <em>von</em> 
					<br/><br/>Click the arrows to show the author's family name first
				</div>				
			)
		} else {
			return (
				<div>
					Include middle names and initials in <b>FIRST NAME</b>
					<br/><br/>Click the arrows to list your family name first
				</div>
			)
		}
	}

	const compareArrow = () => {
		return (
				<Grid item xs="auto">
					<CompareArrowsIcon 
						onClick={handleFamNameFirstClick}
						sx={{ height: "62px", color: "#3e2723", cursor: "pointer" }}
					/>
				</Grid>
		)
	}

	const CustomWidthTooltip = useMemo(
		() => styled(({ className, ...props }) => (
			<Tooltip {...props} classes={{ popper: className }} />
		))({
			[`& .${tooltipClasses.tooltip}`]: {
				maxWidth: 400,
			},
		}), [])


	if(famNameFirst) {
		return (
				<CustomWidthTooltip 
					title={<div>{isAuthor ? "Author" : "You"} will be alphebetized by family name<br/><br/>Click the arrows to show family name last</div>}
					arrow
				>
				<Grid container item xs={12} sx={{ mx: "5%", my: 1, width: "90%"}}>
					<Grid item xs sx={{ mr: "5px" }}>
						{nameField(nameLabel("Family name"))}
					</Grid>
					{compareArrow()}
					<Grid item xs sx={{ ml: "5px" }}>
						{nameField(nameLabel("Given name"))}
					</Grid>
				</Grid>
			</CustomWidthTooltip>
		)
	} else {
		return (
			<CustomWidthTooltip title={firstLastTt()} 
				arrow
			>
				<Grid container item xs={12} sx={{ mx: "5%", my: 1, width: "90%"}}>
					<Grid item xs sx={{ mr: "5px" }}>
						<TextField
							onChange={handleFormChange}
							autoComplete="first_name"
							name="first_name"
							id="first_name"
							value={firstName}
							sx={{ mr: 1, backgroundColor: "#fff", width: "100%" }}
							label={nameLabel("Given name(s)")}
						/>
					</Grid>
					{compareArrow()}
					<Grid item xs sx={{ ml: "5px" }}>
						{nameField(nameLabel("Family name"))}
					</Grid>
				</Grid>
			</CustomWidthTooltip>
		)
	}
}