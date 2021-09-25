import TimeAgo from "./TimeAgo";

export default function TimeAgoContainer({ created_at, updated_at }) {

	return (
		<p style={{ fontSize: 10 }} >
			<em><TimeAgo time={created_at} /></em>
			{created_at === updated_at ? 
				null : 
				<em>, updated
					<TimeAgo time={updated_at} />
				</em>}
		</p>

	)
}