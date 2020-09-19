function Spell() {
	this.hijack();
	this.play();

    this.cooldown = 10;
    this.last_called = Date.now();

    try {
        document.getElementsByClassName('UIIcon--audio')[0].parentElement.click()
    } catch(e) {}
}

Spell.prototype.play = function () {
    let elem1 = document.getElementById('js-spellReplayAudio'),
        elem2 = document.getElementsByClassName('SpellQuestionView-replayAudio')[0];

	let event = new KeyboardEvent('keydown', {
		bubbles: true,
		cancelable: true,
		char: 'Escape',
		key: 'Escape',
		shiftKey: false,
		keyCode: 27,
		which: 27
	});
	(elem2 || elem1).dispatchEvent(event);
}

Spell.prototype.input = () => {
    let elem1 = document.getElementById('js-spellInput'),
        elem2 = document.getElementsByClassName('AutoExpandTextarea-textarea')[0],
        elem3 = document.querySelector('textarea');

	return elem2 || elem1 || elem3;
}

Spell.prototype.alert = function () {
	Alert(
		'SnowLord\'s Quizlet Extension',
		`<h2>Game Mode: Spell</h2>Thank you for using SnowLord7's Quizlet Exploit<br>Without you, this exploit wouldn't be possible.<br><h4>Instructions:</h4>Just wait for this script to finish!<br><br><button class="UIButton" type="button"><span class="UIButton-wrapper"><span>Inject</span></span></button>`
	);
}

Spell.prototype.hijack = function () {
	let self = this;

	Howl.prototype.oldPlay = Howl.prototype.play;
	Howl.prototype.play = function () { self.solve(this); }
}

Spell.prototype.enter = function () {
	let event = new KeyboardEvent('keydown', {
		bubbles: true,
		cancelable: true,
		char: 'Enter',
		key: 'Enter',
		shiftKey: false,
		keyCode: 13,
		which: 13
	});
	this.input().dispatchEvent(event);
}

Spell.prototype.solve = function (e) {
	e.oldPlay();

    let now = Date.now();
	if (now - this.last_called <= this.cooldown) return false;
    this.last_called = now;

	let terms = Answers.get(),
		answer = new URLSearchParams(e._src).get('b'),
		input = this.input();
	
	for (let i = 0; i < terms.length; ++i) {
		let src = new URLSearchParams(terms[i]._wordAudioUrl).get('b');
		if (src == answer) {
            let word = terms[i].word;

            let event = window.document.createEvent('Event');
            event.initEvent('input', true, true);

            let inp = input,
                data = Object.getOwnPropertyDescriptor(inp.constructor.prototype, 'value');
           
            (null == data ? void 0 : data.set) ? data.set.call(inp, word) : inp.value = word;            
            input.dispatchEvent(event);

			//setTimeout(() => { this.enter(); }, 100);
			break;
		}
	}
}