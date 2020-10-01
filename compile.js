console.time('Finished in');

let output = document.getElementById('output'),
	files = ['Module', 'Functions', 'Settings', 'Answers', 'Live', 'Flashcards', 'Gravity', 'Learn', 'Match', 'Micromatch', 'Spell', 'Test', 'Write', 'Main', 'Debug'],
	object = {};

output.value = `/*! DrewSnow v0.0.1 | (c) https://github.com/SnowLord7 */\nlet _extensionVersion = ${Date.now()};\n\n`;

files.forEach(url => {
	request(url, e => {
		console.log('Fetched content from', url);
		object[url] = e;
		update();
	});
});

function update() {
	let keys = Object.keys(object);
	if (keys.length == files.length) {
		console.log('Finished sending requests.');

		files.forEach(name => {
			output.value += object[name] + '\n';
		});

		console.log('--- Done ---');
		console.log('Total lines:', output.value.split('\n').length);
		console.log('Total characters:', output.value.split('').length);
		console.log('Total Size:', output.value.split('').length / 1000, 'MB');
		console.timeEnd('Finished in');
	}
}

function request(url, callback) {
	let req = new XMLHttpRequest();
	req.open('GET', 'Scripts/' + url + '.js');
	req.onreadystatechange = function(e) {
		if (this.status == 200 && this.readyState == 4) callback(req.responseText);
		else if (this.status != 200 && this.readyState == 4) console.error(this);
	}
	req.send();
}