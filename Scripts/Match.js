function Match() {
	this.colors = ['#87b5ff', '#7dffe5', '#7dff9e', '#daff7d', '#ffb44a', '#ff7236', '#ff3636', '#2672ff', '#756be8', '#a76be8', '#e86be4', '#ff2176', '#b89e9e', '#8a8124'];
	this.stopTime = settings.current.match.time || 0.5;

	Answers.post('match', this.stopTime);
	this.start();

	this.interval = setInterval(() => {
			if (this.time() >= this.stopTime) {
				clearInterval(this.interval);
				this.stop();
			}
	}, 50);

	setTimeout(() => {
		this.color();
	}, 1);
}

Match.prototype.stop = () => {
	let timeouts = setTimeout(';');
	for (let i = 0; i < timeouts; i++) clearTimeout(i);
}

Match.prototype.start = () => {
	let btns = document.getElementsByClassName('UIButton');

	if (btns[0]) btns[0].click();
}

Match.prototype.time = () => {
	let elem = document.getElementsByClassName('MatchModeControls-currentTime')[0];
	if (!elem) return -1;

	return Number(elem.innerText);
}

Match.prototype.color = function() {
	let tiles = this.tiles();

	for (let i = 0; i < tiles.length; ++i) {
		let text = this.text(tiles[i]).innerText,
			src = this.image(tiles[i]).src,
			color = this.colors[i];

		let options = document.querySelectorAll('.MatchModeQuestionScatterTile:not(.solved)');

		if (text == '...') text = '';
		let answer = Answers.exact(text, src).random(),
			match = undefined;

		for (let j = 0; j < options.length; ++j) {
			let text = this.text(options[j]).innerText;
			if (text == '...') text = '';
			if (text == answer) {
				match = options[j];
				break;
			}
		}

		if (!match) continue;

		tiles[i].style.backgroundColor = color;
		match.style.backgroundColor = color;

		tiles[i].classList.add('solved');
		match.classList.add('solved');
	}
}

Match.prototype.tiles = () => {
	return document.getElementsByClassName('MatchModeQuestionScatterTile');
}

Match.prototype.text = element => {
	let elem = element.getElementsByClassName('TermText')[0];

	if (!elem) return document.createElement('span');
	return elem;
}

Match.prototype.image = element => {
	let elem = element.getElementsByClassName('MatchModeQuestionScatterTile-image')[0];

	if (!elem) return document.createElement('img');
	return elem;
}