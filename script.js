//board
let tileSize = 32;
let rows = 16;
let cols = 16;

let boardWidth = tileSize * cols;
let boardHeight = tileSize * rows;

let board;

let context;

//ship
let shipWidth = tileSize * 2;
let shipHeight = tileSize;

let shipX = tileSize * cols/2 - tileSize;
let shipY = tileSize * rows - tileSize*2;

let ship = {
    x : shipX,
    y : shipY,
    width : shipWidth,
    height : shipHeight
}

let shipImage;

window.onload = function(){

    board = document.getElementById('board');
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext('2d');//se usa para dibujar en eltablero

    //draw ship
    // context.fillStyle = 'green';
    // context.fillRect(ship.x, ship.y, shipWidth, shipHeight);

    let shipImage = new Image();
    shipImage.src = '/assets/ship.png';
    
    shipImage.onload = function(){
        context.drawImage(shipImage, ship.x, ship.y, ship.width, ship.height);
    }
}




