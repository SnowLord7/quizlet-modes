function Flashcards() {
	const options = {
        'text': atob('RHJldyBTbm93IHdhcyBoZXJl'),
        'size': 150,
        'weight': 800,
        'speed': 2500
    };

    for (let i = 0; i < 50; i++) {
        let element = document.createElement('div');
        element.className = 'floatingElements'
        element.style = `width: 100%; height: 100%; margin: auto; pointer-events: none; user-select: none; font-weight: ${options.weight}; font-size: ${options.size}px; position: absolute; z-index: 2147483647; transition: all ${options.speed/1000}s linear; transform-origin: center center; text-align: center;`;
        element.textContent = options.text;

        document.body.appendChild(element);
    }

    setInterval(() => {
        let elements = document.getElementsByClassName('floatingElements');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.color = color();
            elements[i].style.opacity = Math.random() + .1;
            elements[i].style.transform = `rotate(${drewsnow.random(0,360)}deg) translate(${drewsnow.random(-1000,1000)}px, ${drewsnow.random(-500,500)}px) translate3d(${drewsnow.random(0,200)}px,${drewsnow.random(0,200)}px,${drewsnow.random(0,200)}px) rotateX(${drewsnow.random(0,360)}deg) rotateY(${drewsnow.random(0,360)}deg) rotateZ(${drewsnow.random(0,360)}deg)`;
        }
    }, options.speed);

    function color() { return ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'][Math.floor(Math.random() * 7)]; }
}