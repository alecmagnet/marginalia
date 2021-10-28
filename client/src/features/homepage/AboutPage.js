import { useEffect, Fragment } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { HashLink } from 'react-router-hash-link'
import { Typography, Grid, Box, Stack, Button, Avatar } from '@mui/material'
import HpButtons from './HpButtons'

export default function AboutPage() {
	const userState = useSelector(state => state.user)
  const user = userState.entities.length > 0 && userState.errors.length === 0 ? userState.entities[0] : null
	const history = useHistory()

	useEffect(() => {
		if (history.location.hash.length > 0) history.push("/about")
	}, [history])

	const handleImgButtonClick = (e) => {
		// userState.entities.length === 0 && e !== "signup" ?
    // history.push('/login') :
		history.push(`/${e}`)
	}

	const imgBtnTitles = () => {
		const imgBtnConditional = () => {
			if (user) {
				return [
					{
						"name": "Library",
						"value": "texts"
					}, 
					{
						"name": "Members",
						"value": "users"
					},
				]
			} else {
				return [
					{
						"name": "Log in",
						"value": "login"
					}, 
					{
						"name": "Sign up",
						"value": "signup"
					},
				]
			}
		}
		return [
			...imgBtnConditional(),
			{
				"name": "Home",
				"value": ""
			}
		]
	}

	const images = [
		{
			url: 'https://az334034.vo.msecnd.net/images-5/vanitas-still-life-with-a-candlestick-musical-instruments-dutch-books-a-writing-set-an-astrological-and-a-terrestial-globe-and-an-hourglass-all-on-a-draped-table-evert-collier-1662-55185426.jpg',
			title: imgBtnTitles()[0].name,
			value: imgBtnTitles()[0].value,
			width: '33.33%',
		},
		{
			url: 'https://image.invaluable.com/housePhotos/sothebys/97/580697/H0046-L88399130.jpg',
			title: imgBtnTitles()[1].name,
			value: imgBtnTitles()[1].value,
			width: '33.34%',
		},
		{
			url: 'https://i.ibb.co/7yY7cb8/Angeluccio-View-of-Vicovaro.jpg',
			title: imgBtnTitles()[2].name,
			value: imgBtnTitles()[2].value,
			width: '33.33%',
		},
	]


	const buttonArr = ["What Is It?", "How Do I Use It?", "How Was It Made?", "Who Made It?"]
	
	const buttons = <Stack spacing={2} direction="row" sx={{ mb: 1 }}>
		{buttonArr.map(item => {
			const itemHash = `/about#${item.slice(0, -1).toLowerCase().replaceAll(" ", "-")}`
			return (
				<HashLink key={item} smooth to={itemHash}> 
					<Button variant="text" id={item}>{item}</Button>
				</HashLink>
			)
		})}
	</Stack>

	const userStoryItems = [
		["Securely sign up, log in, log out, and remain authorized on refresh"],
		["Upload poems, stories, and other literary texts"],
		["Edit texts they uploaded", [<span key={1}>Or, if the user is a &ldquo;librarian&rdquo; user-type, edit any uploaded text</span>]],
		["Browse, search, filter, and read those texts"],
		["Post comments on texts and replies to other comments"],
		["Edit and delete their own comments", [<span key={2}>If a comment has replies or is a reply, deleting it will leave a ghost that says “comment was deleted” rather than simply vanishing</span>]],
		[<span key={3}>Assign their comments multiple comment types, such “question” or “critique”</span>, ["Add and remove comment types from their comments"]],
		["Browse, search, and filter all comments on a particular text"],
		["Browse, search, and filter other users’ profiles"],
		["Edit their own profile"],
		["Delete their account"]
	]

	const storyList = arr => arr.map(item => {
		const itemLi = itemElement => <li key={itemElement}><Typography key={`${itemElement}1`} variant="body1" component="span">{itemElement}</Typography></li>
		if (item.length === 1) {
			return itemLi(item[0]) 
		} else {
			return (
			<Fragment key={item}>
				{itemLi(item[0])}
				<ul>{item[1].map(item => itemLi(item))}</ul>
			</Fragment>
			)
		}
	})


	const dependencyLinks = [
		["MUI", "https://mui.com/"],
		["Quill", "https://quilljs.com/"],
		["React-Quill", "https://github.com/zenoamaro/react-quill"],
		["html-react-parser", "https://github.com/remarkablemark/html-react-parser#readme"],
		["Rails Html Sanitizers", "https://github.com/rails/rails-html-sanitizer"],
		["bcrypt", "https://github.com/bcrypt-ruby/bcrypt-ruby"],
	]

	const myProfiles = [
		["LinkedIn", "https://www.linkedin.com/in/alec-magnet/"],
		["GitHub", "https://github.com/alecmagnet"],
		["Medium", "https://medium.com/@alecmagnet"],
	]

	const linkList = (arr) => arr.map(item => {
		return(
			<span key={item[0]}>{item === arr[arr.length - 1] ? "and " : null}
				<a
				href={item[1]}
				rel="noreferrer" target="_blank" 
				style={{ color: "#455a64"}}
			>{item[0]}</a>{item === arr[arr.length - 1] ? null : ", "}</span> 		
		)
	})


	const whatIsMargArr = [
		"Marginalia is a social reading and annotation site where people can have conversations with one another about literary works they share and read.",
		<span key={4}>The word <em>marginalia</em> refers to the notes and markings that readers make in the margins of page. These notes leave traces of a reader&rsquo;s progress through a text. They also provide a way for readers to communicate with one another, sometimes from across centuries. The first poem in our database – appropriately, &ldquo;<Link to="/texts/1" style={{ color: "#455a64" }}>Marginalia</Link>&rdquo; by Billy Collins – conveys how moving these moments of unexpected contact with another reader can be.</span>,
		"This app, Marginalia, seeks to restore the social dimension of reading by providing a venue for readers to speak with one another through the comments they leave on literary texts."
	]

	const whatCanUserArr = [
		<span key={1}>
			A user of Marginalia can:
		</span>
	]

	const howWasItMadeArr = [
		<span key={5}>
			Marginalia was my final project for software engineering bootcamp at <a 
				href="https://flatironschool.com/campus-and-online-coding-bootcamp/" 
				rel="noreferrer" target="_blank" 
				style={{ color: "#455a64"}}
			>Flatiron</a>. Please check out the repo on <a
				href="https://github.com/alecmagnet/marginalia"
				rel="noreferrer" target="_blank" 
				style={{ color: "#455a64"}}
			>GitHub</a>.
		</span>,
		<span key={6}>
			I coded Marginalia using JS, React, Redux, Ruby, and Rails, along with several other dependencies, including {linkList(dependencyLinks)}.
		</span>,
		<span key={7}>
			Through trial and a <em>lot</em> of error, I learned a crucial lesson about coding, which I plan to apply from here on out: <b>
				Plan for modularity by making your code as straightforward and standardized as possible!
			</b>
		</span>,
		"Since you can't anticipate all the ways you might reuse a component, your needs to be flexible.",
		"The main thing that tripped me up here was style. I taught myself to use MUI as I went, so the components I wrote early on use a lot of unnessary styling that only really works in the instance where I first call them. As I update this project, I hope I to simplify my style and make those components more reusable.",
		"Another thing you'll notice as you look through my repo is that I learned how to make my code drier along the way. That, too, requires simple, standardized code. It's harder to map through an array of menu items if you need to put different sx props on the first and last ones. I got much better at this as I went. Next time, I won't give myself so many tangles to smooth out and refactor."
	]

	const whoMadeItArr = [
		"I did. Hello! My name is Alec Magnet. I graduate from coding bootcamp in October 2021 after thirteen years teaching literature and writing at the City College of New York, Marymount Manhattan College, and elsewhere. Now I'm looking for a full-stack software engineering position position where I can put the talents and enthusiasm I developed as an educator to use building tools that can use to learn, grow, and flourish.",
		<span key={8}>Check me out on {linkList(myProfiles)}.</span>
	]

	const contentGrafs = (arr) => arr.map((item, key) => 
		<Typography key={key} variant="body1" sx={{ pt: 2 }} >
			{item} 
		</Typography>		
	)


	return(
    <Grid 
			id = "top"
			container 
			justifyContent="Center"	
			alignItems="center"
		>

			<Grid item xs={10} sx={{ mt: 3 }}>
				<HpButtons images={images} handleImgButtonClick={handleImgButtonClick} />
			</Grid>

			<Grid item xs={12}>
				<Typography 
					id="top" 
					variant="h2" 
					textAlign="center" 
					sx={{ pt:2, pb:2, fontWeight: 410 }}
				>
					About Marginalia
				</Typography>
			</Grid>

			<Grid item xs display="flex" justifyContent="center">
				{buttons}
			</Grid>

			<Box justifyContent="center" sx={{ width: "90%", mx: "5%", }}>
				<Box sx={{ px: 6, pt: 1, pb: 3, mt: 0, }}>
					<Typography id="what-is-it" variant="h4" justify="center" sx={{  }}>
						What is Marginalia?
					</Typography>
					{contentGrafs(whatIsMargArr)}
					<Typography id="how-do-i-use-it" variant="h4" justify="center" sx={{ mt: 3 }}>
						How Do I Use It?
					</Typography>
					{contentGrafs(whatCanUserArr)}
					<Box sx={{ mt: 2 }}>
						<ul>
							{storyList(userStoryItems)}
						</ul>
					</Box>
					<Typography id="how-was-it-made" variant="h4" justify="center" sx={{ pt: 1 }}>
						How Was It Made?
					</Typography>
					{contentGrafs(howWasItMadeArr)}
					<Typography id="who-made-it" variant="h4" justify="center" sx={{ pt: 3 }}>
						Who Made It?
					</Typography>
					<Avatar
						variant="square"
						alt="Alec Magnet" 
						src="https://avatars.githubusercontent.com/u/85529561?v=4" 
						sx={{ float: "left", cursor: "pointer", width: 135, height: 135, mt: 3, mr: 2, ml: 0 }} 
						onClick={() => history.push("/users/1")} 
					/>
					{contentGrafs(whoMadeItArr)}				
				</Box>
			</Box>
			<HashLink smooth to="#top"> 
				<Button variant="text">Top</Button>
			</HashLink>
		</Grid>		
	)
}