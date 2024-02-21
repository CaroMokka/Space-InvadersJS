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

//ship
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

//aliens speed
let alienMovingX = 1;

//bullets
let bulletsArray = [];
let bulletsSpeedY = -10;

window.onload = function () {
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d");
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
  document.addEventListener("keyup", shoot);
};

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);
  //console.log(typeof shipImage[this.spriteCostumeCount])
  //ship
  context.drawImage(shipImage, ship.x, ship.y, ship.width, ship.height);
  //aliens
  for (let i = 0; i < aliensArray.length; i++) {
    let alien = aliensArray[i];
    if (alien.alive) {
      alien.x = alien.x + alienMovingX;
      console.log(alienMovingX);
      //Si aliens tocan los bordes del canvas
      if (alien.x + alien.width >= board.width || alien.x <= 0) {
        //Entonces invierte la velocidad
        //alien.x = alien.x - alienMovingX;
        alienMovingX = alienMovingX * -1;
        alien.x = alien.x + alienMovingX * 2;

        //mover aliens hacia abajo en y por el canvas
        for (let j = 0; j < aliensArray.length; j++) {
          aliensArray[j].y = aliensArray[j].y + alienHeight;
        }
      }
      context.drawImage(
        alienImage,
        alien.x,
        alien.y,
        alien.width,
        alien.height
      );
    }
  }
  //bullets
  for (let i = 0; i < bulletsArray.length; i++) {
    let bullet = bulletsArray[i];
    bullet.y = bullet.y + bulletsSpeedY;
    context.fillStyle = "white";
    context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    //bullets collision con aliens
    for(let j = 0; j < aliensArray.length; j++){
        let alien = aliensArray[j];
        if(!bullet.used && alien.alive && detectCollision(bullet, alien)){
            bullet.used = true;
            alien.alive = false;
            aliensCount --;
        }
    }
  }
  //clear bullets
  while(bulletsArray.length > 0 && (bulletsArray[0].used || bulletsArray[0].y < 0)){
    bulletsArray.shift();
  }
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
        x: alienX + c * alienWidth,
        y: alienY + r * alienHeight,
        width: alienWidth,
        height: alienHeight,
        alive: true,
      };
      aliensArray.push(alien);
    }
  }
  aliensCount = aliensArray.length;
}

function shoot(e) {
  if (e.code == "Space") {
    let bullet = {
      x: ship.x + ship.width*15/32,
      y: ship.y,
      width: tileSize / 8,
      height: tileSize / 2,
      used: false,
    };
    bulletsArray.push(bullet); 
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
