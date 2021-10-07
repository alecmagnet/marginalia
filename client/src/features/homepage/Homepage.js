import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Typography, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material'

export default function Homepage() {
  const litTextsState = useSelector((state) => state.litTexts)
	const allUsersState = useSelector((state) => state.allUsers)
  const userState = useSelector((state) => state.user)
  const user = userState.entities.length > 0 ? userState.entities[0] : null
	const history = useHistory()

	let recentlyAdded = []
	if (litTextsState.status === "idle" && litTextsState.entities.length > 0) {
		let toSort = litTextsState.entities
		let sortArr = toSort.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
		let sliceArr = sortArr.slice(0,3)
		recentlyAdded = sliceArr
	}

	let recentlyJoined = []
	if (allUsersState.status === "idle" && allUsersState.entities.length > 0) {
		console.log("allUsersState", allUsersState)
		let toSort = allUsersState.entities
		console.log("allUsers toSort", toSort)
		let sortArr = toSort.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
		console.log("allUsers sortArr", sortArr)
		let sliceArr = sortArr.slice(0,3)
		recentlyJoined = sliceArr
	}

	const [ litTextOrder, setLitTextOrder ] = useState(recentlyAdded)
	const [ allUserOrder, setAllUserOrder ] = useState(recentlyJoined)

	const handleTextsToggle = (event, newOrder) => {
		setLitTextOrder(newOrder)
	}

	const handleUsersToggle = (event, newOrder) => {
		setAllUserOrder(newOrder)
	}

	const newestComment = (e) => {
		let sortArr = e.comments.sort((a, b) => b.created_at - a.created_at)
		let newest = sortArr[0]
		return newest
	}

	const recentlyCommented = (arr) => {
		let sortArr = arr.sort((a, b) => newestComment(b) - newestComment(a))
		let topFour = sortArr.slice(0,3)
		return topFour
	}

	if (user && litTextsState.entities.length > 0 && allUsersState.entities.length > 0) {
		
		console.log("hp LTrecentlyAdded", recentlyAdded)
		console.log("hp AUrecentlyJoined", recentlyJoined)
		console.log("hp LTrecentlyAdded", recentlyCommented(litTextsState.entities))
		console.log("hp AUrecentlyCommented", recentlyCommented(allUsersState.entities))

		const handleClickLitTexts = () => {
			history.push("/texts")
		}

		const handleClickAllUsers = () => {
			history.push("/users")
		}

	} else {
		return(
			<div className="centered-in-window" >
				<h1>Loading...</h1>
			</div>
		)
	}




	return (
		<div className="centered-in-window" >
			<div className="centered-in-div" >
				{/* <h1>Welcome to Marginalia</h1>
				<div className="centered-in-div" style={{ width: "75%" }} >
					<Link to='/texts'><div style={{ borderStyle: "solid", borderWidth: 1, padding: 5, position: "relative", textAlign: "center" }} ><h1>Browse Texts</h1></div></Link>
					<p />
					<Link to='/users'><div style={{ borderStyle: "solid", borderWidth: 1, padding: 5, position: "relative", textAlign: "center" }} ><h1>Browse Users</h1></div></Link>
				</div> */}
			</div>
		</div>		
	)
}