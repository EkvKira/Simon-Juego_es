// Arreglo de colores de los botones
var coloresBotones = ["red", "blue", "green", "yellow"];

// Arreglo para almacenar el patrón del juego
var patronJuego = [];

// Arreglo para almacenar el patrón del usuario al hacer clic
var patronUsuario = [];

// Variable booleana para rastrear si el juego ha comenzado
var comenzado = false;

// Variable para almacenar el nivel actual del juego
var level = 0;

// Evento para clics en los botones
$(".btn").click(function () {
  if (comenzado) {
    // Obtener el color del botón clickeado
    var colorElegidoUsuario = $(this).attr("id");

    // Agregar el color elegido al patrón del usuario
    patronUsuario.push(colorElegidoUsuario);

    // Jugar el juego y verificar la respuesta del usuario
    jugarJuego(colorElegidoUsuario);
    verificarRespuesta(patronUsuario.length - 1);
  }
});

// Evento para clic en el botón "Inicio"
$("#startBtn").click(function () {
  if (!comenzado) {
    comenzarJuego();
  } else {
    reiniciarJuego();
  }
});

// Evento para clic en el botón "Reiniciar"
$("#resetBtn").click(function () {
    comenzarJuego();
});

// Función para iniciar el juego
function comenzarJuego() {
  // Actualizar la pantalla de nivel
  $("#level-title").text("Nivel " + level);

  // Generar la siguiente secuencia en el juego
  siguienteSecuencia();

  // Establecer que el juego ha comenzado
  comenzado = true;

  // Ocultar el botón "Inicio" y mostrar el botón "Reiniciar"
  $("#startBtn").addClass("hidden");
  $("#resetBtn").removeClass("hidden");
}

// Función para jugar el juego (reproducir sonido y animar clic en el botón)
function jugarJuego(colorElegidoUsuario) {
  reproducirSonido(colorElegidoUsuario);
  animarPresion(colorElegidoUsuario);
}

// Función para verificar la respuesta del usuario
function verificarRespuesta(nivelActual) {
  if (patronJuego[nivelActual] === patronUsuario[nivelActual]) {
    // Verificar si el usuario ha completado la secuencia
    if (patronUsuario.length === patronJuego.length) {
      // Si se alcanza el nivel 30, mostrar un mensaje de victoria
      if (level === 30) {
        $("#level-title").html('<span style="color: green;">¡Felicidades, ganaste el juego! </span><br> Presiona "Inicio" para jugar de nuevo.');
        reiniciarJuego();
      } else {
        // Pasar al siguiente nivel después de un retraso
        setTimeout(siguienteSecuencia, 1000);
      }
    }
  } else {
    // Manejar una respuesta incorrecta
    manejarRespuestaIncorrecta();
  }
}

// Función para generar la siguiente secuencia en el juego
function siguienteSecuencia() {
  // Reiniciar el patrón del usuario
  patronUsuario = [];

  // Incrementar el nivel y actualizar la pantalla de nivel
  level++;
  $("#level-title").text("Nivel " + level);

  // Generar un color aleatorio y agregarlo al patrón del juego
  generarColorAleatorio();
}

// Función para generar un color aleatorio para el patrón del juego
function generarColorAleatorio() {
  var numeroAleatorio = Math.floor(Math.random() * 4);
  var colorElegidoAleatorio = coloresBotones[numeroAleatorio];
  patronJuego.push(colorElegidoAleatorio);

  // Mostrar la animación de color y reproducir el sonido correspondiente
  $("#" + colorElegidoAleatorio).fadeIn(100).fadeOut(100).fadeIn(100);
  reproducirSonido(colorElegidoAleatorio);
}

// Función para animar un clic en el botón
function animarPresion(colorActual) {
  $("#" + colorActual).addClass("pressed");
  setTimeout(function () {
    $("#" + colorActual).removeClass("pressed");
  }, 100);
}

// Función para reproducir un sonido basado en el nombre proporcionado
function reproducirSonido(nombre) {
  var audio = new Audio("sounds/" + nombre + ".mp3");
  audio.play();
}

// Función para manejar una respuesta incorrecta
function manejarRespuestaIncorrecta() {
  // Reproducir un sonido de "incorrecto" y agregar una clase de "game-over" al cuerpo
  reproducirSonido("wrong");
  $("body").addClass("game-over");

  // Mostrar un mensaje de fin de juego y la opción de comenzar de nuevo
  $("#level-title").html('<span style="color: red;">¡Has perdido! Se acabó el juego. </span><br> Presiona "Inicio" para jugar de nuevo.');

  // Quitar la clase de "game-over" después de un retraso
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  // Reiniciar el juego
  reiniciarJuego();
}

// Función para restablecer el estado del juego
function reiniciarJuego() {
  // Restablecer el nivel, el patrón del juego y el estado del juego
  level = 0;
  patronJuego = [];
  comenzado = false;

  // Mostrar el botón "Inicio" y ocultar el botón "Reiniciar"
  $("#startBtn").removeClass("hidden");
  $("#resetBtn").addClass("hidden");
}
