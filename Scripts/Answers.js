window.Answers = {
	'duplicates': function (terms = this.get()) {
		let words = terms.map(e => e.word),
			images = terms.map(e => e.photo || e._imageUrl),
			definitions = terms.map(e => e.definition);

		if (new Set(words).size != words.length) return true;
		if (new Set(definitions).size != definitions.length) return true;
		if (words.filter(e => definitions.indexOf(e) != -1).length) return true;

		return false;
	},

	'get': function () {
		if (Quizlet.assistantModeData !== undefined) {
			return Quizlet.assistantModeData.terms;
		} else if (Quizlet.learnGameData !== undefined) {
			return Quizlet.learnGameData.allTerms;
		} else if (Quizlet.testModeData !== undefined) {
			return Quizlet.testModeData.terms;
		} else if (Quizlet.spellModeData !== undefined) {
			return Quizlet.spellModeData.spellGameData.termsById;
		} else if (Quizlet.matchModeData !== undefined) {
			return Quizlet.matchModeData.terms;
		} else if (Quizlet.gravityModeData !== undefined) {
			return Quizlet.gravityModeData.terms;
		}
		return [];
	},

	'find': function (question = '', terms = this.get()) {
		let words = terms.filter(e => e.word == question),
			definitions = terms.filter(e => e.definition == question),
			images = terms.filter(e => e.photo == question || e._imageUrl == question);

		answers = [...words, ...definitions, ...images];
		return answers;
	},

	'exact': function (question, src = '', terms = this.get()) {
		let matches = [];

		// Test for normal matching text and image
		for (let i = 0; i < terms.length; ++i) {
			let word = terms[i].word,
				definition = terms[i].definition,
				image = terms[i].photo || terms[i]._imageUrl;

			if (question == word && src == image) matches.push(definition);
		}

		// Test for defintion with text and image
		if (matches.length == 0) {
			for (let i = 0; i < terms.length; ++i) {
				let word = terms[i].word,
					definition = terms[i].definition,
					image = terms[i].photo || terms[i]._imageUrl;

				if (question == definition && src == image) matches.push(word);
			}
		}

		// Test for only matching word
		if (matches.length == 0) {
			for (let i = 0; i < terms.length; ++i) {
				let word = terms[i].word,
					definition = terms[i].definition;

				if (question == word) matches.push(definition);
			}
		}

		// Test for only matching definition
		if (matches.length == 0) {
			for (let i = 0; i < terms.length; ++i) {
				let word = terms[i].word,
					definition = terms[i].definition;

				if (question == definition) matches.push(word);
			}
		}

		return matches;
	},

	'post': function (game = 'match', score = '1') {
		let data = {};

		score = String(score);

		if (game === 'gravity') {
			score = score || prompt('Highest possible score is 4294967295.\nScore: ', 4294967295) || 4294967295;

			data = {
				sessionId: undefined,
				score: score,
				previous_record: Quizlet.highscoresModalData.previousRecord || 420,
				time_started: Date.now() - 53582,
				selectedOnly: false
			}
		} else if (game === 'match') {
			score = score || prompt('Fastest possible time is 0.5\nScore: ', '0.5') || '0.5';

			if (score.indexOf('.') == -1) score += '0';
			score = score.replace(/[^0-9]/g, '');

			data = {
				score: Math.min(Math.max(5, score), 4294967295),
				previous_record: Quizlet.matchModeData.recordTime || 69,
				too_small: 0,
				time_started: Quizlet.SERVER_TIME,
				selectedOnly: false
			}
		}

		let message = { 'data': obfuscate(JSON.stringify(data), 77) };

		let send = new XMLHttpRequest;
		send.onreadystatechange = function () {
			if (send.readyState === 4) {
				try {
					let response = JSON.parse(send.responseText);
					if (send.status == 200) Alert('Success!', `Injected a ${game} score of ${JSON.parse(send.responseText).responses[0].models.session[0].score} into ${JSON.parse(send.responseText).responses[0].models.user[0].username}'s (${JSON.parse(send.responseText).responses[0].models.user[0].id}) account!`);
					else Alert('Error in sending request!', 'Sending negative numbers, decimal numbers, and numbers lower than five will not work! If you have done none of these and this is happening multiple times, please submit a bug report with the following information:<br><textarea style="width: 100%; resize: none;">' + 'Status:' + send.status + '\nGame:' + game + '\nScore:' + score + '\nError:' + e + '</textarea>');
				} catch (e) { Alert('Error in parsing response!', 'Sending negative numbers, decimal numbers, and numbers lower than five will not work! If you have done none of these and this is happening multiple times, please submit a bug report with the following information:<br><textarea style="width: 100%; resize: none;">' + 'Game:' + game + '\nScore:' + score + '\nError:' + e + '</textarea>'); }
			}
		}
		send.open('POST', document.location.href + '/highscores');
		send.setRequestHeader('CS-Token', Quizlet.getCsToken());
		send.setRequestHeader('Accept', 'application/json');
		send.setRequestHeader('Content-Type', 'application/json');
		send.send(JSON.stringify(message));
	}
}