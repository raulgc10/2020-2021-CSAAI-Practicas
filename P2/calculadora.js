console.log("Ejecutando JS...");
//Obtenemos los elementos del html por id
display = document.getElementById("display")
suma = document.getElementById("suma")
resta = document.getElementById("resta")
multiplicacion = document.getElementById("multiplicacion")
division = document.getElementById("division")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
del = document.getElementById("del")

//-- Estados de la calculadora
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3
}
 

//-- Al comenzar estamos en el estado incial
let estado = ESTADO.INIT;

function digito(ev)
{
    if (estado == ESTADO.INIT) {
        display.innerHTML = ev.target.value;
        estado = ESTADO.OP1;
    } else if (estado == ESTADO.OP1){
        display.innerHTML += ev.target.value;
        
    } else if (estado == ESTADO.OPERATION){
        display.innerHTML += ev.target.value;
        estado = ESTADO.OP2;
    } else if (estado == ESTADO.OP2){
        display.innerHTML += ev.target.value;  
    }
}    
//Obtenemos las clases del html
digitos = document.getElementsByClassName("digito")
operadores = document.getElementsByClassName("operador")
//Recorremos el array de digitos
for (i=0; i<digitos.length; i++){
    digitos[i].onclick = (ev)=>{
      digito(ev.target.value);
    }
}
//Recorremos el array de operadores
for (i=0; i<operadores.length; i++){
    operadores[i].onclick = (ev)=>{
      if(estado == ESTADO.OP1){
        operador(ev.target.value);
        estado=ESTADO.OPERATION
      }
    }
}
function operador(calculo){
    if (estado != ESTADO.OPERATION) {
      display.innerHTML += calculo;
      estado = ESTADO.OPERATION;
    }
}
for (let boton of digitos) {
    boton.onclick = digito;
}

// Calcular el display
igual.onclick = () => {
    if (estado==ESTADO.OP2){
    //-- Calcular la expresión y añadirla al display
        display.innerHTML = eval(display.innerHTML);
        estado = ESTADO.OP1
    }
}
//Borrar el último número
del.onclick = () => {
    display.innerHTML = display.innerHTML.slice(0, -1);
    
}
//Poner a 0 el display
clear.onclick = () => {
  display.innerHTML = "0";
  estado = ESTADO.INIT;
}