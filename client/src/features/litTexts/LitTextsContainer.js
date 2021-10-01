import { Fragment } from "react"
import LitTextsList from "./LitTextsList"
import { useSelector } from 'react-redux'

export default function LitTextsContainer ({ user }) {
  const litTexts = useSelector((state) => state.litTexts.entities)
	console.log(litTexts) 

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