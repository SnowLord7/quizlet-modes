/**
 * Library by Drew Snow for miscellaneous uses 
 * @namespace Modules
 */

~function () {
	const timer = 'Exploit API loaded in';
	console.time(timer);

	window.drewsnow = {
		'mouse': { 'x': 0, 'y': 0 },

		/**
		 * Allow a container to be dragged around
		 * @param {HTMLElement} container - Container of the draggable element
		 * @param {HTMLElement} dragItem - Element to drag to move container
		 * @memberof Modules
		 */
		'draggable': (container, dragItem) => {
			if (dragItem === undefined) dragItem = container;

			let xOffset = 0,
				yOffset = 0,
				active = false,
				currentX,
				currentY,
				initialX,
				initialY;

			container.addEventListener('touchstart', dragStart, false);
			document.addEventListener('touchend', dragEnd, false);
			document.addEventListener('touchmove', drag, false);

			container.addEventListener('mousedown', dragStart, false);
			document.addEventListener('mouseup', dragEnd, false);
			document.addEventListener('mousemove', drag, false);

			function dragStart(e) {
				if (e.type === 'touchstart') {
					initialX = e.touches[0].clientX - xOffset;
					initialY = e.touches[0].clientY - yOffset;
				} else {
					initialX = e.clientX - xOffset;
					initialY = e.clientY - yOffset;
				}
				let ignoredElems = ['INPUT', 'BUTTON', 'A', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
				if (e.target === dragItem || container === dragItem && ignoredElems.indexOf(e.target.nodeName) == -1) active = true;
			}

			function dragEnd(e) {
				initialX = currentX;
				initialY = currentY;
				active = false;
			}

			function drag(e) {
				if (active) {
					e.preventDefault();
					if (e.type === 'touchmove') {
						currentX = e.touches[0].clientX - initialX;
						currentY = e.touches[0].clientY - initialY;
					} else {
						currentX = e.clientX - initialX;
						currentY = e.clientY - initialY;
					}
					xOffset = currentX;
					yOffset = currentY;
					setTranslate(currentX, currentY, container);
				}
			}

			function setTranslate(xPos, yPos, el) {
				el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)';
			}
		},

		/**
		 * Create new cascading style sheet (CSS)
		 * @param {String} css - CSS style to add to the page
		 * @returns {HTMLElement} New style sheet
		 * @memberof Modules
		 */
		'css': (css) => {
			let elem = document.createElement('style');
			elem.textContent = css;
			document.head.appendChild(elem);
			return elem;
		},

		/**
		 * Append HTML to body or given element
		 * @param {String} html - HTML to append to parent
		 * @param {HTMLElement} [HTMLElement] parent - Parent to append HTML to
		 * @returns {HTMLElement} New HTML element
		 * @memberof Modules
		 */
		'html': (html, parent) => {
			elements = new DOMParser().parseFromString(html, 'text/html');
			container = elements.body.firstChild;
			(parent || document.body).appendChild(container);
			return container;
		},

		/**
		 * Create and run a new script
		 * @param {String} script - Script element to create
		 * @returns {HTMLElement} New HTML element
		 * @memberof Modules
		 */
		'script': (script) => {
			let elem = document.createElement('script');
			elem.type = 'text/javascript';
			elem.textContent = script;
			elem.onload = function () { this.remove(); };
			document.body.appendChild(elem);
		},

		/**
		 * Create a new keybind
		 * @param {Function} func - Function to run on keydown
		 * @param {*} code - Identifier to select or remove keybind
		 * @param {Number} key - Key to call function
		 * @param {Boolean} [false] bool - Does the keybind start as on or off
		 * @memberof Modules
		 */
		'addKeyBind': function (func, code = -1, key = '', bool = false) {
			this.keybinds.push({
				'key': key,
				'on': bool,
				'func': func,
				'code': code
			});
			if (bool) func();
		},

		/**
		 * Remove keybind(s) with given identifier
		 * @param {*} code - Identifier to find and remove keybind
		 * @returns {Boolean} Keybind found or not
		 * @memberof Modules
		 */
		'removeKeyBind': function (code) {
			for (let i = 0; i < this.keybinds.length; i++) {
				let binds = this.keybinds;
				if (binds[i].code === code) {
					binds.splice(i, 1);
					return true;
				}
			}
			return false;
		},

		'keybinds': [],

		/**
		 * Find the angle between two given points
		 * @param {Number} x1 - X position of first point
		 * @param {Number} y1 - Y position of first point
		 * @param {Number} x2 - X position of second point
		 * @param {Number} y2 - Y position of second point
		 * @returns {Number} Angle between the two points
		 * @memberof Modules
		 */
		'angle': (x1, y1, x2, y2) => {
			return Math.atan2(y1 - y2, x1 - x2);
		},

		/**
		 * Find the distance between two given points
		 * @param {Number} x1 - X position of first point
		 * @param {Number} y1 - Y position of first point
		 * @param {Number} x2 - X position of second point
		 * @param {Number} y2 - Y position of second point
		 * @returns {Number} Distance between the two points
		 * @memberof Modules
		 */
		'distance': (x1, y1, x2, y2) => {
			let a = x1 - x2,
				b = y1 - y2;

			return Math.sqrt(a * a + b * b);
		},

		/**
		 * Find the closest object in an array to the given point
		 * @param {Object} you - Main charecter's position
		 * @param {String} you.x - Main charecter's position on X-axis
		 * @param {String} you.y - Main charecter's position on Y-axis
		 * @param {Array} objects - Array of positions of the other charecters
		 * @returns {Object} Closest object to main charecter
		 * @memberof Modules
		 */
		'closest': function (you, objects=[]) {
			let closestObj = objects[0];
			let closestDist = Infinity;
			for (let i = 0; i < objects.length; i++) {
				let obj = objects[i],
					dist = this.getDist(you.x, you.y, obj.x, obj.y);
				if (dist < closestDist) {
					closestObj = obj;
					closestDist = dist;
				}
			}
			return closestObj;
		},

        /**
		 * Spoof input event on given element
		 * @param {HTMLElement} elem - Element to dispatch the event onto
		 * @param {String} data - Data to be fed into the event
		 * @memberof Modules
		 */
		'input': function (elem, data='') {
			let event = new InputEvent('input', {
				bubbles: true,
				cancelBubble: false,
				cancelable: false,
				composed: true,
				currentTarget: null,
				dataTransfer: null,
				defaultPrevented: false,
				detail: 0,
				view: null,
				which: 0,
				returnValue: true,
				sourceCapabilities: null,
				eventPhase: 0,
				isComposing: false,
				inputType: 'insertText',
				srcElement: elem,
				target: elem,
				data
			});
			elem.dispatchEvent(event);
		},
        
        /**
		 * Spoof focus event on given element
		 * @param {HTMLElement} elem - Element to dispatch the event onto
		 * @memberof Modules
		 */
		'focus': function (elem) {
			elem.focus();
			let event = new FocusEvent('focus', {
				bubbles: false,
				cancelBubble: false,
				cancelable: false,
				composed: true,
				currentTarget: null,
				defaultPrevented: false,
				detail: 0,
				eventPhase: 0,
				isTrusted: true,
				relatedTarget: null,
				returnValue: true,
				sourceCapabilities: null,
				srcElement: elem,
				target: elem,
				view: window,
				which: 0
			});
			elem.dispatchEvent(event);
		},

		/**
		 * Download a file with given name and contents
		 * @param {String} filename - Name of the file to download
		 * @param {String} data - Contents of the file to download
		 * @memberof Modules
		 */
		'download': function (filename, data) {
			let elem = document.createElement('a');
			elem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
			elem.setAttribute('download', filename);

			elem.style.display = 'none';
			document.body.appendChild(elem);

			elem.click();

			document.body.removeChild(elem);
		},

		/**
		 * Attempt to go fullscreen
		 */
		'fullscreen': function () {
			let elem = document.documentElement;
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.mozRequestFullScreen) {
				elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullscreen) {
				elem.webkitRequestFullscreen();
			} else if (elem.msRequestFullscreen) {
				elem.msRequestFullscreen();
			}
		},

		/**
		 * Attempt to intercept scripts
		 * @param {String} match - String to match the script SRC to
		 * @param {String} script - Script to replace the file with
		 * @memberof Modules
		 */
		'intercept': function (match, script) {
			document.addEventListener('beforescriptexecute', function (e) {
				src = e.target.src;
				content = e.target.text;

				if (src.indexOf(match) != -1) {
					e.preventDefault();
					e.stopPropagation();
					e.target.remove();

					this.script(script);
				}
			});
		},

		/**
		 * Attempt to copy text to clipboard
		 * @param {String} text - String to copy to clipboard
		 * @memberof Modules
		 */
		'copy': function (text) {
			let input = document.createElement('textarea');

			input.value = text;
			input.setAttribute('readonly', '');
			document.body.appendChild(input);

			input.focus();
			input.select();

			try {
				input.style = 'opacity: 0; visibility: hidden;';

				document.execCommand('copy');
				document.body.removeChild(input);
			} catch (e) {
				input.style = 'z-index: 2147483646; position: fixed; left: 50%; top: 50%; width: 50%; height: 50%; transform: translate(-50%, -50%)';

				input.onclick = function () {
					this.focus();
					this.select();
					document.execCommand('copy');
				};

				input.onblur = function () { this.remove(); };
			}
		},

		/**
		 * Spoof mousedown event on given element
		 * @param {HTMLElement} elem - Element to dispatch the event onto
		 * @param {Object} params - Parameters to be fed into the event
		 * @memberof Modules
		 */
		'mousedown': function (elem, params={}) {
			let event = new MouseEvent('mousedown', {
				currentTarget: params.currentTarget || elem || document.body,
				view: params.view || window,
				bubbles: params.bubbles || true,
				cancelable: params.cancelable || true,
				clientX: params.x || 0,
				clientY: params.y || 0,
				pageX: params.x || 0,
				pageY: params.y || 0
			});
			elem.dispatchEvent(event);
		},

		/**
		 * Spoof mouseup event on given element
		 * @param {HTMLElement} elem - Element to dispatch the event onto
		 * @param {Object} params - Parameters to be fed into the event
		 * @memberof Modules
		 */
		'mouseup': function (elem, params={}) {
			let event = new MouseEvent('mouseup', {
				currentTarget: params.currentTarget || elem || document.body,
				view: params.view || window,
				bubbles: params.bubbles || true,
				cancelable: params.cancelable || true,
				clientX: params.x || 0,
				clientY: params.y || 0,
				pageX: params.x || 0,
				pageY: params.y || 0
			});
			elem.dispatchEvent(event);
		},

		/**
		 * Spoof mousemove event on given element
		 * @param {HTMLElement} elem - Element to dispatch the event onto
		 * @param {Object} params - Parameters to be fed into the event
		 * @memberof Modules
		 */
		'mousemove': function (elem, params={}) {
			let event = new MouseEvent('mousemove', {
				currentTarget: params.currentTarget || elem || document.body,
				view: params.view || window,
				bubbles: params.bubbles || true,
				cancelable: params.cancelable || true,
				clientX: params.x || 0,
				clientY: params.y || 0,
				pageX: params.x || 0,
				pageY: params.y || 0
			});
			elem.dispatchEvent(event);
		},

		/**
		 * Picks a random number inbetween two given numbers
		 * @param {Number} min - Minimum number
		 * @param {Number} max - Maximum number
		 * @memberof Modules
		 */
		'random': (min, max) => {
			return Math.floor(Math.random() * (max - min) + min);
		},

		'init': function () {
			const binds = this.keybinds;
			document.body.addEventListener('keydown', (e) => {
				for (let i = 0; i < binds.length; i++) {
					let data = binds[i];
					if ((e.which || e.keyCode) === data.code) {
						data.func(data.on);
						data.on = !data.on;
					}
				}
			});

			window.addEventListener('mousemove', e => {
				this.mouse.x = e.clientX;
				this.mouse.y = e.clientY;
			});

			let elem = this.html(`
				<div style="pointer-events: none; user-select: none;box-shadow: 0 5px 35px rgba(0, 0, 0, .65);font-family: Consolas, monaco, monospace;transition: transform 1s ease;transform: translateX(125%);border-radius: 3px 0 0 3px;width: 250px; height: 90px;background-color: #11af00;box-sizing: content-box;bottom: 20px; right: 0;box-sizing: border-box;margin: 0; padding: 0;z-index: 2147483647;text-align: center;line-height: 100%;padding-top: 30px;position: fixed;line-height: 0;color: #000;">
					<span style="line-height: 0px; font-size: 25px; font-family: inherit;">&#x44;&#x65;&#x76;&#x65;&#x6C;&#x6F;&#x70;&#x65;&#x64;&#x20;&#x42;&#x79;</span><br>
					<span style="line-height: 45px; font-size: 45px; text-shadow: 0 1px #808d93, -1px 0 #cdd2d5, -1px 2px #808d93, -2px 1px #cdd2d5, -2px 3px #808d93, -3px 2px #cdd2d5, -3px 4px #808d93, -4px 3px #cdd2d5, 2px 2px 2px rgba(206, 89, 55, 0.1); font-family: inherit;">&#x44;&#x72;&#x65;&#x77;&#x20;&#x53;&#x6E;&#x6F;&#x77;</span>
				</div>
			`.trim());

			setTimeout(() => { elem.style.transform = ''; }, 1);

			setTimeout(() => { elem.style.transform = 'translateX(125%)'; }, 4000);

			setTimeout(() => { elem.remove(); }, 5250);
			
			Number.prototype.toDegree = function () { return this * (180 / Math.PI); };

			Number.prototype.toRadian = function () { return this * (Math.PI / 180); };

			Array.prototype.random = function () { return this[Math.floor(Math.random() * this.length)] || []; };

			Element.prototype.forEach = function (callback) { for (let i = 0; i < this.length; i++) callback(this[i], i); };

			Array.prototype.contains = function (value) {
				for (let i = 0; i < this.length; i++)
					if (this[i] === value) return true;
				return false;
			};

			Array.prototype.findByName = function (name = '', exact = false) {
				let result = [],
					index = -1;
				if (this.length < 1) return [];

				for (let i = 0; i < this.length; i++) {
					let obj = this[i];

					if (exact && obj.name != name) continue;
					if (!exact && obj.name !== name) continue;

					result.push(obj);
					index = i;
				}

				return result[0];
			};

			String.prototype.encode = function () {
				return this
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')
					.replace(/"/g, '&quot;')
					.replace(/'/g, '&#39;');
			};

			CanvasRenderingContext2D.prototype.line = function (x1, y1, x2, y2, color = '#000', thickness = 1) {
				this.save();
				this.lineWidth = thickness;
				this.strokeStyle = color;

				this.beginPath();
				this.moveTo(x1, y1);
				this.lineTo(x2, y2);
				this.stroke();
				this.restore();
			};

			CanvasRenderingContext2D.prototype.circle = function (x, y, r, color = '#000') {
				this.save();

				this.arc(x, y, r, 0, 2 * Math.PI, false);
				this.fillStyle = color;
				this.fill();

				this.restore();
			};

			CanvasRenderingContext2D.prototype.rect = function (x, y, width, height, color = '#000') {
				this.save();

				this.fillStyle = color;
				this.fillRect(x, y, width, height, color);

				this.restore();
			};

			console.timeEnd(timer);
		}
	};
	window.drewsnow.init();
}();