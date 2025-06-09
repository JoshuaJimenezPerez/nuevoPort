// works.js

// Datos de los proyectos (asegúrate de que las rutas 'archivoHTML' sean correctas)
const proyectosData = [
    {
        id: 'Hyperplexed Pixar',
        titulo: 'Hyperplexed Pixar Project',
        enlaceCodigo: '#hyperplexed-pixar-codigo',
        archivoHTML: '../proyectos/Hyperplexed Pixar/home.html' // Ruta corregida si es necesario
    },
    {
        id: 'Proyecto_Hyper',
        titulo: 'Proyecto Hyper',
        enlaceCodigo: '#proyecto-hyper-codigo',
        archivoHTML: '../proyectos/Proyecto_Hyper/home.html'
    },
    {
        id: 'Proyecto_Lightmouse',
        titulo: 'Proyecto Lightmouse',
        enlaceCodigo: '#proyecto-lightmouse-codigo',
        archivoHTML: '../proyectos/Proyecto_Lightmouse/home.html'
    },
    {
        id: 'ProyectoArcane',
        titulo: 'Proyecto Arcane',
        enlaceCodigo: '#proyecto-arcane-codigo',
        archivoHTML: '../proyectos/ProyectoArcane/galeria.html'
    },
    {
        id: 'ProyectoCamille',
        titulo: 'Proyecto Camille',
        enlaceCodigo: '#proyecto-camille-codigo',
        archivoHTML: '../proyectos/ProyectoCamille/camille.html'
    }
];

// Variables para el Modal de Proyectos
const proyectoModal = document.getElementById('proyectoModal');
const modalProyectoTitulo = document.getElementById('modal-proyecto-titulo');
const modalProyectoIframe = document.getElementById('modal-proyecto-iframe');
const closeButton = document.querySelector('.close-button'); // Botón de cierre del modal de proyecto
const projectMarkers = document.querySelectorAll('.project-marker'); // Todos los marcadores de proyecto

// Variables para el Tutorial y Audio
const tutorialOverlay = document.getElementById('tutorial-overlay');
const tutorialModal = document.getElementById('tutorial-modal');
const tutorialMessageElement = tutorialModal ? tutorialModal.querySelector('.tutorial-message') : null;
const tutorialNextButton = document.getElementById('tutorial-next-button');

// Variables para el sonido de escritura y música
const typingSound = new Audio('../misc/sounds/Single Keys/keypress-015.wav');
typingSound.volume = 0.5;
const footStepSound = new Audio('../misc/sounds/Movement/Footsteps/sfx_movement_footstepsloop4_slow.wav');
footStepSound.volume = 0.5;

const modalMusic = document.getElementById('modal-music');
const backgroundCalmMusic = document.getElementById('background-calm-music');
const musicToggleButton = document.getElementById('music-toggle-button');
const tutorialCloseButton = document.getElementById('tutorial-close-button');

const tutorialMessages = [
    "¡Hola, explorador! Soy Joshua, tu guía en este viaje digital.",
    "Aquí verás el recorrido de mis proyectos, como si fuera un mapa de un gran mundo.",
    "Cada punto en el mapa es un proyecto, ¡un hito en mi aventura!",
    "Utiliza la cruceta del teclado para desplazarte por la ciudad y presiona Space cuando quieras ver el proyecto en cuestión.",
    "¡Mucha suerte en tu exploración! ¡A la aventura!"
];

let currentMessageIndex = 0;
let typingSpeed = 30; // Velocidad de escritura
let isMusicMuted = localStorage.getItem('isMusicMuted') === 'true'; // Recupera el estado de mute de localStorage

// Variables para el movimiento del personaje en el mapa
const mapContainer = document.getElementById('mapa-proyectos');
const mapCharacter = document.getElementById('map-character'); // Ahora es un <img>
const moveStep = 10; // Cantidad de píxeles que se mueve el personaje por pulsación (AJUSTA ESTE VALOR)
let activeMarker = null; // Variable para rastrear el marcador que está cerca del personaje


// Imágenes del personaje en diferentes direcciones
const characterImages = {
    front: '../misc/img/animaiton/front.png', // Personaje mirando al frente (idle, y al mover abajo)
    back: '../misc/img/animaiton/back.png', // Personaje mirando hacia atrás (al mover arriba)
    right: '../misc/img/animaiton/right.png', // Personaje mirando hacia la derecha (al mover derecha)
    left: '../misc/img/animaiton/left.png' // Personaje mirando hacia la izquierda (al mover izquierda, usando la imagen de la derecha y volteando)
};

// Variable para saber hacia dónde mira el personaje (front, back, right, left)
let currentDirection = 'front'; // Por defecto, mira hacia el frente

// --- Esperar a que el DOM esté completamente cargado ---
document.addEventListener('DOMContentLoaded', function () {

    // --- Funcionalidad del Modal de Proyectos ---
    closeButton.addEventListener('click', function () {
        proyectoModal.style.display = "none";
    });

    window.addEventListener('click', function (event) {
        if (event.target == proyectoModal) {
            proyectoModal.style.display = "none";
        }
    });

    const proyectoModalContent = document.querySelector('.modal-content');
    const maximizeButton = document.querySelector('.maximize-button');
    let modalIsFullscreen = false;
    let modalOriginalStyles = {};

    if (maximizeButton && proyectoModalContent) {
        maximizeButton.addEventListener('click', function () {
            modalIsFullscreen = !modalIsFullscreen;

            if (modalIsFullscreen) {
                if (Object.keys(modalOriginalStyles).length === 0) {
                    modalOriginalStyles = {
                        width: proyectoModalContent.style.width,
                        maxWidth: proyectoModalContent.style.maxWidth,
                        height: proyectoModalContent.style.height,
                        maxHeight: proyectoModalContent.style.maxHeight,
                        margin: proyectoModalContent.style.margin
                    };
                }
                proyectoModalContent.style.position = 'fixed';
                proyectoModalContent.style.top = '0';
                proyectoModalContent.style.left = '0';
                proyectoModalContent.style.width = '100%';
                proyectoModalContent.style.maxWidth = '100%';
                proyectoModalContent.style.height = '100vh';
                proyectoModalContent.style.maxHeight = '100vh';
                proyectoModalContent.style.margin = '0';
            } else {
                proyectoModalContent.style.position = 'relative';
                proyectoModalContent.style.width = modalOriginalStyles.width || '80%';
                proyectoModalContent.style.maxWidth = modalOriginalStyles.maxWidth || '600px';
                proyectoModalContent.style.height = modalOriginalStyles.height || 'auto';
                proyectoModalContent.style.maxHeight = modalOriginalStyles.maxHeight || '90vh';
                proyectoModalContent.style.margin = modalOriginalStyles.margin || '15% auto';
            }
        });
    }

    const scrollUpArrow = document.getElementById('scrollUpArrow');
    if (scrollUpArrow) {
        scrollUpArrow.addEventListener('click', function () {
            const nav = document.querySelector('nav');
            if (nav) {
                nav.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Inicialización de Parallax (asegúrate de que la librería Parallax.js esté cargada en tu HTML)
    var scene = document.getElementById('scene');
    var text = document.getElementById('text');
    if (scene && typeof Parallax !== 'undefined') {
        let parallaxInstanceScene = new Parallax(scene);
    }
    if (text && typeof Parallax !== 'undefined') {
        let parallaxInstanceText = new Parallax(text);
    }


    // --- Funcionalidad del Tutorial y Audio ---
    function setMusicMuteState(audioElement, play) {
        if (!audioElement) return;

        if (play) {
            if (!isMusicMuted) {
                audioElement.play().catch(e => console.warn("Error al reproducir audio:", e));
            }
        } else {
            audioElement.pause();
        }
    }

    function updateMusicToggleButton() {
        if (!musicToggleButton) return;
        if (isMusicMuted) {
            musicToggleButton.classList.add('is-muted');
            musicToggleButton.querySelector('span').textContent = '🔇';
        } else {
            musicToggleButton.classList.remove('is-muted');
            musicToggleButton.querySelector('span').textContent = '🎵';
        }
    }

    function closeTutorial() {
        if (tutorialOverlay) tutorialOverlay.classList.remove('is-visible');
        if (tutorialModal) tutorialModal.classList.remove('is-visible');
        setMusicMuteState(modalMusic, false);
        setMusicMuteState(backgroundCalmMusic, true);
}

    // Lógica del Tutorial
    function showTutorial() {
        if (!tutorialOverlay || !tutorialModal || !tutorialMessageElement) {
            console.warn('Elementos del tutorial no encontrados. El tutorial no se mostrará.');
            return;
        }
        tutorialOverlay.classList.add('is-visible');
        tutorialModal.classList.add('is-visible');
        typeMessage(tutorialMessages[currentMessageIndex]);

        setMusicMuteState(backgroundCalmMusic, false);
        setMusicMuteState(modalMusic, true);
    }
    // Función para escribir el mensaje del tutorial letra por letra
    function typeMessage(message) {
        if (!tutorialMessageElement) return;
        tutorialMessageElement.textContent = '';
        let i = 0;
        const typingInterval = setInterval(() => { 
            if (i < message.length) {
                tutorialMessageElement.textContent += message.charAt(i); //
                if (typingSound) {
                    typingSound.currentTime = 0;
                    typingSound.play().catch(e => {}); // Manejar error de reproducción
                }
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, typingSpeed);
    }
    // Función para avanzar al siguiente paso del tutorial
    function nextTutorialStep() {
        currentMessageIndex++;
        if (currentMessageIndex < tutorialMessages.length) {
            typeMessage(tutorialMessages[currentMessageIndex]);
        } else {
            closeTutorial();

            
        }
    }

    // Lógica del Botón de Música
    if (musicToggleButton) {
        musicToggleButton.addEventListener('click', function () {
            isMusicMuted = !isMusicMuted; 
            localStorage.setItem('isMusicMuted', isMusicMuted);
            updateMusicToggleButton();

            if (isMusicMuted) {
                setMusicMuteState(modalMusic, false);
                setMusicMuteState(backgroundCalmMusic, false);
            } else {
                if (tutorialModal && tutorialModal.classList.contains('is-visible')) {
                    setMusicMuteState(modalMusic, true);
                } else {
                    setMusicMuteState(backgroundCalmMusic, true);
                }
            }
        });
    }

    // Inicialización de Audio al Cargar la Página
    if (modalMusic) {
        modalMusic.volume = 0.6;
    }
    if (backgroundCalmMusic) {
        backgroundCalmMusic.volume = 0.4;
    }

    updateMusicToggleButton(); // Actualizar el icono del botón según el estado inicial

    // Mostrar tutorial al cargar la página de Proyectos (si los elementos existen)
    if (tutorialOverlay && tutorialModal && tutorialMessageElement) {
        showTutorial();
    }

    if (tutorialNextButton) {
        tutorialNextButton.addEventListener('click', nextTutorialStep);
    }
    if (tutorialCloseButton) {
        tutorialCloseButton.addEventListener('click', closeTutorial);
    }

    // --- INICIO: Lógica de Movimiento del Personaje en el Mapa y Detección de Proximidad  ---

    // Verificar que los elementos del mapa y personaje existen
    if (!mapContainer || !mapCharacter) {
        console.warn('Elementos del mapa o personaje no encontrados. El movimiento del personaje no funcionará.');
    } else {
        // --- FUNCIÓN: applyIdlePose (Ajusta la imagen y orientación según la dirección actual) ---
        function applyIdlePose() {
            

            switch (currentDirection) {
                case 'front': // Si la última dirección fue frente o abajo
                case 'down':
                    mapCharacter.src = characterImages.front;
                    break;
                case 'back': // Si la última dirección fue atrás o arriba
                case 'up':
                    mapCharacter.src = characterImages.back;
                    break;
                case 'right': // Si la última dirección fue derecha
                    mapCharacter.src = characterImages.right;
                    break;
                case 'left': // Si la última dirección fue izquierda, usamos la imagen de la derecha y la volteamos
                    mapCharacter.src = characterImages.left;
                    break;
            }
        }

        //obtener la distancia entre dos puntos
        function getDistance(x1, y1, x2, y2) {
            const dx = x1 - x2;
            const dy = y1 - y2; 
            return Math.sqrt(dx * dx + dy * dy);
        }

        // --- FUNCIÓN: updateActiveMarker (Actualiza el marcador activo según la proximidad al personaje) ---
        // Esta función se llama cada vez que el personaje se mueve para actualizar el marcador activo
        function updateActiveMarker() {
            const characterRect = mapCharacter.getBoundingClientRect();
            const characterCenterX = characterRect.left + characterRect.width / 2;
            const characterCenterY = characterRect.top + characterRect.height / 2;

            const proximityThreshold = 50;

            let closestMarker = null;
            let minDistance = Infinity;

            projectMarkers.forEach(marker => {
                const markerRect = marker.getBoundingClientRect();
                const markerCenterX = markerRect.left + markerRect.width / 2;
                const markerCenterY = markerRect.top + markerRect.height / 2;

                const distance = getDistance(characterCenterX, characterCenterY, markerCenterX, markerCenterY);

                if (distance < proximityThreshold) {
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestMarker = marker;
                    }
                }
            });

            if (closestMarker !== activeMarker) {
                if (activeMarker) {
                    activeMarker.classList.remove('is-active');
                }
                if (closestMarker) {
                    closestMarker.classList.add('is-active');
                }
                activeMarker = closestMarker;
            }
        }

        // --- Manejador del Evento Keydown (MODIFICADO para cambiar src y transform) ---
        window.addEventListener('keydown', (event) => {
            const controllableKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'];
            if (controllableKeys.includes(event.code)) {
                event.preventDefault();
            } else {
                return;
            }

            if (proyectoModal.style.display === 'block' || (tutorialModal && tutorialModal.classList.contains('is-visible'))) {
                return;
            }

            // --- Lógica para manejar la tecla Espacio ---
            if (event.code === 'Space') {
                if (activeMarker) {
                    const proyectoId = activeMarker.dataset.proyecto;
                    openProjectModal(proyectoId);
                }
                applyIdlePose(); // Asegurarse de que esté en pose estática al abrir modal
                return;
            }

            // --- Lógica de Movimiento y Cambio de Pose para las Flechas ---
            let currentTop = parseInt(mapCharacter.style.top) || 0;
            let currentLeft = parseInt(mapCharacter.style.left) || 0;
            let moved = false;
            let newDirection = currentDirection; // Almacena la dirección para actualizar 'currentDirection'



            switch (event.code) {
                case 'ArrowUp':
                    currentTop -= moveStep;
                    newDirection = 'up';
                    mapCharacter.src = characterImages.back; // Imagen de espalda
                    mapCharacter.style.transform = 'scaleX(1)'; // Reiniciar cualquier volteo
                    moved = true;
                    break;
                case 'ArrowDown':
                    currentTop += moveStep;
                    newDirection = 'down';
                    mapCharacter.src = characterImages.front; // Imagen de frente
                    mapCharacter.style.transform = 'scaleX(1)'; // Reiniciar cualquier volteo
                    moved = true;
                    break;
                case 'ArrowLeft':
                    currentLeft -= moveStep;
                    newDirection = 'left';
                    mapCharacter.src = characterImages.left; // Usar imagen de la derecha
                    mapCharacter.style.transform = 'scaleX(1)'; // Voltear a la izquierda
                    moved = true;
                    break;
                case 'ArrowRight':
                    currentLeft += moveStep;
                    newDirection = 'right';
                    mapCharacter.src = characterImages.right; // Imagen de derecha
                    mapCharacter.style.transform = 'scaleX(1)'; // Reiniciar cualquier volteo
                    moved = true;
                    break;
            }

            if (!moved) {
                return;
            }

            if (footStepSound) { // Solo si la música no está silenciada y el sonido existe
                footStepSound.currentTime = 0; // Reiniciar el sonido para que se pueda reproducir rápidamente
                footStepSound.play().catch(e => {}); // Manejar error de reproducción (ej. si el navegador lo bloquea)
            }

            currentDirection = newDirection; // Actualizar la dirección actual del personaje

            // --- Verificar límites del mapa ---
            const characterBounds = mapCharacter.getBoundingClientRect();
            const maxLeft = mapContainer.offsetWidth - characterBounds.width;
            const maxTop = mapContainer.offsetHeight - characterBounds.height;

            currentLeft = Math.max(0, Math.min(currentLeft, maxLeft));
            currentTop = Math.max(0, Math.min(currentTop, maxTop));

            mapCharacter.style.top = currentTop + 'px';
            mapCharacter.style.left = currentLeft + 'px';

            updateActiveMarker(); // Actualizar el marcador activo después del movimiento
        });

        // --- Manejador del Evento Keyup (Para establecer la pose estática al soltar la tecla) ---
        window.addEventListener('keyup', (event) => {
            const controllableKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
            if (controllableKeys.includes(event.code)) {
                applyIdlePose(); // Volver a la pose estática de la dirección actual
            }
        });

        // Llamar a updateActiveMarker y applyIdlePose una vez al cargar la página para establecer el estado inicial
        updateActiveMarker();
        applyIdlePose();
    } // Fin del if que verifica si mapContainer y mapCharacter existen

    // --- Función para abrir el modal de proyecto (ya existente) ---
    function openProjectModal(proyectoId) {
        const proyecto = proyectosData.find(p => p.id === proyectoId);

        if (proyecto) {
            modalProyectoTitulo.textContent = proyecto.titulo;
            modalProyectoIframe.src = proyecto.archivoHTML;
            proyectoModal.style.display = "block";
            setMusicMuteState(backgroundCalmMusic, false);
            setMusicMuteState(modalMusic, true);
        } else {
            console.warn('No se encontró información para el proyecto con id:', proyectoId);
        }
    }

});