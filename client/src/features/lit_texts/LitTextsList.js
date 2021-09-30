import LitTextListShow from "./LitTextListShow";

export default function LitTextsList ({ user, litTexts }) {

	const renderTexts = litTexts.map((text) => <LitTextListShow key={text.id} litText={text} user={user} />)

	return(
		<div>
			{renderTexts}
		</div>
	)
}