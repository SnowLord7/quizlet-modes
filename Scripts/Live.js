function Live() {
    this.paused = false;

    this.container = drewsnow.html(`
		<div style="line-height: 1.2; top: 0; left: 0; font-family: 'Courier New', Courier, monospace; z-index: 2147483647; background-color: #202020; position: fixed; width: 350px; height: 475px; margin: 0; padding: 0; box-shadow: 0 5px 35px rgba(0, 0, 0, .75)">
			<nav style="cursor: move; user-select: none; text-align: right; color: #fff; position: absolute; width: 348px; height: 25px; margin: 1px;">
				<span onclick="alert('Intructions:\\n1.) Enter the Quizlet Live code into the input with a placeholder of 123456.\\n\\n2.) Click the large orange button that says Obtain Live Data.\\n\\n3.) Copy the text that is in the site that pops up (Ctrl + a, then Ctrl + c) and paste it (Ctrl + v) all in the textarea that says Paste The Site Data Here.\\n\\n4.) If the data if correct, the answer will be shown in the top right corner of your screen, and if you have the answer, it will be clicked for you.\\n\\nNotes:\\nPressing C will hide the answer.\\n\\nYou can toggle the script from automatically clicking the answer by clicking the text in the top right of your screen.\\n\\nPressing Ctrl + a will select all the text on a page.\\n\\nPressing Ctrl + v will paste the copied text for you.\\n\\nThis script was made by Drew Snow.');" style="font-size: 15px; cursor: pointer; width: 100%; height: 100%;">?</span>
				<span onclick="this.parentElement.parentElement.remove();" aria-label="Close Interface Model" style="cursor: pointer; width: 100%; height: 100%; padding-right: 5px; font-size: 20px;">&times;</span>
			</nav>
			
			<div style="margin: 0; border-radius: 3px; background-color: #141414; position: absolute; bottom: 276px; width: 346px; height: 170px; margin: 2px;">
				<button id="getLiveDataButton">Obtain Live Data</button>
				<div id="liveCodeInput" style="height: 20px; width: 132px; position: relative; left: 0; margin-left: 50%; transform: translateX(-50%);"><input><input><input><input><input><input></div>
				<textarea spellcheck="false" id="quizletLiveDataInput" class="customScrollBar" placeholder="Paste The Site Data Here"></textarea>
			</div>

			<div style="margin: 0; position: absolute; bottom: 0px; width: 346px; height: 275px; margin: 2px;">
				<div style="margin: 0;" id="customCommandOutput" class="customScrollBar">
					<div style="color: #339b00;">Loaded initial HTML.</div>
				</div>
			</div>
		</div>
	`);

    this.css = drewsnow.css(`
        @keyframes shake-animation {
            0% { transform: translate(-51%, -1px) rotate(1deg); }
            20% { transform: translate(-50%, 1px) rotate(0deg); }
            40% { transform: translate(-49%, 2px) rotate(-1deg); }
            60% { transform: translate(-51%, 0px) rotate(1deg); }
            80% { transform: translate(-50%, -1px) rotate(-1deg); }
            100% { transform: translate(-49%, 1px) rotate(0deg); }
        }
        
        .shakingElement {
            animation: shake-animation .4s; 
            animation-iteration-count: infinite; 
        }

        #getLiveDataButton {
            width: 346px;
        }

        #quizletLiveDataInput {
            background-color: rgba(0, 0, 0, .2);
            width: 340px; height: 103px;
            overflow-x: hidden;
            color: #d6d6d6;
            outline: none;
            resize: none;
        }

        #customCommandOutput {
            font-family: 'Courier New', Courier, monospace;
            background-color: rgba(0, 0, 0, .1);
            transition: all .3s ease;
            border-radius: 3px;
            overflow-y: scroll;
            font-size: 15px;
			height: 266px;
            padding: 5px;
        }

        .customScrollBar::-webkit-scrollbar {
            width: 10px;
        }

        .customScrollBar::-webkit-scrollbar-track {
            background: #1c1c1c; 
        }

        .customScrollBar::-webkit-scrollbar-thumb {
            background: #3d3d3d; 
        }

        .customScrollBar::-webkit-scrollbar-thumb:hover {
            background: #686868; 
        }

        #getLiveDataButton {
            transition: opacity .3s, background .8s ease, color .5s ease, box-shadow .5s ease;
            background-color: #ef7f00;
            position: relative;
            font-size: 1.6em;
            cursor: pointer;
            padding: 0 2em;
            outline: none;
            height: 40px;
            border: none;
            opacity: .8;
            color: #fff;
        }

        #getLiveDataButton:hover {
            background-color: #d3d3d3;
            color: #000;
            opacity: 1;
        }

        #getLiveDataButton:before, #getLiveDataButton:after {
            transition: width .8s ease;
            width: 0; height: 2px;
            background: #ffb25b;
            position: absolute;
            top: 0; right: 0;
            content: '';
        }

        #getLiveDataButton:after {
            right: inherit; top: inherit;
            left: 0; bottom: 0;
        }

        #getLiveDataButton:active:before, #getLiveDataButton:active:after {
            transition: all .8s ease;
            width: 100%;
        }

        #getLiveDataButton:hover {
            box-shadow: 0px 5px 13px 0px rgba(166, 166, 166, .5);
        }
    `);

    this.cmd = document.getElementById('customCommandOutput');
    this.input = document.getElementById('quizletLiveDataInput');

    this.input.onchange = e => { this.update(e); };
    this.input.onkeyup = e => { this.update(e); };
    this.input.oninput = e => { this.update(e); };

    this.btnLive = document.getElementById('getLiveDataButton');
    this.btnLive.onclick = () => { this.getData(); };

    this.inpLive = document.getElementById('liveCodeInput');
    this.inputs = this.inpLive.querySelectorAll('input');

    this.options = document.createElement('div');
    this.options.style = 'transition: all 0.3s; position: absolute; padding-right: 5px; opacity: 1; margin: 0; right: 0; top: 0';
    this.options.id = 'liveSettingsContainer';
    this.options.innerHTML = '<span style="color: #fff" id="liveAnswerPhrase">Answer</span><span style="user-select: none; color: #000;"> — </span><span style="color: #ff0000; cursor: pointer; user-select: none;" id="btnToggleHack">Pause</span>';
    document.body.appendChild(this.options);

    this.setup();

    this.inpLive.addEventListener('paste', e => { this.paste(e); });

    this.data = {};
    this.loop = setInterval(() => { this.interval(); }, 250);

    drewsnow.addKeyBind(() => {
        let container = document.getElementById('liveSettingsContainer');
        if (container.style.opacity != 0) container.style.opacity = 0;
        else container.style.opacity = 1;
    }, settings.current.live.key || 67, 'c');

    drewsnow.addKeyBind(() => {
        try { document.getElementById('btnToggleHack').click(); } catch (e) { };
    }, 86, 'v');

    this.btnToggle = document.getElementById('btnToggleHack');

    this.btnToggle.onclick = () => {
        let btn = this.btnToggle;

        this.paused = !this.paused;
        if (this.paused) {
            btn.style.color = '#00ff00';
            btn.textContent = 'Resume';
        } else {
            btn.style.color = '#ff0000';
            btn.textContent = 'Pause';
        }
    };

    drewsnow.draggable(this.container, this.container.querySelector('nav'));

    this.log('Finished Executing JavaScript.', '#339b00');
    this.log('For help click the \'?\' in the top right corner.', '#1c73ff');
}

Live.prototype.click = element => {
    if (element.fireEvent) {
        element.fireEvent('onclick');
    } else {
        let event = document.createEvent('Events');
        event.initEvent('click', true, false);
        element.dispatchEvent(event);
    }
}

Live.prototype.log = function (msg, color = '#c6c6c6') {
    let element = document.createElement('div'),
        cmd = this.cmd;

    element.style.display = 'block';
    element.style.color = color;
    element.textContent = msg;

    cmd.appendChild(element);
    cmd.children[cmd.children.length - 1].scrollIntoView();

    if (cmd.children.length > 25) cmd.children[0].remove();
}

Live.prototype.update = function (e) {
    if (!e.target.value) e.target.style.border = '1px solid blue';
    else {
        try {
            let json = JSON.parse(e.target.value);
            if (json.terms.length < 1) throw 0;
            e.target.style.border = '1px solid green';
            this.data = json;
        } catch (error) { e.target.style.border = '1px solid red'; }
    }
}

Live.prototype.getData = function (code='') {
    let inputs = this.inpLive.querySelectorAll('input');

    for (let i = 0; i < inputs.length; i++) code += inputs[i].value;

    if (code.length == 6 && !isNaN(code)) {
        this.log('Sending GET requests to Quizlet...', '#3884ff');
        fetch(`https://quizlet.com/webapi/3.2/game-instances?filters={"gameCode":${code},"isInProgress":true,"isDeleted":false}&perPage=500`)
            .then((resp) => resp.json())
            .then((data) => {
                this.log('Recieved data from Quizlet.', '#3884ff');
                if (data.responses[0].models.gameInstance.length > 0) {
                    let id = data.responses[0].models.gameInstance[0].itemId;
                    fetch(`https://quizlet.com/${id}/flashcards`)
                        .then(e => e.text())
                        .then(html => {
                            let matches = html.match(/window\.Quizlet\["assistantModeData"\]\s*=\s*(.+?);\s*QLoad\(\"Quizlet\.assistantModeData\"\)/);
                            try {
                                this.input.value = matches[1];
                                this.data = JSON.parse(matches[1]);
                                this.log('Found answers!', '#339b00');
                            } catch (e) { this.log('Unable to find answers!', '#ff0015'); }
                        });
                    this.log('Grabbing answers...', '#fff');
                } else {
                    this.log('Unable to find live game with code ' + code, '#ff0015');
                }
            })
            .catch((e) => {
                this.log('Unable to send request.', '#ef9700');
            });
    } else {
        this.log('Please enter a correct live code!', '#ff0015');
        this.inpLive.classList.toggle('shakingElement');
        setTimeout(() => { this.inpLive.classList.toggle('shakingElement'); }, 400);
    }
}

Live.prototype.setup = function () {

    // Automatically get game code if game is running
    try {
        let data = JSON.parse(getCookie('live_previous_game_instance'));
        if (data.gameCode) this.getData(data.gameCode);
    } catch(e) {}

    // Custom inputs for game code
    for (let i = 0; i < this.inputs.length; i++) {
        let input = this.inputs[i];
        input.style = 'border: none; border-bottom: 1px solid #969696; background-color: rgba(0,0,0,0.1); text-align: center; outline: none; margin: 1px 1px; width: 20px; color: #fff;';

        input.name = i;
        input.maxLength = 1;
        input.placeholder = i + 1;

        input.onkeydown = e => {
            if (!(e.keyCode == 86 || e.which == 86) && !e.ctrlKey && e.shiftKey && e.altKey)
                e.preventDefault();

            let nextInput = this.inpLive.querySelectorAll('input[name="' + (Number(e.target.name) + 1) + '"')[0],
                prevInput = this.inpLive.querySelectorAll('input[name="' + (Number(e.target.name) - 1) + '"]')[0];

            if (e.keyCode == 8 || e.which == 8) {
                e.target.value = '';
                if (prevInput) {
                    prevInput.value = '';
                    setTimeout(() => { prevInput.focus(); }, 0);
                }
            } else if (e.key.match(/[0-9]/) != null) {
                e.target.value = e.key;
                if (nextInput) setTimeout(() => { nextInput.focus(); }, 0);
            }
        }
    }
}

// Handle the paste event
Live.prototype.paste = function (e) {
    let clipboardData = e.clipboardData || window.clipboardData,
        pastedData = clipboardData.getData('Text');

    let formattedText = pastedData.replace(/[^0-9]/g, '').slice(0, 6);
    for (let i = 0; i < this.inputs.length; i++)
        this.inputs[i].value = formattedText[i];
}

Live.prototype.interval = function () {
    if (this.data && Object.keys(this.data).length > 0 && window.location.href.indexOf('quizlet') > 0 && window.location.href.indexOf('live') > 0) {
        if (document.getElementById('liveAnswerPhrase') && document.getElementsByClassName('StudentPrompt-inner')[0] && document.getElementsByClassName('StudentTerm is-clickable can-beClicked').length) {
            let question = document.getElementsByClassName('StudentPrompt-inner')[0].innerText.toLowerCase().trim(),
                options = document.getElementsByClassName('StudentTerm is-clickable can-beClicked');

            this.data.terms.filter(data => {
                if (data.word.toLowerCase() == question) return true;
                else if (data.definition.toLowerCase() == question) return true;
            }).forEach(data => {
                if (data.word.toLowerCase() == question) document.getElementById('liveAnswerPhrase').textContent = word.definition;
                else document.getElementById('liveAnswerPhrase').textContent = data.word;

                if (!this.paused) {
                    for (let i = 0; i < options.length; i++) {
                        let option = options[i].innerText.toLowerCase().trim();
                        if (data.definition.toLowerCase() == option) this.click(options[i]);
                        else if (data.word.toLowerCase() == option) this.click(options[i]);
                    }
                }                
            });
        }
    }
}