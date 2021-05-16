console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const img = document.getElementById('imagesrc');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//-- Acceso al deslizador
const deslizador1 = document.getElementById('deslizador1');
const deslizador2 = document.getElementById('deslizador2');
const deslizador3 = document.getElementById('deslizador3');
//-- Valor del deslizador
const range_value_red = document.getElementById('range_value_red');
const range_value_blue = document.getElementById('range_value_blue');
const range_value_green = document.getElementById('range_value_green');

const grises = document.getElementById('grises');
const colors = document.getElementById('colores');
//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  console.log("Imagen lista...");
};
function colores (data){
    umbral1 = deslizador1.value;
    umbral2 = deslizador2.value;
    umbral3 = deslizador3.value;
  
    //-- Filtrar la imagen según el nuevo umbral
    for (let i = 0; i < data.length; i+=4) {
      if (data[i] > umbral1){
        data[i] = umbral1;
      }
      if (data[i+1] > umbral2){
      data[i+1] = umbral2;
      }
      if (data[i+2] > umbral3){
      data[i+2] = umbral3;
      }
    }
   
  
  }

  function deslizadores () {
    //-- Funcion de retrollamada del deslizador
    deslizador1.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    range_value_red.innerHTML = deslizador1.value;
    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);
    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //-- Obtener el array con todos los píxeles
    let data = imgData.data
    colores(data);
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  
  }
      //-- Funcion de retrollamada del deslizador
  deslizador2.oninput = () => {
      //-- Mostrar el nuevo valor del deslizador
      range_value_green.innerHTML = deslizador2.value;
      //-- Situar la imagen original en el canvas
      //-- No se han hecho manipulaciones todavia
      ctx.drawImage(img, 0,0);
      //-- Obtener la imagen del canvas en pixeles
      let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      //-- Obtener el array con todos los píxeles
      let data = imgData.data
      colores(data);
      //-- Poner la imagen modificada en el canvas
      ctx.putImageData(imgData, 0, 0);
    
  }
    //-- Funcion de retrollamada del deslizador
  deslizador3.oninput = () => {
      //-- Mostrar el nuevo valor del deslizador
      range_value_blue.innerHTML = deslizador3.value;
      //-- Situar la imagen original en el canvas
      //-- No se han hecho manipulaciones todavia
      ctx.drawImage(img, 0,0);
    
      //-- Obtener la imagen del canvas en pixeles
      let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
      //-- Obtener el array con todos los píxeles
      let data = imgData.data
      colores(data);
      //-- Poner la imagen modificada en el canvas
      ctx.putImageData(imgData, 0, 0);
    }
}


grises.onclick = () => {
    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);
  
    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
    //-- Obtener el array con todos los píxeles
    let data = imgData.data
    for (var i = 0; i < data.length; i+=4) {
        valorr = data[i];
        valorb = data[i+1];
        valorg = data[i+2];
        brillo = (3 * valorr + 4 * valorg + valorb)/8
        data[i] = brillo;
        data[i+1] = brillo;
        data[i+2] = brillo;
      }
      ctx.putImageData(imgData, 0, 0);
}

colors.onclick = () => {
    ctx.drawImage(img, 0,0);
    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //-- Obtener el array con todos los píxeles
    let data = imgData.data
    deslizador1.value = 255;
    deslizador2.value=255;
    deslizador3.value= 255;
    deslizadores();
}

console.log("Fin...");