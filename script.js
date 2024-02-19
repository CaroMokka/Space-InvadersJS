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

let shipX = (tileSize * cols) / 2 - tileSize;
let shipY = tileSize * rows - tileSize * 2;

let ship = {
  x: shipX,
  y: shipY,
  width: shipWidth,
  height: shipHeight,
};

let shipImage;
let shipMovingX = tileSize;

//aliens
let aliensArray = [];
let alienWidth = tileSize * 2;
let alienHeight = tileSize;
let alienX = tileSize;
let alienY = tileSize;

let alienImage;
let aliensRows = 2;
let aliensCols = 3;
let aliensCount = 0;

window.onload = function () {
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d"); //se usa para dibujar en eltablero

  //draw ship
  // context.fillStyle = 'green';
  // context.fillRect(ship.x, ship.y, shipWidth, shipHeight);

  shipImage = new Image();
  shipImage.src = "/assets/ship.png";

  alienImage = new Image();
  alienImage.src = "/assets/alien.png";
  createAliens();

  shipImage.onload = function () {
    context.drawImage(shipImage, ship.x, ship.y, ship.width, ship.height);
  };
  requestAnimationFrame(update);
  document.addEventListener("keydown", moveShip);
};

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);
  //console.log(typeof shipImage[this.spriteCostumeCount])
  //ship
  context.drawImage(shipImage, ship.x, ship.y, ship.width, ship.height);
  //aliens
//   for(let i = 0; i < aliensArray.length; i++) {
//     let alien = aliensArray[i];
//   }


}

function moveShip(e) {
  console.log(e);
  if (e.code == "ArrowLeft" && ship.x - shipMovingX >= 0) {
    ship.x = ship.x - shipMovingX;
  } else if (
    e.code == "ArrowRight" &&
    ship.x + shipMovingX + ship.width <= boardWidth
  ) {
    ship.x = ship.x + shipMovingX;
  }
}

function createAliens() {
  for (let c = 0; c < aliensCols; c++) {
    for (let r = 0; r < aliensRows; r++) {
      let alien = {
        img: alienImage,
        x: alienX + c*alienWidth,
        y: alienY + r*alienHeight,
        width: alienWidth,
        height: alienHeight,
        alive : true
      };
      aliensArray.push(alien);
    }
  }
  aliensCount = aliensArray.length;
}
 
