import { Link } from 'react-router-dom'
import TotalCommentsAndReplies from './TotalCommentsAndReplies'

function UserListShow({ showUser }) {
	const { username, fullname, bio, id } = showUser

	const showBio = bio ? `${bio.slice(0, 60)}...` : ""

	return (
			<div style={{ padding: 10 }} >
				<div style={{ borderStyle: "solid", borderWidth: 1, padding: 5 }} >
					<Link to={`/users/${id}`}><h3>{username}</h3></Link>
					<p>Name: {fullname}</p>
					<p>Bio: {showBio}</p> 
					<TotalCommentsAndReplies arr={showUser.comments} />
				</div>
			</div>
	)
}

export default UserListShow