import { useSelector } from 'react-redux'
import LitTextListShow from "./LitTextListShow"

export default function LitTextsContainer () {
  const { entities, status } = useSelector((state) => state.litTexts)

	if (status === "idle") {
		const renderLitTexts = entities.map((text) => <LitTextListShow key={text.id} litText={text} />) 
		return (
			<div>{renderLitTexts}</div>
		)
		} else if (status === "loading") {
			return (
				<h1>Loading...</h1>
			)
		} else {
			return (
				<h1>We're sorry. There's been an error.</h1>
			)
		}


	// return (
	// 	<Fragment>
	// 		{status === "idle" ? 
	// 			<div>
	// 				{renderLitTexts}
	// 			</div>
	// 		: <h1>Loading...</h1> }
	// 	</Fragment>
	// )
}