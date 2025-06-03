// works.js

// Datos de los proyectos 
const proyectosData = [
    {
        id: 'Hyperplexed Pixar',
        titulo: 'Hyperplexed Pixar Project',
        enlaceCodigo: '#hyperplexed-pixar-codigo',
        archivoHTML: '../proyectos/Hyperplexed Pixar/home.html' 
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
const typingSound = new Audio('../misc/sounds/Single Keys/keypress-015.wav');
typingSound.volume = 0.5;
const modalMusic = document.getElementById('modal-music');
const backgroundCalmMusic = document.getElementById('background-calm-music');
const musicToggleButton = document.getElementById('music-toggle-button');

const tutorialMessages = [
    "¡Hola, explorador! Soy Joshua, tu guía en este viaje digital.",
    "Aquí verás el recorrido de mis proyectos, como si fuera un mapa de un gran mundo.",
    "Cada punto en el mapa es un proyecto, ¡un hito en mi aventura!",
    "Haz clic en los puntos para descubrir más sobre mis trabajos y las tecnologías que usé.",
    "¡Mucha suerte en tu exploración! ¡A la aventura!"
];

let currentMessageIndex = 0;
let typingSpeed = 30; // Velocidad de escritura
let isMusicMuted = localStorage.getItem('isMusicMuted') === 'true'; 

// Variables para el movimiento del personaje en el mapa
const mapContainer = document.getElementById('mapa-proyectos');
const mapCharacter = document.getElementById('map-character');
const moveStep = 10; // Cantidad de píxeles que se mueve el personaje por pulsación 
let activeMarker = null; // Variable para rastrear el marcador que está cerca del personaje

// --- Esperar a que el DOM esté completamente cargado ---
document.addEventListener('DOMContentLoaded', function () {

    // --- Inicialización del Modal de Proyectos ---

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

    if (maximizeButton && proyectoModalContent) { // Asegurarse de que el botón y el contenido existan
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
    if (scrollUpArrow) { // Asegurarse de que la flecha exista
        scrollUpArrow.addEventListener('click', function () {
            const nav = document.querySelector('nav');
            if (nav) {
                nav.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Inicialización de Parallax 
    var scene = document.getElementById('scene');
    var text = document.getElementById('text');
    if (scene && typeof Parallax !== 'undefined') {
        let parallaxInstanceScene = new Parallax(scene);
    }
    if (text && typeof Parallax !== 'undefined') {
        let parallaxInstanceText = new Parallax(text);
    }


    // --- Funcionalidad del Tutorial y Audio ---

    // Funciones de Control de Audio
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

    function typeMessage(message) {
        if (!tutorialMessageElement) return;
        tutorialMessageElement.textContent = '';
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < message.length) {
                tutorialMessageElement.textContent += message.charAt(i);
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

    function nextTutorialStep() {
        currentMessageIndex++;
        if (currentMessageIndex < tutorialMessages.length) {
            typeMessage(tutorialMessages[currentMessageIndex]);
        } else {
            if (tutorialOverlay) tutorialOverlay.classList.remove('is-visible');
            if (tutorialModal) tutorialModal.classList.remove('is-visible');

            setMusicMuteState(modalMusic, false);
            setMusicMuteState(backgroundCalmMusic, true);
        }
    }

    // Lógica del Botón de Música
    if (musicToggleButton) { // Asegurarse de que el botón exista
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

    if (tutorialNextButton) { // Event Listener para el botón "Entendido"
        tutorialNextButton.addEventListener('click', nextTutorialStep);
    }

    // --- INICIO: Lógica de Movimiento del Personaje en el Mapa y Detección de Proximidad ---

    // Verificar que los elementos del mapa y personaje existen
    if (!mapContainer || !mapCharacter) {
        console.warn('Elementos del mapa o personaje no encontrados. El movimiento del personaje no funcionará.');
        // No se añade el event listener si los elementos principales no están.
    } else {
        // Función para calcular la distancia entre dos puntos
        function getDistance(x1, y1, x2, y2) {
            const dx = x1 - x2;
            const dy = y1 - y2;
            return Math.sqrt(dx * dx + dy * dy);
        }

        // Función para verificar la proximidad con los marcadores y actualizar el marcador activo
        function updateActiveMarker() {
            // Obtener la posición y tamaño actual del personaje en el viewport
            const characterRect = mapCharacter.getBoundingClientRect();
            const characterCenterX = characterRect.left + characterRect.width / 2;
            const characterCenterY = characterRect.top + characterRect.height / 2;

            
            const proximityThreshold = 50; // Umbral de proximidad en píxeles

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

            // Actualizar la clase 'is-active' en los marcadores
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

        // --- Manejador del Evento Keydown  ---
        window.addEventListener('keydown', (event) => {
             console.log('Tecla presionada:', event.key, 'Code:', event.code); // Para depuración

            // Prevenir el comportamiento por defecto de las flechas y espacio
            const controllableKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'];
            if (controllableKeys.includes(event.code)) {
                event.preventDefault(); // Detiene el scroll de la página y otras acciones por defecto
            } else {
                return; // Si la tecla no es una que controlamos, salir
            }

            // Bloquear movimiento/interacción si un modal está abierto
            if (proyectoModal.style.display === 'block' || (tutorialModal && tutorialModal.classList.contains('is-visible'))) {
                // console.log('Modal abierto, acción bloqueada.'); // Descomenta para depurar
                return;
            }

            // --- Lógica para manejar la tecla Espacio ---
            if (event.code === 'Space') {
                console.log('Espacio presionado.'); // Para depuración
                if (activeMarker) { // Si hay un marcador activo 
                    const proyectoId = activeMarker.dataset.proyecto; // Obtener el ID del proyecto
                    console.log('Intentando abrir modal para marcador activo:', activeMarker.id, 'Proyecto ID:', proyectoId); 
                    openProjectModal(proyectoId); // Llamar a la función para abrir el modal
                } else {
                    console.log('Espacio presionado, pero no hay marcador activo cercano.'); // Para depuración
                }
                return; // Salir después de manejar la barra espaciadora
            }

            // --- Lógica de Movimiento para las Flechas ---
            let currentTop = parseInt(mapCharacter.style.top) || 0;
            let currentLeft = parseInt(mapCharacter.style.left) || 0;
            let moved = false; 

            switch (event.code) {
                case 'ArrowUp':
                    currentTop -= moveStep;
                    moved = true;
                    break;
                case 'ArrowDown':
                    currentTop += moveStep;
                    moved = true;
                    break;
                case 'ArrowLeft':
                    currentLeft -= moveStep;
                    moved = true;
                    break;
                case 'ArrowRight':
                    currentLeft += moveStep;
                    moved = true;
                    break;
            }

            if (!moved) {
                return; // Si no se presionó una flecha, salir
            }

            // --- Verificar límites del mapa ---
            const mapBounds = mapContainer.getBoundingClientRect();
            const characterBounds = mapCharacter.getBoundingClientRect();

            // Calcular los límites máximos en píxeles relativos al contenedor del mapa
            // mapCharacter.style.top/left son relativos a mapContainer, por lo que usamos offsetWidth/Height de mapContaine
            const maxLeft = mapContainer.offsetWidth - characterBounds.width;
            const maxTop = mapContainer.offsetHeight - characterBounds.height;

            currentLeft = Math.max(0, Math.min(currentLeft, maxLeft));
            currentTop = Math.max(0, Math.min(currentTop, maxTop));

            // --- Actualizar la posición del personaje ---
            mapCharacter.style.top = currentTop + 'px';
            mapCharacter.style.left = currentLeft + 'px';

            // console.log(`Nueva posición: ${currentLeft}px (left), ${currentTop}px (top)`); // Para depuración

            // --- Llamar a la detección de proximidad después de cada movimiento ---
            updateActiveMarker();
        });

        // Llamar a updateActiveMarker una vez al cargar la página para establecer el estado inicial
        updateActiveMarker();
    } // Fin del if que verifica si mapContainer y mapCharacter existen

    // --- Función para abrir el modal de proyecto  ---
    function openProjectModal(proyectoId) {
        const proyecto = proyectosData.find(p => p.id === proyectoId);

        if (proyecto) {
            modalProyectoTitulo.textContent = proyecto.titulo;
            modalProyectoIframe.src = proyecto.archivoHTML;
            proyectoModal.style.display = "block";
            // Pausar música de fondo y activar música de modal si es necesario
            setMusicMuteState(backgroundCalmMusic, false);
            setMusicMuteState(modalMusic, true);
        } else {
            console.warn('No se encontró información para el proyecto con id:', proyectoId);
        }
    }

});