import TimeAgo from "./TimeAgo";

export default function TimeAgoContainer({ created_at, updated_at, isDeleted }) {

	const secondTerm = isDeleted ? " (deleted " : " (updated "
	const closeParen = ")"

	return (
		<p style={{ fontSize: 10 }} >
			<em><TimeAgo time={created_at} /></em>
			{created_at === updated_at ? 
				null :
				<em>
					{secondTerm}
					<TimeAgo time={updated_at} />
					{closeParen}
				</em>
			}
		</p>
	)
}