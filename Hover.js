function x() {
	let self = this,
		terms = self.obtainTerms(),
		tooltip = document.createElement('div'),
		imageId = '1a4C1|2#>~`l:';

	self.removeClass('custom-answer-tooltip');

	tooltip.style = `z-index: 2147483647; font-size: 20px; transform: translateY(-100%); pointer-events: none; user-select: none; overflow: auto; position: absolute; background-color: rgba(0, 0, 0, 0.5); color: #fff; top: -999px; left: -999px;`;
	tooltip.className = 'custom-answer-tooltip';
	document.body.appendChild(tooltip);

	window.addEventListener('mousemove', e => {
		tooltip.style.left = Math.round(e.clientX) + 'px';
		tooltip.style.top = Math.round(e.clientY) + 'px';

		if (e.target) {

			if (e.target.nodeName === 'IMG') {
				let matches = [];

				terms.forEach(term => { if (term._imageUrl === e.target.src) matches.push(term.word || imageId + term._imageUrl || '...'); });

				formatAnswers(tooltip, matches);

			} else if (e.target.textContent) {
				let content = e.target.textContent.trim(),
					matches = [];

				terms.forEach(term => {
					if (term.word.trim() === content) matches.push(term.definition || imageId + term._imageUrl || '...');
					if (term.definition.trim() === content) matches.push(term.word || imageId + term._imageUrl || '...');
				});

				formatAnswers(tooltip, matches);
			}
		}
	});

	function formatAnswers(parent, answers = []) {
		if (answers.length <= 0) return;
		parent.innerHTML = '';

		for (let i = 0; i < answers.length; i++) {

			let elem = document.createElement('div');
			elem.style.padding = '5px';
			elem.style.backgroundColor = (i % 2 === 0 ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)');

			if (answers[i].startsWith(imageId)) {

				let img = document.createElement('img');
				img.height = 45;
				img.src = image.alt = answers[i].substr(imageId.length);

				elem.appendChild(img);

			} else { elem.textContent = answers[i]; }

			parent.appendChild(elem);
		}
	}
};