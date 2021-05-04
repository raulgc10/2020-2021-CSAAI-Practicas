console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");
start = document.getElementById("start");

//-- Definir el tamaño del convas
canvas.width = 340;
canvas.height = 480;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

//-- Coordenadas del objeto
let x = 170;
let y = 330;

//-- Velocidades del objeto
let velx = 0;
let vely = 0;
// Raqueta
var raquetaHeight = 10;
var raquetaWidth = 75;
var raqueta = (canvas.width - raquetaWidth)/2;
//Dibuja la raqueta en pantala
function DibujarRaqueta(){
  ctx.beginPath();
    ctx.rect(raqueta, canvas.height-raquetaHeight, raquetaWidth, raquetaHeight);
    ctx.fillStyle = 'white';
    ctx.fill();
  ctx.closePath();  
}

var lifes = 5;
var points = 0;

//Vidas restantes
function VidasRestantes(){
  ctx.fillText("Vidas restantes: " +lifes, 10, 10);
  ctx.fillStyle = 'white';
  ctx.font = "10px Arial";
}

//Puntos conseguidos
function PuntosConseguidos(){
  ctx.fillText("Puntos: " +points, 10, 10);
  ctx.fillStyle = 'white';
  ctx.font = "10px Arial"
}
//Empieza el juego
window.onkeydown = (e) => {
  if(e.keyCode == 13){
    velx = 3;
    vely = -3;
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

const ladrillos = [];
const LADRILLO = {
  filas = 5,
  columnas = 9,
  altura = 5, 
  base = 20,
  padding = 2,
  visible = true
}  
for (let i = 0; i < LADRILLO.F; i++) {
  ladrillo[i] = [];  //-- Inicializar la fila. Las filas son a su vez Arrays que inicialmente están vacíos

  //-- Recorrer las C columnas de la fila i. La variable j toma valores de 0 hasta C-1 (numero de columnas)
  for (let j = 0; j < LADRILLO.C; j++) {

    //-- Calcular valores para el ladrillo de la fila i y la columna j
    //-- Algunos valores son constates. Otros depeden de i y j
    ladrillos[i][j] = {
      x: (LADRILLO.w + LADRILLO.padding) * j,
      y: (LADRILLO.h + LADRILLO.padding) * i,
      w: LADRILLO.w,
      h: LADRILLO.h,
      padding: LADRILLO.padding,
      visible: LADRILLO.visible
    };
  }
}
//Dibujar ladrillos
for (let i = 0; i < LADRILLO.F; i++) {
  for (let j = 0; j < LADRILLO.C; j++) {

    //-- Si el ladrillo es visible se pinta
    if (ladrillos[i][j].visible) {
      ctx.beginPath();
      ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, LADRILLO.w, LADRILLO.h);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.closePath();
    }
  }
}
