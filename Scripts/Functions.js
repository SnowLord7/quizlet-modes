function Alert(header, content) {
	let container = document.createElement('div');
	container.style = `box-shadow: 0 0.3125rem 1rem 0 rgba(0, 0, 0, 0.24); transform: translateX(-50%); margin-bottom: 2.8125rem; margin-top: 2.8125rem; max-width: 100%; width: 37.5rem; position: relative; top: 0; left: 50%; z-index: 2147483647; color: rgb(69, 83, 88); display: block; background-clip: border-box; background-color: rgb(255, 255, 255)`;
	container.className = 'custom-alert-container';

	let head = document.createElement('div');
	head.style = `background-color: rgb(66, 87, 178); color: rgb(255, 255, 255); font-size: 30px; line-height: 26px; padding: 32px;`;
	head.innerHTML = `${header}<span onclick="this.parentElement.parentElement.remove();" class="UIButton-wrapper" style="position: absolute; right: 0; width: 94px; cursor: pointer;"><svg class="UIIcon UIIcon--x-thin"><noscript></noscript><use xlink:href="#x-thin"></use><noscript></noscript></svg></span>`;
	container.appendChild(head);

	let body = document.createElement('div');
	body.style = `color: rgb(69, 83, 88); font-size: 16px; padding: 32px;`;
	body.innerHTML = content;
	container.appendChild(body);

	document.body.appendChild(container);
	return container;
}

function removeClass(className) {
	let elems = document.getElementsByClassName(className);

	for (let i = 0; i < elems.length; i++) elems[i].remove();
}

function obfuscate(msg, num=77) {
	let answer = '';
	for (let i = 0; i < msg.length; i++) answer += ('-' + (msg.charCodeAt(i) + num % (i + 1)));
	return answer.slice(1);
}

function getCookie(cname) {
    let name = cname + '=',
        decodedCookie = decodeURIComponent(document.cookie),
        ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; ++i) {
        let c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1);

        if (c.indexOf(name) === 0)
            return c.substring(name.length, c.length);
    }

    return '';
}

function copyText(text) {
	let input = document.createElement('textarea');

	input.value = text;
	input.setAttribute('readonly', '');

	document.body.appendChild(input);

	input.focus();
	input.select();

	if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
		input.style = 'z-index: 2147483646; position: fixed; left: 50%; top: 50%; width: 50%; height: 50%; transform: translate(-50%, -50%)';

		input.onclick = function () {
			this.focus();
			this.select();
			document.execCommand('copy');
		};

		input.onblur = function () { this.remove(); };
	} else {
		input.stype = 'opacity: 0; visibility: hidden;';

		document.execCommand('copy');
		document.body.removeChild(input);
	}
}
try {
	Object.defineProperty(String.prototype, 'hashCode', {
		value: function () {
			let hash = 0, chr;
			for (let i = 0; i < this.length; ++i) {
				chr = this.charCodeAt(i);
				hash = ((hash << 5) - hash) + chr;
				hash |= 0;
			}
			return hash;
		}
	});
} catch (error) {
	console.error(error);
}
