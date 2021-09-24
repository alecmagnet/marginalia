import { Fragment } from "react"
import LitTextsList from "./LitTextsList"

export default function LitTextsContainer ({ user, litTexts }) {

	return (
		<Fragment>
			{litTexts.length > 0 ? 
				<LitTextsList
					user={user}
					litTexts={litTexts}	/> 
			: <h1>Loading...</h1> }
		</Fragment>
	)
}