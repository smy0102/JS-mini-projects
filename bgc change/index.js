let hexNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
let hexCodeText = document.getElementById('hexcode-text');
const body = document.querySelector('body');
const button = document.querySelector('#change-btn');
let hexCodeArr = [];

hexCodeText.innerHTML = '#ffffff';

button.addEventListener('click', function () {

    var hexCodeStr = hexCodeArr.join("");

    for(let i=0; i < 6; i++) {
        hexCodeArr[i] = hexNumbers[Math.floor(Math.random() * 16)]
    }

    body.style.backgroundColor = `#${hexCodeStr}`; 
    hexCodeText.innerHTML = `#${hexCodeStr}`;

}, false)