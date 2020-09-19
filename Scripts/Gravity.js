function Gravity() {
	this.speed = 100;
	this.score = settings.current.gravity.score || 4294967295;

	Answers.post('gravity', this.score);

	this.loop = setInterval(() => {
		this.wrong();
	}, this.speed);
}

Gravity.prototype.solve = function () {
	let input = document.getElementsByClassName('GravityTypingPrompt-input')[0],
		element = this.elements()[0];
		
	if (!element || !input) return;

	let text = this.text(element).innerText,
		src = this.image(element).src,
		answer = Answers.exact(text, src);

	if (answer) {
		input.value = answer;
		input.focus();
	}
}

Gravity.prototype.wrong = () => {
	let element = document.getElementsByClassName('GravityCopyTermView-answer')[0],
		input = document.getElementsByClassName('GravityCopyTermView-input')[0],
		answer = undefined;

	if (!element || !input) return;
	input.value = element.innerText;
	input.focus();
}

Gravity.prototype.elements = () => {
	return document.getElementsByClassName('GravityTerm');
}

Gravity.prototype.text = element => {
	let elem = element.getElementsByClassName('TermText')[0];

	if (!elem) return document.createElement('span');
	return elem;
}

Gravity.prototype.image = element => {
	let elem = element.getElementsByTagName('img')[0];

	if (!elem) return document.createElement('img');
	return elem;
}