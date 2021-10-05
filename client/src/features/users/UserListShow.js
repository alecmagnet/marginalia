import { Link } from 'react-router-dom'
import TotalCommentsAndReplies from '../shared/TotalCommentsAndReplies'

export default function UserListShow({ showUser }) {
	const { username, fullname, bio, id } = showUser
	const showBio = bio ? `${bio.slice(0, 60)}...` : ""

	return (
			<div style={{ padding: 10 }} >
				<div style={{ borderStyle: "solid", borderWidth: 1, padding: 5 }} >
					<h3>Name: {fullname}</h3>
					<Link to={`/users/${id}`}><div>{username}</div></Link>
					<p>Bio: {showBio}</p> 
					<TotalCommentsAndReplies Id={showUser.id} source="user" />
					{/* <TotalCommentsAndReplies arr={showUser.comments} /> */}
				</div>
			</div>
	)
}