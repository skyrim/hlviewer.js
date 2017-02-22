let now
if (typeof performance !== 'undefined') {
	if (performance.now) {
		now = () => performance.now()
	} else if (performance.mozNow) {
		now = () => performance.mozNow()
	} else if (performance.msNow) {
		now = () => performance.msNow()
	} else if (performance.oNow) {
		now = () => performance.oNow()
	} else if (performance.webkitNow) {
		now = () => performance.webkitNow()
	} else if (Date.now) {
		now = () => Date.now()
	}
} else {
	now = () => new Date().getTime()
}

const formatTime = (seconds) => {
	let m = Math.floor(seconds / 60)
	if (m < 10) {
		m = '0' + m
	}

	let s = Math.floor(seconds - m * 60)
	if (s < 10) {
		s = '0' + s
	}

	return m + ':' + s
}

export { now, formatTime }