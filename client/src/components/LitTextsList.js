import LitTextListShow from "./LitTextListShow";

export default function LitTextsList ({ user, litTexts }) {

	const renderTexts = litTexts.map((text) => <LitTextListShow litText={text} user={user} />)

	return(
		<div>
			{renderTexts}
		</div>
	)
}