function Exploit() {
	this.version = '0.0.1';
	this.attempts = 0;
	this.mode = undefined;
	//this.detect();
}

Exploit.prototype.modules = function () {
	let missing = [];
	if (window.Answers == undefined) missing.push('Answers.js');
	if (window.Flashcards == undefined) missing.push('Flashcards.js');
	if (window.Alert == undefined) missing.push('Functions.js');
	if (window.obfuscate == undefined) missing.push('Functions.js');
	if (window.Gravity == undefined) missing.push('Gravity.js');
	if (window.Learn == undefined) missing.push('Learn.js');
	if (window.Live == undefined) missing.push('Live.js');
	if (window.Match == undefined) missing.push('Match.js');
	if (window.Micromatch == undefined) missing.push('Micromatch.js');
	if (window.drewsnow == undefined) missing.push('Module.js');
	if (window.settings == undefined) missing.push('Settings.js');
	if (window.Spell == undefined) missing.push('Spell.js');
	if (window.Test == undefined) missing.push('Test.js');
	if (window.Write == undefined) missing.push('Write.js');
	return missing;
}

Exploit.prototype.detect = function () {
	try {
		const email = window.Quizlet.coreData.user.email;
		if (email.indexOf('sandi.net') != -1) alert('Mrs. Mcglin is watching you');
	} catch (e) { console.log('Error getting email, but email isn\'t important so ignore this.'); }
}

Exploit.prototype.exceeded = function () {
	console.error('ERROR: Unable to find / load required modules after (10) attempts.');
	return false;
}

Exploit.prototype.init = function () {
	let href = window.location.href,
		option = undefined,
		missing = this.modules();


	if (window.location.host !== 'quizlet.com') window.location.href = 'https://quizlet.com/latest';

	if (this.attempts > 9) return this.exceeded();

	if (missing.length > 0) {
		console.warn('Missing modules', missing.join(', '));
		this.attempts++;
		
		return setTimeout(() => { this.init(); }, 100);
	}
	console.log('All modules have been loaded!');

    try {
        Quizlet.NotificationContainer.addNotification({
            title: 'Quizlet Extension v0.12',
            message: atob('VGhhbmsgeW91IGZvciB1c2luZyBEcmV3IFNub3cncyBRdWl6bGV0IEV4dGVuc2lvbi4='),
        });
    } catch(e) {}

	if (settings['\x63\x75\x72\x72\x65\x6E\x74']['\x64\x65\x76\x65\x6C\x6F\x70\x65\x72'] != '\x44\x72\x65\x77\x20\x53\x6E\x6F\x77') return;
	if (href.includes('/learn')) option = 'Learn';
	else if (href.includes('/flashcards')) option = 'Flashcards';
	else if (href.includes('/write')) option = 'Write';
	else if (href.includes('/spell')) option = 'Spell';
	else if (href.includes('/test')) option = 'Test';
	else if (href.includes('/micromatch')) option = 'Micromatch';
	else if (href.includes('/match')) option = 'Match';
	else if (href.includes('/gravity')) option = 'Gravity';
	else if (href.includes('/live')) option = 'Live';
	else {
		alert('Error: Please go to a supported gamemode.');
		return -1;
	}

	try {
		if (Answers.duplicates()) Alert('Duplicate terms found!', 'Duplicate terms have been found in the current set, which may cause errors.');
		this.mode = new window[option]();
	} catch (e) { alert('Error: ' + e); }

	(() => { document.title = 'Quizlet v' + this.version + ' | ' + (Quizlet.user.username || 'unknown') + ' | ' + (settings.current.developer || 'unknown'); let e = document.createElement('script'); e.src = 'https://www.googletagmanager.com/gtag/js?id=UA-119530221-2', e.onload = function () { function e() { dataLayer.push(arguments) } window.dataLayer = window.dataLayer || [], e('js', new Date), e('config', 'UA-119530221-2'), this.remove() }, document.head.appendChild(e) })();
}

var Session = new Exploit();
Session.init();