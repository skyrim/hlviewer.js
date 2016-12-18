export default function Time() {}

if (typeof window === 'undefined') {global['window'] = {}}
window.performance = window.performance || {}
Time.now = window.performance.now
	|| window.performance.mozNow
	|| window.performance.msNow
	|| window.performance.oNow
	|| window.performance.webkitNow
	|| Date.now
	|| function() {return new Date().getTime() }

module.exports = Time