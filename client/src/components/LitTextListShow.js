import { Link } from 'react-router-dom'

export default function LitTextListShow({ litText }) {
	const { title, author, pubdate, content, id } = litText
	const rawContent = content ? content.slice(0, 100) : ""
	const showContent = rawContent.replace(/(<([^>]+)>)/gi, " ")

	return (
		<div style={{ padding: 10 }} >
				<div style={{ borderStyle: "solid", borderWidth: 1, padding: 5 }} >
				<Link to={`/texts/${id}`}><h3>{title}</h3></Link>
				<p>by {author}</p>
				<p>{pubdate}</p>
				<p>Preview: {showContent}...</p> 
			</div>
		</div>
	)
}