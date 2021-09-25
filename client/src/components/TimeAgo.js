

export default function TimeAgo({ time }) {

	const timeNow = new Date().getTime()
	const timeThen = new Date(time).getTime()
	console.log("TimeAgo:timeThen", timeThen, "timeNow", timeNow)
	const timeDiff = parseInt((timeNow - timeThen)) / 1000
	console.log("timeDiff", timeDiff)
	const timeDisplayMins = parseInt(timeDiff/60)
	const timeDisplayHours = parseInt(timeDiff/3600)
	const timeDisplayDays = parseInt(timeDiff/(86400))
	const timeDisplayWeeks = parseInt(timeDiff/(604800))
	const timeDisplayMonths = parseInt(timeDiff/(86400 * 30))
	const timeDisplayYears = parseInt(timeDiff/(86400 * 365))

	const timeToDisplay = () => {
		if (timeDiff < 300) {
			return('just now')
		} else if (timeDiff < 3600) {
			return(`${timeDisplayMins} minutes ago`)		
		} else if (timeDiff < 7200) {
			return("1 hour ago")
		} else if (timeDiff < 86400) {
			return(`${timeDisplayHours} hours ago`)
		} else if (timeDiff < 172800) {
			return("1 day ago")
		} else if (timeDiff < 604800) {
			return(`${timeDisplayDays} days ago`)
		} else if (timeDiff < 1209600) {
			return("1 week ago")
		} else if (timeDiff < 2592000) {
			return(`${timeDisplayWeeks} weeks ago`)
		} else if (timeDiff < 5184000) {
			return("1 month ago")
		} else if (timeDiff < 31104000) {
			return(`${timeDisplayMonths} months ago`)
		} else if (timeDiff < 62208000) {
			return("1 year ago")
		} else {
			return(`${timeDisplayYears} years ago`)
		}
	}

	return (
		<span>{timeToDisplay()}</span>
	)
}