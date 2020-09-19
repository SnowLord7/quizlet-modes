function Write() {
	this.speed = 100;
	this.solve();
}

Write.prototype.solve = function () {
	let element = document.getElementsByClassName('WriteProgress-value')[0];

    let index = 0,
        phrases = 'Hello my friend you are you today? I am extremely sad because Quizlet finds enjoyment at my pain, not to mention they are being paid to make me sad while all I gain is depression.'.split(' ');

	if (element) {
		let remaining = Number(element.innerText) || 0;

		for (let i = 0; i < remaining; i++) {
			setTimeout(() => {
				
                let index = 0,
                    phrases = 'Hello my friend you are you today? I am extremely sad because Quizlet finds enjoyment at my pain, not to mention they are being paid to make me sad while all I gain is depression.'.split(' ');

                let ta = document.querySelector('textarea'),
                    value = ' ' + phrases[index];

                if (!ta) return;

                index++;
                if (index > phrases.length) index = 0;

                ta.focus();

                let val = Object.getOwnPropertyDescriptor(ta.constructor.prototype, 'value');
                (null == val ? void 0 : val.set) ? val.set.call(ta, value) : ta.value = value;

                let evt = window.document.createEvent('Event');
                evt.initEvent('input', true, true);
                ta.dispatchEvent(evt);

                ta.selectionStart = ta.value.length + 1;
                ta.selectionEnd = ta.value.length + 1;

                document.querySelector('button[type="submit"]').click();
                document.getElementsByClassName('IncorrectWrittenFeedbackItem-mistyped')[0].querySelector('button').click();
                        
            }, i * this.speed);
		}
	} else {
        alert('Error: Please message the developer that Quizlet has updated.');
    }
}