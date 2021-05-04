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
function DibujarLadrillos(){
  for (let i = 1; i < LADRILLO.F; i++){//Inicializo en 1 en vez de en 0 para poder despegar los ladrillos del borde
    for(let j = 1; j < LADRILLO.C; j++){////Inicializo en 1 en vez de en 0 para poder despegar los ladrillos del borde

      if (ladrillos[i][j].visible){
          ctx.beginPath();
          ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, ladrillo.anch, ladrillo.alt);
          ctx.fillStyle = "#B802AF";
          ctx.fill();
          ctx.closePath();
      }
    }
  }

}
function update(){
  VidasRestantes();
  PuntosConseguidos();
  DibujarRaqueta();
  DibujarBola();
  DibujarLadrillos();

  //Bucle para la colisión de la pelota con los ladrillos.
  for (let i = 1; i < ladrillo.f; i++) {//Inicializo en 1 porque igual lo hice en el bucle de arriba
    for (let j = 1; j < ladrillo.c; j++) {
      if (ladrillos[i][j].visible) {
        if ((y >= ladrillos[i][j].y) && (y <= (ladrillos[i][j].y + 20))){
          if ((x >= ladrillos[i][j].x) && (x <= (ladrillos[i][j].x + 70))){
            ladrillos[i][j].visible = false;
            vely = -vely;
            points += 10;
            Clash.play();
          }
        }
      }
    }
  }

  //Definimos el movimiento de la pelota y que ocurre cuando choca con la raqueta

  if(x + velx > canvas.width - radiobola || x + velx < radiobola){
      velx = -velx;
  }
  if(y + vely < radiobola) {
      vely = -vely;
  }else if(y + vely > canvas.height - radiobola){
      if(x > raquetaX && x <raquetaX + raquetaWidth){
          vely = -vely;
          Rebound.play();
      }
  }

  //Definimos lo que ocurre cuando la pelota toca el suelo (pérdida de vida)

  if (y >= canvas.height){
    velx = 0;
    vely = 0;
    x = canvas.width/2;
    y = canvas.height - 10;
    raqueta= (canvas.width - raquetaWidth)/2;
    lifes -= 1;
  }else if(numVidas == 0){
    velx = 0;
    vely = 0;
    raquetaX = (canvas.width - raquetaWidth)/2;
    document.getElementById("canvas").style.display = "none";
  }
//Definimos que ocurre cuando se destruyen todos los bloques(ganamos el juego)
  if(puntuacion == 450){
    velx = 0;
    vely = 0;
    raqueta = (canvas.width - raquetaWidth)/2;
    document.getElementById("canvas").style.display = "none";
  }

  if(derecha && raqueta < canvas.width - raquetaWidth){
      raqueta += 7;
  }else if(izquierda && raqueta > 0) {
      raqueta -= 7;
  }

  //-- 4) Volver a ejecutar update cuando toque
  x += velx;
  y += vely;
  requestAnimationFrame(update);
}
