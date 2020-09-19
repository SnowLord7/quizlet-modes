~function() {
	window.Test = function() {
		this.truefalse = new TrueFalse();
		this.choice = new Choice();
		this.write = new Written();
		this.match = new Matching();

		drewsnow.addKeyBind(bool => {
			let elements = document.getElementsByClassName('answer');
			
			for (let i = 0; i < elements.length; ++i)
				elements[i].style.opacity = +bool;
		}, settings.current.test.key || 67, 'c');
	}

	// True false mode
	function TrueFalse() {
		this.solve();
	}

	TrueFalse.prototype.solve = function () {
		let elements = this.elements();

		for (let i = 0; i < elements.length; ++i) {
			let question = this.question(elements[i]).innerText,
				response = this.answer(elements[i]).innerText,
				src = this.image(elements[i]).src,
				options = this.options(elements[i]),
				answer = Answers.exact(question, src).random();

			if (answer == response) options[0].click();
			else options[1].click();
		}
	}

	TrueFalse.prototype.elements = () => {
		return document.getElementsByClassName('TestModeTrueFalseQuestion');
	}

	TrueFalse.prototype.question = element => {
		let parent = element.getElementsByClassName('TermText')[0];

		if (!parent) return document.createElement('span');
		return parent;
	}

	TrueFalse.prototype.image = element => {
		let parent = element.getElementsByClassName('TestModeTermText-image')[0];

		if (!parent) return document.createElement('img');
		return parent;
	}

	TrueFalse.prototype.answer = element => {
		let parent = element.getElementsByClassName('TermText')[1];

		if (!parent) return document.createElement('span');
		return parent;
	}

	TrueFalse.prototype.options = element => {
		return element.getElementsByTagName('input');
	}

	// Choice Mode
	function Choice() {
		this.solve();
	}

	Choice.prototype.solve = function () {
		let elements = this.elements();

		for (let i = 0; i < elements.length; ++i) {
			let question = this.question(elements[i]).innerText,
				answers = this.answers(elements[i]),
				src = this.image(elements[i]).src,
				answer = Answers.exact(question, src).random();

			for (let j = 0; j < answers.length; j++) {
				if (this.text(answers[j]).innerText == answer) {
					answers[j].click();
					break;
				}
			}
		}
	}

	Choice.prototype.elements = () => {
		return document.getElementsByClassName('TestModeMultipleChoiceQuestion');
	}

	Choice.prototype.question = element => {
		let parent = element.getElementsByClassName('TestModeMultipleChoiceQuestion-prompt')[0];

		if (!parent) return document.createElement('span');
		return parent.getElementsByClassName('TermText')[0];
	}

	Choice.prototype.image = element => {
		let parent = element.getElementsByClassName('TestModeTermText-image')[0];

		if (!parent) return document.createElement('img');
		return parent;
	}

	Choice.prototype.answers = element => {
		return element.getElementsByClassName('TestModeMultipleChoiceQuestion-choice');
	}

	Choice.prototype.text = element => {
		let text = element.getElementsByClassName('TestModeTermText')[0];

		if (!text) return document.createElement('span');
		return text.getElementsByClassName('TermText')[0];
	}

	// Matching Mode
	function Matching() {
		this.matches = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		this.solve();
	}

	Matching.prototype.solve = function () {
		let questions = this.questions(),
			answers = this.answers();

		for (let i = 0; i < answers.length; ++i) {
			let text = this.text(answers[i]).innerText,
				src = this.image(answers[i]).src,
				answer = Answers.exact(text, src).random();

			for (let j = 0; j < questions.length; j++) {
				if (questions[j].innerText == answer) {
					let input = this.input(questions[j])
					input.placeholder = this.matches[i];
					break;
				}
			}
		}
	}

	Matching.prototype.questions = () => {
		return document.getElementsByClassName('TestModeMatchingQuestion-promptSideListItem');
	}

	Matching.prototype.input = element => {
		let input = element.getElementsByTagName('input')[0];

		if (!input) return document.createElement('input');
		return input;
	}

	Matching.prototype.text = element => {
		let text = element.getElementsByClassName('TermText')[0];

		if (!text) return document.createElement('span');
		return text;
	}

	Matching.prototype.answers = () => {
		return document.getElementsByClassName('TestModeMatchingQuestion-optionsSideListItem');
	}

	Matching.prototype.image = element => {
		let parent = element.getElementsByClassName('TestModeTermText-image')[0];

		if (!parent) return document.createElement('img');
		return parent;
	}

	// Written mode
	function Written() {
		this.solve();
	}

	Written.prototype.solve = function() {
		let elements = this.elements();

		for (let i = 0; i < elements.length; ++i) {
			let parent = elements[i],
				text = this.text(parent).innerText,
				image = this.image(parent).src,
				input = this.input(parent);

			let elem = parent.getElementsByClassName('answer')[0];

			if (!elem) {
				elem = document.createElement('input');
				elem.readonly = true;
				elem.onclick = function () {
					this.select();
					document.execCommand('copy');
				}
				elem.className = 'answer';
				elem.style = 'outline: none; display: block; border-radius: 5px; border: 1px solid #000; opacity: .8; text-align: center;';
				parent.appendChild(elem);
			}

			elem.value = Answers.exact(text, image).random();
		}
	}

	Written.prototype.elements = () => {
		return document.getElementsByClassName('TestModeWrittenQuestion');
	}

	Written.prototype.text = element => {
		let parent = element.getElementsByClassName('TestModeTermText')[0];

		if (!parent) return document.createElement('span');
		return parent.getElementsByClassName('TermText')[0];
	}

	Written.prototype.image = element => {
		let parent = element.getElementsByClassName('TestModeTermText-image')[0];

		if (!parent) return document.createElement('img');
		return parent;
	}

	Written.prototype.input = element => {
		let parent = element.getElementsByTagName('textarea')[0];
		
		if (!parent) return document.createElement('textarea');
		return parent;
	}
}();