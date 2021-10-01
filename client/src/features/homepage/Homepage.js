import { Link } from 'react-router-dom'
// import { useGetLitTextsQuery } from '../litTexts/litTextsApi'

export default function Homepage() {
  // const { data, error, isLoading } = useGetLitTextsQuery()
	// const litTexts = data

	return (
		<div className="centered-in-window" >
			<div className="centered-in-div" >
				<h1>Welcome to Marginalia</h1>
				<div className="centered-in-div" style={{ width: "75%" }} >
					<Link to='/texts'><div style={{ borderStyle: "solid", borderWidth: 1, padding: 5, position: "relative", textAlign: "center" }} ><h1>Browse Texts</h1></div></Link>
					<p />
					<Link to='/users'><div style={{ borderStyle: "solid", borderWidth: 1, padding: 5, position: "relative", textAlign: "center" }} ><h1>Browse Users</h1></div></Link>
					{/* <TestParseLitText /> */}
				</div>
			</div>
		</div>		
	)
}