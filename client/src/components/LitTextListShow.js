import { Link } from 'react-router-dom'
import TotalCommentsAndReplies from './TotalCommentsAndReplies'

export default function LitTextListShow({ litText }) {
	const { title, author, pubdate, content, id, prose } = litText

	let parsedContent = ""
	if (content && prose) {
		parsedContent = content.replace(/(<([^>]+)>)/gi, " ")
	} else if (content && !prose) {
		let p1 = content.replaceAll('<br/>', " / ")
		let p2 = p1.replaceAll('</p>', " // ")
		parsedContent = p2.replace(/(<([^>]+)>)/gi, " ")
	}
	const showContent = parsedContent.slice(0, 100)

	return (
		<div style={{ padding: 10 }} >
				<div style={{ borderStyle: "solid", borderWidth: 1, padding: 5 }} >
				<Link to={`/texts/${id}`}><h3>{title}</h3></Link>
				<p>by {author}</p>
				<p>{pubdate}</p>
				<p>Preview: {showContent}...</p> 
				<TotalCommentsAndReplies arr={litText.comments} />
			</div>
		</div>
	)
}