console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

const choqueladrillo = new Audio('ladrillo.mp3');
const choqueraqueta = new Audio('raqueta.mp3');
const perdervida = new Audio('vida.mp3');
const victoria = new Audio('victoria.mp3');
const derrota = new Audio('derrota.mp3');

//-- Definir el tamaño del convas
canvas.width = 500;
canvas.height = 480;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

//-- Velocidades del objeto
let velx = 0;
let vely = 0;
// Raqueta
var raquetaAltura = 10;
var raquetaAncho = 65;
var raqueta = (canvas.width - raquetaAncho)/2;
//Dibuja la raqueta en pantala
function DibujarRaqueta(){
  ctx.beginPath();
    ctx.rect(raqueta, canvas.height-raquetaAltura, raquetaAncho, raquetaAltura);
    ctx.fillStyle = 'white';
    ctx.fill();
  ctx.closePath();  
}

var x = canvas.width/2;
var y = canvas.height - 10;
var radio = 7;//radio de la bola

//Dibujar la bola en pantalla
function DibujarBola(){
  ctx.beginPath();
  ctx.arc(x, y, radio, 0, Math.PI*2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}


var lifes = 3;

//Vidas restantes
function VidasRestantes(){
  ctx.fillText("Vidas restantes: " +lifes, 8, 12);
  ctx.fillStyle = 'white';
  ctx.font = "12px Arcade";
}

var points = 0;

//Puntos conseguidos
function PuntosConseguidos(){
  ctx.fillText("Puntos: " +points, 300, 12);
  ctx.fillStyle = 'white';
  ctx.font = "12px arcade"
}
//Empieza el juego
window.onkeydown = (e) => {
  if(e.keyCode == 32){
    velx = 5;
    vely = 5;
  }
}
//Raqueta está parada al empezar
var izquierda = false;
var derecha = false;

//No pulsamos las teclas
document.addEventListener("keyup", keyUpHandler, false);

function keyUpHandler(e){
  if(e.keyCode == 68){
    derecha = false;
  }
  if(e.keyCode == 65){
    izquierda = false;
  }
}

//Pulsamos las teclas
document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e){
  if(e.keyCode == 68){
    derecha = true;
  }
  if(e.keyCode == 65){
    izquierda = true;
  }
}

//Definimos las características del ladrillo
const LADRILLO = {
  filas : 6,
  columnas : 13,
  altura : 15, 
  base : 35,
  padding : 4,
  visible : true,
}  
const ladrillos = [];
//Recorrer array de ladrillos
for (let i = 0; i < LADRILLO.filas; i++) {
  ladrillos[i] = []; 
  for (let j = 0; j < LADRILLO.columnas; j++) {
    ladrillos[i][j] = {
      x: (LADRILLO.base + LADRILLO.padding) * j,
      y: 20 + (LADRILLO.altura + LADRILLO.padding) * i,
      w: LADRILLO.base,
      h: LADRILLO.altura,
      padding: LADRILLO.padding,
      visible: LADRILLO.visible
    };
  }
}


//Dibujar los ladrillos
function DibujarLadrillos(){
  for (let i = 0; i < LADRILLO.filas; i++){
    for(let j = 0; j < LADRILLO.columnas; j++){

      if (ladrillos[i][j].visible){
          ctx.beginPath();
          ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, LADRILLO.base, LADRILLO.altura);
          ctx.fillStyle = "white";
          ctx.fill();
          ctx.closePath();
      }
    }
  }

}
function update(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  VidasRestantes();
  PuntosConseguidos();
  DibujarBola();
  DibujarRaqueta();
  DibujarLadrillos();

 //Colisión de la bola con los ladrillos
  for (let i = 0; i < LADRILLO.filas; i++) {
    for (let j = 0; j < LADRILLO.columnas; j++) {
      if (ladrillos[i][j].visible) {
        if ((y >= ladrillos[i][j].y) && (y <= (ladrillos[i][j].y + 15))){
          if ((x >= ladrillos[i][j].x) && (x <= (ladrillos[i][j].x + 35))){
            ladrillos[i][j].visible = false;
            vely = -vely;
            points = points + 1;
            choqueladrillo.play();
          }
        }
      }
    }
  }

//Rebote de la pelota

  if(x + velx > canvas.width - radio || x + velx < radio){
      velx = -velx;
  }
  if(y + vely < radio) {
      vely = -vely;
  }else if(y + vely > canvas.height - radio){
      if(x > raqueta && x <raqueta + raquetaAncho){
          vely = -vely;
      }
      choqueraqueta.play();
  }

  //Pelota toca el suelo

  if (y >= canvas.height){
    velx = 0;
    vely = 0;
    x = canvas.width/2;
    y = canvas.height - 10;
    raqueta= (canvas.width - raquetaAncho)/2;
    lifes -= 1;
    perdervida.play();
  }else if(lifes == 0){
    velx = 0;
    vely = 0;
    raqueta = (canvas.width - raquetaAncho)/2;
    derrota.play();
    document.getElementById("lose").style.display = "block";
    document.getElementById("canvas").style.display = "none";
    document.getElementById("again").style.display = "";
    
  }
//Ganamos el juego
  if(points == 2){
    velx = 0;
    vely = 0;
    raqueta = (canvas.width - raquetaAncho)/2;
    victoria.play();
    document.getElementById("win").style.display = "block";
    document.getElementById("canvas").style.display = "none";
    document.getElementById("again").style.display = "";
  }
//Movimiento de la raqueta
  if(derecha && raqueta < canvas.width - raquetaAncho){
      raqueta += 5;
  }else if(izquierda && raqueta > 0) {
      raqueta -= 5;
  }

  //-- 4) Volver a ejecutar update cuando toque
  x += velx;
  y += vely;
  requestAnimationFrame(update);
}
update();