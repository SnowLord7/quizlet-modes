window.settings = {
	'default': {
		'developer': 'Drew Snow',
		'gravity': { 'score': 4294967295 },
		'learn': { 'speed': 100 },
		'live': { 'answerDelay': 100, 'autoAnswer': true, 'displayAnswer': true, 'key': 67 },
		'match': { 'time': 0.5 },
		'night': false,
		'test': { 'key': 67 }
	},
    'current': {
		'developer': 'Drew Snow',
		'gravity': { 'score': 4294967295 },
		'learn': { 'speed': 100 },
		'live': { 'answerDelay': 100, 'autoAnswer': true, 'displayAnswer': true, 'key': 67 },
		'match': { 'time': 0.5 },
		'night': false,
		'test': { 'key': 67 }
	},
	'fix': function () {
		this.current = this.get();
		if (typeof this.current.developer != 'string') this.current.developer = this.default.developer;
		if (typeof this.current.gravity.score != 'number') this.current.gravity.score = this.default.gravity.score;
		if (typeof this.current.learn.speed != 'number') this.current.learn.speed = this.default.learn.speed;
		if (typeof this.current.live.answerDelay != 'number') this.current.live.answerDelay = this.default.live.answerDelay;
		if (typeof this.current.live.autoAnswer != 'boolean') this.current.live.autoAnswer = this.default.live.autoAnswer;
		if (typeof this.current.live.displayAnswer != 'boolean') this.current.live.displayAnswer = this.default.live.displayAnswer;
		if (typeof this.current.live.key != 'number') this.current.live.key = this.default.live.key;
		if (typeof this.current.match.time != 'number') this.current.match.time = this.default.match.time;
		if (typeof this.current.night != 'boolean') this.current.night = this.default.night;
		if (typeof this.current.test.key != 'number') this.current.test.key = this.default.test.key;
		this.save();
	},
	'reset': function () {
		localStorage.setItem('extensionSettings', JSON.stringify(this.default));
	},
	'save': function () {
		localStorage.setItem('extensionSettings', JSON.stringify(this.current));
	},
	'get': function () {
		if (localStorage) {
            if (!localStorage.getItem('extensionSettings')) this.reset();
            return JSON.parse(localStorage.getItem('extensionSettings'));
        }
        return this.default;
	}
};
settings.fix();

~function () {
	let style = drewsnow.css(`
        #extensionSettingsContainer {
			transition: transform 1s ease;
			transform: translateY(355px);

			box-shadow: 0 5px 35px rgba(0, 0, 0, .65);
			font-family: Roboto, Verdana, Arial;
            border-top: 25px solid #d86d02;
            height: 380px; width: 300px;
			border-radius: 0 5px 0 0;
            background-color: #000;
			box-sizing: border-box;
			z-index: 2147483638;
			bottom: 0; left: 0;
            position: fixed;
            display: block;
            line-height: 1;
            padding: 10px;
            color: #fff;
        }

		#extensionSettingsContainer:hover {
			transform: translateY(0);
		}

        #extensionSettingsContainer h2 {
            margin-top: 10px;
        }

        #extensionSettingsContainer input {
            background-color: rgba(255, 255, 255, .8);
            margin-right: 10px;
            border-radius: 2px;
            max-width: 150px;
            outline: none;
            float: right;
            color: #000;
        }

        #extensionSettingsContainer #saveSettings {
            width: 100%; height: 30px;
            border-radius: 5px;
            outline: none;
        }

        #extensionSettingsContainer .adaptKeyInput {
            width: 70px;
        }

        #extensionSettingsContainer .numberOnlyInput {
            width: 80px;
        }

        #extensionSettingsContainer .extensionMenuItem {
            margin-right: 5px;
            cursor: pointer;
            float: right;
        }

        #extensionSettingsContainer .extensionMenuItem:hover {
            color: #8c8c8c;
        }
    `);

	let container = drewsnow.html(`
		<div id="extensionSettingsContainer">
			<span class="extensionMenuItem" id="extensionExitButton">&times;</span>
			<span class="extensionMenuItem" id="extensionResetButton">&#8634;</span>
			<h2 id="extensionSettingsTitle">Settings</h2>
			<div>Gravity Score<input id="gravityScoreInput" class="numberOnlyInput"></input></div><br>
			<div>Learn Speed<input id="learnSpeedInput" class="numberOnlyInput"></input></div><br>
			<div>Live Answer Delay<input id="liveDelayInput" class="numberOnlyInput"></input></div><br>
			<div>Live Auto-Answer<input id="liveAutoAnswerInput" type="checkbox"></input></div><br>
			<div>Live Show Answer<input id="liveShowAnswerInput" type="checkbox"></input></div><br>
			<div>Live Toggle Key<input name="live" class="adaptKeyInput" id="liveKeyInput"></input></div><br>
			<div>Match Time<input id="matchTimeInput" class="numberOnlyInput"></input></div><br>
			<div>Test Key<input name="test" class="adaptKeyInput" id="testKeyInput"></input></div><br>
			<button id='saveSettings'>Save</button>
		</div>
    `);

	let inputs = document.getElementsByClassName('adaptKeyInput');

	for (let i = 0; i < inputs.length; i++) {
		let input = inputs[i];
		input.onkeypress = changeSettingOnKey;
		input.onkeydown = changeSettingOnKey;
		input.onkeyup = changeSettingOnKey;
	}

	inputs = document.getElementsByClassName('numberOnlyInput');
	for (let i = 0; i < inputs.length; i++) {
		let input = inputs[i];
		input.onkeydown = e => {
			if (!/^([0-9.,]|Backspace)$/i.test(e.key)) e.preventDefault();
		}
	}

    document.getElementById('extensionSettingsTitle').addEventListener('dblclick', () => {
        try {
            let session = new Debug();
            prompt('Copy this and send it to Drew Snow', session.run());
        } catch (e) { prompt('Copy this and send it to Drew Snow', e); }
    });

	document.getElementById('extensionResetButton').onclick = () => {
		localStorage.setItem('extensionSettings', JSON.stringify({
			'developer': 'Drew Snow',
			'gravity': { 'score': 4294967295 },
			'learn': { 'speed': 100 },
			'live': { 'answerDelay': 100, 'autoAnswer': true, 'displayAnswer': true, 'key': 67 },
			'match': { 'time': 0.5 },
			'night': false,
			'test': { 'key': 67 }
		}));
		window.location.reload();
	};

	document.getElementById('extensionExitButton').onclick = function () {
		this.parentElement.remove();
	}

	document.getElementById('saveSettings').onclick = () => {
		localStorage.setItem('extensionSettings', JSON.stringify({
			"developer": "Drew Snow",
			"gravity": {
				"score": Number(document.getElementById('gravityScoreInput').value)
			},
			"learn": {
				"speed": Number(document.getElementById('learnSpeedInput').value)
			},
			"live": {
				"answerDelay": Number(document.getElementById('liveDelayInput').value),
				"autoAnswer": !!document.getElementById('liveAutoAnswerInput').checked,
				"displayAnswer": !!document.getElementById('liveShowAnswerInput').checked,
				"key": Number(document.getElementById('liveKeyInput').value)
			},
			"match": {
				"time": Number(document.getElementById('matchTimeInput').value)
			},
			"night": false,
			"test": {
				"key": Number(document.getElementById('testKeyInput').value)
			}
		}));
	};

	let settings = JSON.parse(localStorage.getItem('extensionSettings')) || { "developer": "Drew Snow", "gravity": { "score": 4294967295 }, "learn": { "speed": 700 }, "live": { "answerDelay": 100, "autoAnswer": 1, "displayAnswer": 1, "key": "c" }, "match": { "time": 0.5 }, "night": false, "test": { "key": "c" } };
	document.getElementById('gravityScoreInput').value = settings.gravity.score;
	document.getElementById('learnSpeedInput').value = settings.learn.speed;
	document.getElementById('liveDelayInput').value = settings.live.answerDelay;
	document.getElementById('liveAutoAnswerInput').checked = +settings.live.autoAnswer;
	document.getElementById('liveShowAnswerInput').checked = +settings.live.displayAnswer;
	document.getElementById('liveKeyInput').value = settings.live.key;
	document.getElementById('matchTimeInput').value = settings.match.time;
	document.getElementById('testKeyInput').value = settings.test.key;

	function changeSettingOnKey(e) {
		e.preventDefault();
		this.value = e.keyCode || e.which;
	}
}();
