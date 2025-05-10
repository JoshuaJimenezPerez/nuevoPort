var scene = document.getElementById('scene');
var text = document.getElementById('text');

let parallaxInstanceScene = new Parallax(scene);
let parallaxInstanceText = new Parallax(text);

let cardVolteada = null; //aqui guardo si hay alguna tarjeta volteada

document.addEventListener('DOMContentLoaded', function () {

    // Selecciona la flecha para subir
    const scrollUpArrow = document.getElementById('scrollUpArrow');


    // Agrega un evento de clic a la flecha para subir
    scrollUpArrow.addEventListener('click', function () {
        // Selecciona el header
        const nav = document.querySelector('nav');

        // Desplazamiento suave hacia el header
        nav.scrollIntoView({ behavior: 'smooth' });
    });


    // --- Seleccionar elementos del menú "Sobre mí" y tarjetas ---
    const enlaceSobreMi = document.getElementById('enlace-sobre-mi');
    const enlaceHabilidades = document.getElementById('enlace-habilidades');
    const enlaceExperiencia = document.getElementById('enlace-experiencia');

    const tarjetaSobreMi = document.getElementById('sobre-mi-card');
    const tarjetaHabilidades = document.getElementById('habilidades-card');
    const tarjetaExperiencia = document.getElementById('experiencia-card');

    const mainContent = document.querySelector('main.content'); // Selecciona el <main class="content">


    // --- Función MODIFICADA para voltear una tarjeta ---
    // Ahora recibe el elemento .card directamente
    function voltearTarjeta(tarjeta) {
        // Asegúrate de que 'tarjeta' es el elemento .card
        if (!tarjeta.classList.contains('card')) {
             console.error("voltearTarjeta recibió un elemento que no es .card");
             return; // Salir si no es el elemento esperado
        }

        // Si hay una tarjeta volteada diferente a la actual, la volteamos de nuevo
        if (cardVolteada && cardVolteada !== tarjeta) {
            cardVolteada.classList.remove('is-flipped');
        }

        // Alterna la clase 'is-flipped' en el elemento .card
        tarjeta.classList.toggle('is-flipped'); // Usamos toggle para voltear y desvoltear la misma tarjeta

        // Actualiza la referencia de la tarjeta volteada
        if (tarjeta.classList.contains('is-flipped')) {
            cardVolteada = tarjeta; // Guarda la tarjeta si ahora está volteada
        } else {
            cardVolteada = null; // Borra la referencia si se ha desvolteado
        }
    }

    // --- Evento al hacer clic en "Mi Historia" ---
    enlaceSobreMi.addEventListener('click', function (event) {
        event.preventDefault();
        mainContent.scrollIntoView({ behavior: 'smooth' });

        // Esperar un poco después del scroll para voltear la tarjeta 
        setTimeout(function () {
            voltearTarjeta(tarjetaSobreMi);
        }, 500); // 500ms de espera 
    });

    // --- Evento al hacer clic en "Mis Habilidades" ---
    enlaceHabilidades.addEventListener('click', function (event) {
        event.preventDefault(); // Prevenir comportamiento predeterminado del enlace

        mainContent.scrollIntoView({ behavior: 'smooth' }); // Desplazamiento suave al <main>


        setTimeout(function () {
            voltearTarjeta(tarjetaHabilidades);
        }, 500); // 500ms de espera
    });

    // --- Evento al hacer clic en "Mi Experiencia" ---
    enlaceExperiencia.addEventListener('click', function (event) {
        event.preventDefault();
        mainContent.scrollIntoView({ behavior: 'smooth' });

        setTimeout(function () {
            voltearTarjeta(tarjetaExperiencia);
        }, 500); // 500ms de espera
    });

      // --- Evento al hacer clic directamente en las TARJETAS ---
    // Seleccionamos todos los elementos con la clase 'card' ahora
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        // Agregamos el listener al elemento .card directamente
        card.addEventListener("click", function () {
            // Llamamos a voltearTarjeta con el propio elemento .card que fue clicado
            voltearTarjeta(this);
        });
    });

});



