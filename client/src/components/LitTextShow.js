// import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import parse from 'html-react-parser'

function LitTextShow({ litText }) {

	// console.log(litText)
	// let QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter
	// let cfg = {}
	// let rawContent = [{"insert":"Sometimes the notes are ferocious,\nskirmishes against the author\nraging along the borders of every page\nin tiny black script.\nIf I could just get my hands on you,\nKierkegaard, or Conor Cruise O’Brien,\nthey seem to say,\nI would bolt the door and beat some logic into your head.\n\nOther comments are more offhand, dismissive –\n“Nonsense.” “Please!” “HA!!” –\nthat kind of thing.\nI remember once looking up from my reading,\nmy thumb as a bookmark,\ntrying to imagine what the person must look like\nwho wrote “Don’t be a ninny”\nalongside a paragraph in "},{"attributes":{"italic":true},"insert":"The Life of Emily Dickinson."},{"insert":"\n\nStudents are more modest\nneeding to leave only their splayed footprints\nalong the shore of the page.\nOne scrawls “Metaphor” next to a stanza of Eliot’s.\nAnother notes the presence of “Irony”\nfifty times outside the paragraphs of "},{"attributes":{"italic":true},"insert":"A Modest Proposal."},{"insert":"\n\nOr they are fans who cheer from the empty bleachers,\nhands cupped around their mouths.\n“Absolutely,” they shout\nto Duns Scotus and James Baldwin.\n“Yes.” “Bull’s-eye.” “My man!”\nCheck marks, asterisks, and exclamation points\nrain down along the sidelines.\n\nAnd if you have managed to graduate from college\nwithout ever having written “Man vs. Nature”\nin a margin, perhaps now\nis the time to take one step forward.\n\nWe have all seized the white perimeter as our own\nand reached for a pen if only to show\nwe did not just laze in an armchair turning pages;\nwe pressed a thought into the wayside,\nplanted an impression along the verge.\n\nEven Irish monks in their cold scriptoria\njotted along the borders of the Gospels\nbrief asides about the pains of copying,\na bird singing near their window,\nor the sunlight that illuminated their page–\nanonymous men catching a ride into the future\non a vessel more lasting than themselves.\n\nAnd you have not read Joshua Reynolds,\nthey say, until you have read him\nenwreathed with Blake’s furious scribbling.\n\nYet the one I think of most often,\nthe one that dangles from me like a locket,\nwas written in the copy of"},{"attributes":{"italic":true},"insert":" Catcher in the Rye"},{"insert":"\nI borrowed from the local library\none slow, hot summer.\nI was just beginning high school then,\nreading books on a davenport in my parents’ living room,\nand I cannot tell you\nhow vastly my loneliness was deepened,\nhow poignant and amplified the world before me seemed,\nwhen I found on one page\n\na few greasy looking smears\nand next to them, written in soft pencil–\nby a beautiful girl, I could tell,\nwhom I would never meet–\n“Pardon the egg salad stains, but I’m in love.”\n"}]
	// let converter = new QuillDeltaToHtmlConverter(rawContent, cfg)
	// // console.log("converter", converter)
	// let contentHTML = converter.convert()
	// // console.log("contentHTML", contentHTML)
	let parsedContent = parse(`${litText.content}`)

	return (
		<div>
			<h3>{litText.title}</h3>
			<h4>{litText.author}</h4>
			<div>{parsedContent}</div>
			{/* <p>{rawContent}</p> */}
		</div>

	)
}

export default LitTextShow