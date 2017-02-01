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

export { now }