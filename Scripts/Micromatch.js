function Micromatch() {
	this.redirect();
}

Micromatch.prototype.redirect = () => {
	window.location.href = window.location.href.replace('micromatch', 'match');
}