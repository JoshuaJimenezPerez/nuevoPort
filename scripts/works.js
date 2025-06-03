const proyectosData = [
    {
        id: 'Hyperplexed Pixar',
        titulo: 'Hyperplexed Pixar Project',
        enlaceCodigo: '#hyperplexed-pixar-codigo',
        archivoHTML: 'proyectos/Hyperplexed Pixar/home.html'
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
// Variables para el Modal

const proyectoModal = document.getElementById('proyectoModal');
const modalProyectoTitulo = document.getElementById('modal-proyecto-titulo');
const modalProyectoIframe = document.getElementById('modal-proyecto-iframe');
const closeButton = document.querySelector('.close-button');
const projectMarkers = document.querySelectorAll('.project-marker');


document.addEventListener('DOMContentLoaded', function () {

    // --- Funcionalidad para Proyectos/Modal ---
    projectMarkers.forEach(marker => {
        marker.addEventListener('click', function () {
            const proyectoId = this.dataset.proyecto;
            const proyecto = proyectosData.find(p => p.id === proyectoId);

            if (proyecto) {
                modalProyectoTitulo.textContent = proyecto.titulo;
                modalProyectoIframe.src = proyecto.archivoHTML;
                proyectoModal.style.display = "block";
            } else {
                console.warn('No se encontró información para el proyecto con id:', proyectoId);
            }
        });
    });

    closeButton.addEventListener('click', function () {
        proyectoModal.style.display = "none";
    });

    window.addEventListener('click', function (event) {
        if (event.target == proyectoModal) {
            proyectoModal.style.display = "none";
        }
    })

    const proyectoModalContent = document.querySelector('.modal-content');
    const maximizeButton = document.querySelector('.maximize-button');
    let modalIsFullscreen = false;
    let modalOriginalStyles = {};

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

    const scrollUpArrow = document.getElementById('scrollUpArrow');
    scrollUpArrow.addEventListener('click', function () {
        const nav = document.querySelector('nav');
        nav.scrollIntoView({ behavior: 'smooth' });
    });

    var scene = document.getElementById('scene');
    var text = document.getElementById('text');

    let parallaxInstanceScene = new Parallax(scene);
    let parallaxInstanceText = new Parallax(text);


    // --- INICIO: Funcionalidad del Tutorial y Audio ---
    const tutorialOverlay = document.getElementById('tutorial-overlay');
    const tutorialModal = document.getElementById('tutorial-modal');
    const tutorialMessageElement = tutorialModal.querySelector('.tutorial-message');
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
    let isMusicMuted = localStorage.getItem('isMusicMuted') === 'true'; // Recupera el estado de mute de localStorage

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
        tutorialOverlay.classList.add('is-visible');
        tutorialModal.classList.add('is-visible');
        typeMessage(tutorialMessages[currentMessageIndex]);

        setMusicMuteState(backgroundCalmMusic, false);
        setMusicMuteState(modalMusic, true);
    }

    function typeMessage(message) {
        tutorialMessageElement.textContent = '';
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < message.length) {
                tutorialMessageElement.textContent += message.charAt(i);
                if (typingSound) {
                    typingSound.currentTime = 0;
                    typingSound.play().catch(e => {});
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
            tutorialOverlay.classList.remove('is-visible');
            tutorialModal.classList.remove('is-visible');

            setMusicMuteState(modalMusic, false);
            setMusicMuteState(backgroundCalmMusic, true);
        }
    }

    // Lógica del Botón de Música
    musicToggleButton.addEventListener('click', function () {
        isMusicMuted = !isMusicMuted;
        localStorage.setItem('isMusicMuted', isMusicMuted);
        updateMusicToggleButton();

        if (isMusicMuted) {
            setMusicMuteState(modalMusic, false);
            setMusicMuteState(backgroundCalmMusic, false);
        } else {
            if (tutorialModal.classList.contains('is-visible')) {
                setMusicMuteState(modalMusic, true);
            } else {
                setMusicMuteState(backgroundCalmMusic, true);
            }
        }
    });

    // Inicialización al Cargar la Página
    if (modalMusic) {
        modalMusic.volume = 0.6;
    }
    if (backgroundCalmMusic) {
        backgroundCalmMusic.volume = 0.4;
    }

    updateMusicToggleButton(); // Actualizar el icono del botón según el estado inicial

    showTutorial(); // Mostrar tutorial al cargar la página de Proyectos

    tutorialNextButton.addEventListener('click', nextTutorialStep); // Event Listener para el botón "Entendido"

    // Inicio de movimientos de personaje

    const mapContainer = document.getElementById('mapa-proyectos');
    const mapCharacter = document.getElementById('map-character');
    let activeMarker = null; //variable de marcador activo.


    //verificar que existen 
    if(!mapContainer || !mapCharacter) {
        console.warn('Elementos del mapa no encontrados');
        return;
    }
    const moveStep = 5; // Número de píxeles a mover en cada paso

    window.addEventListener('keydown', (event) => {
    console.log('tecla presionada:', event.key, 'Code', event.code);

    

        let currentTop = parseInt(mapCharacter.style.top) || 0;
        let currentLeft = parseInt(mapCharacter.style.left) || 0;
        if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.code)) {
            event.preventDefault();
        }
        //determinar la direccion del movimiento basado en la tecla presionada
        switch (event.code) {
            case 'ArrowUp':
                currentTop -= moveStep;
                break;
            case 'ArrowDown':
                currentTop += moveStep;
                break;
            case 'ArrowLeft': 
                currentLeft -= moveStep;
                break;
            case 'ArrowRight':
                currentLeft += moveStep;
                break;
        }
        // Limitar el movimiento dentro del contenedor
        const mapRect = mapContainer.getBoundingClientRect();
        const characterRect = mapCharacter.getBoundingClientRect();
        const maxLeft = mapContainer.offsetWidth - characterRect.width;
        const maxTop = mapContainer.offsetHeight - characterRect.height;
        
        currentLeft = Math.max(0, Math.min(currentLeft, maxLeft));
        currentTop = Math.max(0, Math.min(currentTop, maxTop));

        mapCharacter.style.left = currentLeft + 'px';
        mapCharacter.style.top = currentTop + 'px';
    });
    //funcion para calcular la distancia entre dos puntos
    function getDistance(x1, y1, x2, y2) {
        const dx = x1 - x2;
        const dy = y1 - y2;

        return Math.sqrt(dx * dx + dy * dy);      
    }
    //verificamos la proximidad con los marcadores 
    function updateActiveMarker(){
        if(!mapCharacter || !projectMarkers) {
            console.warn('Elementos del mapa no encontrados');
            activeMarker = null;
            return;
        }
        const characterRect = mapCharacter.getBoundingClientRect(); //posicion del personaje
        //calcular el centro del personaje 
        const characterCenterX = characterRect.left + (characterRect.width / 2);
        const characterCenterY = characterRect.top + (characterRect.height / 2);

        const proximityThreshold = 60; // Distancia mínima.

        let closestMarker = null;
        let minDistance = Infinity;

        projectMarkers.forEach(marker => {
            const markerRect = marker.getBoundingClientRect(); //posicion del marcador
            //calcular el centro del marcador
            const markerCenterX = markerRect.left + (markerRect.width / 2);
            const markerCenterY = markerRect.top + (markerRect.height / 2);

            const distance = getDistance(characterCenterX, characterCenterY, markerCenterX, markerCenterY);

            if (distance < proximityThreshold) {
                minDistance = distance;
                closestMarker = marker;
            }
        });
        //actualizamos el marcador activo
        if( closestMarker !== activeMarker) {  //si el marcador activo es diferente al marcador más cercano
            if (activeMarker) {
                activeMarker.classList.remove('is-active');
                console.log('Marcador Inactivo:', activeMarker.id);
            }
            if (closestMarker){
                closestMarker.classList.add('is-active');
                console.log('Marcador Activo:', closestMarker.id);
            }
            //actualizamos el marcador activo
            activeMarker = closestMarker;
        }
    }
})
