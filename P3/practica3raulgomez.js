console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del convas
canvas.width = 340;
canvas.height = 480;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

// Lineas
ctx.beginPath();
    // Lineas verticales delimitatorias
    ctx.moveTo(0, 0);
    ctx.lineTo(0,480);
    ctx.moveTo(340, 0);
    ctx.lineTo(340, 480);
    // Raqueta
    ctx.moveTo(150, 400);
    ctx.lineTo(190,400);
    // Ladrillos (fila 1)
    ctx.moveTo(0, 80);
    ctx.lineTo(35,80);
    ctx.moveTo(38, 80);
    ctx.lineTo(73,80);
    ctx.moveTo(76, 80);
    ctx.lineTo(111,80);
    ctx.moveTo(114, 80);
    ctx.lineTo(149,80);
    ctx.moveTo(152, 80);
    ctx.lineTo(187,80);
    ctx.moveTo(190, 80);
    ctx.lineTo(225,80);
    ctx.moveTo(228, 80);
    ctx.lineTo(263,80);
    ctx.moveTo(266, 80);
    ctx.lineTo(301,80);
    ctx.moveTo(304, 80);
    ctx.lineTo(339,80);
    // Ladrillos (fila 2)
    ctx.moveTo(0, 90);
    ctx.lineTo(35,90);
    ctx.moveTo(38, 90);
    ctx.lineTo(73,90);
    ctx.moveTo(76, 90);
    ctx.lineTo(111,90);
    ctx.moveTo(114, 90);
    ctx.lineTo(149,90);
    ctx.moveTo(152, 90);
    ctx.lineTo(187,90);
    ctx.moveTo(190, 90);
    ctx.lineTo(225,90);
    ctx.moveTo(228, 90);
    ctx.lineTo(263,90);
    ctx.moveTo(266, 90);
    ctx.lineTo(301,90);
    ctx.moveTo(304, 90);
    ctx.lineTo(339,90);
    // Ladrillos (fila 3)
    ctx.moveTo(0, 100);
    ctx.lineTo(35,100);
    ctx.moveTo(38, 100);
    ctx.lineTo(73,100);
    ctx.moveTo(76, 100);
    ctx.lineTo(111,100);
    ctx.moveTo(114, 100);
    ctx.lineTo(149,100);
    ctx.moveTo(152, 100);
    ctx.lineTo(187,100);
    ctx.moveTo(190, 100);
    ctx.lineTo(225,100);
    ctx.moveTo(228, 100);
    ctx.lineTo(263,100);
    ctx.moveTo(266, 100);
    ctx.lineTo(301,100);
    ctx.moveTo(304, 100);
    ctx.lineTo(339,100);
    // Ladrillos (fila 4)
    ctx.moveTo(0, 110);
    ctx.lineTo(35,110);
    ctx.moveTo(38, 110);
    ctx.lineTo(73,110);
    ctx.moveTo(76, 110);
    ctx.lineTo(111,110);
    ctx.moveTo(114, 110);
    ctx.lineTo(149,110);
    ctx.moveTo(152, 110);
    ctx.lineTo(187,110);
    ctx.moveTo(190, 110);
    ctx.lineTo(225,110);
    ctx.moveTo(228, 110);
    ctx.lineTo(263,110);
    ctx.moveTo(266, 110);
    ctx.lineTo(301,110);
    ctx.moveTo(304, 110);
    ctx.lineTo(339,110);
    // Ladrillos (fila 5)
    ctx.moveTo(0, 120);
    ctx.lineTo(35,120);
    ctx.moveTo(38, 120);
    ctx.lineTo(73,120);
    ctx.moveTo(76, 120);
    ctx.lineTo(111,120);
    ctx.moveTo(114, 120);
    ctx.lineTo(149,120);
    ctx.moveTo(152, 120);
    ctx.lineTo(187,120);
    ctx.moveTo(190, 120);
    ctx.lineTo(225,120);
    ctx.moveTo(228, 120);
    ctx.lineTo(263,120);
    ctx.moveTo(266, 120);
    ctx.lineTo(301,120);
    ctx.moveTo(304, 120);
    ctx.lineTo(339,120);          
    ctx.strokeStyle = 'white';
    //-- Cambiar el tamaño de la linea del trazo
    ctx.lineWidth = 8;

    //-- Dibujar el trazo
    ctx.stroke()
    
ctx.closePath()

// Vidas y puntos
ctx.font = "25px Arial";
ctx.fillStyle = 'white';
ctx.fillText("000", 10, 30);
ctx.fillText("3", 310, 30);

