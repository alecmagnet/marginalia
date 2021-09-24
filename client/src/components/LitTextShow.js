import parse from 'html-react-parser'
import { useParams } from 'react-router-dom'
import { Fragment } from "react"

function LitTextShow({ litTexts }) {
	const params = useParams()
	const litText = litTexts.filter((text) => parseInt(text.id) === parseInt(params.id))[0]
	const parsedContent = litText ? parse(`${litText.content}`) : ""

	return (
		<Fragment>
			{litText ? 
				<div>
					<h3>{litText.title}</h3>
					<h4>{litText.author}</h4>
					<div>{parsedContent}</div>
				</div>
			: <h3>We're sorry, there is no such text</h3>}
		</Fragment>

	)
}

export default LitTextShow