function Write() {
	this.speed = 100;
	this.solve();
}

Write.prototype.solve = function () {
	let element = document.getElementsByClassName('WriteProgress-value')[0];

	if (element) {
		let remaining = Number(element.innerText) || 0;

		for (let i = 0; i < remaining; i++) {
			setTimeout(() => {
                let ta = document.querySelector('textarea'),
                    value;
                if (!ta) return;
                ta.focus();
                let val = Object.getOwnPropertyDescriptor(ta.constructor.prototype, 'value');
                (null == val ? void 0 : val.set) ? val.set.call(ta, value) : ta.value = value;

                let evt = window.document.createEvent('Event');
                evt.initEvent('input', true, true);
                ta.dispatchEvent(evt);

                ta.selectionStart = ta.value.length + 1;
                ta.selectionEnd = ta.value.length + 1;

                document.querySelector('button[type="submit"]').click();
                document.getElementsByClassName('WrittenFeedbackItem-answerOverride')[0].querySelector('button').click();
                        
            }, i * this.speed);
		}
	} else {
        alert('Error: Please message the developer that Quizlet has updated.');
    }
}