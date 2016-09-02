module.exports = (function() {
	if (!window.performance) {
		window.performance = {};
	}
	var perf = window.performance;
	
	return {
		now: perf.now || perf.mozNow || perf.msNow || perf.oNow || perf.webkitNow || Date.now || function() { return new Date().getTime(); }
	};
}());