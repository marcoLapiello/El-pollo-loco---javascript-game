let canvas;
let ctx;
let character = new Image();

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    
    character.src = '../Grafics/img/2_character_pepe/2_walk/W-21.png';

    setTimeout(() => {
        ctx.drawImage(character, 50, 200, 100, 210);
    }, 500);
    
}