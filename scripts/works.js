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


const proyectoModal = document.getElementById('proyectoModal');
const modalProyectoTitulo = document.getElementById('modal-proyecto-titulo');
const modalProyectoIframe = document.getElementById('modal-proyecto-iframe');
const closeButton = document.querySelector('.close-button');
const projectMarkers = document.querySelectorAll('.project-marker');

document.addEventListener('DOMContentLoaded', function () {
    projectMarkers.forEach(marker => {
        marker.addEventListener('click', function () {
            const proyectoId = this.dataset.proyecto;
            const proyecto = proyectosData.find(p => p.id === proyectoId);

            if (proyecto) {
                
                // --- Actualizar la modal con la información del proyecto ---
                modalProyectoTitulo.textContent = proyecto.titulo;
                modalProyectoIframe.src = proyecto.archivoHTML;

                proyectoModal.style.display = "block";

            } else {
                console.warn('No se encontró información para el proyecto con id:', proyectoId);
            }
        });
    });

    // --- Funcionalidad para cerrar la modal ---

    // Cerrar la modal al hacer clic en el botón de cerrar (la "X")
    closeButton.addEventListener('click', function () {
        proyectoModal.style.display = "none";
    });

    // Cerrar la modal al hacer clic FUERA de la modal (en el fondo oscuro)
    window.addEventListener('click', function (event) {
        if (event.target == proyectoModal) {
            proyectoModal.style.display = "none";
        }
    })

    // --- Funcionalidad del Botón de Maximizar (Pantalla Completa) ---
    const proyectoModalContent = document.querySelector('.modal-content');
    const maximizeButton = document.querySelector('.maximize-button');
    let modalIsFullscreen = false;
    let modalOriginalStyles = {};

    maximizeButton.addEventListener('click', function () {
        modalIsFullscreen = !modalIsFullscreen;

        if (modalIsFullscreen) {
            // --- Maximizar a pantalla completa ---

            if (Object.keys(modalOriginalStyles).length === 0) {
                modalOriginalStyles = {
                    width: proyectoModalContent.style.width,
                    maxWidth: proyectoModalContent.style.maxWidth,
                    height: proyectoModalContent.style.height,
                    maxHeight: proyectoModalContent.style.maxHeight,
                    margin: proyectoModalContent.style.margin
                };
            }

            // Aplicar estilos de pantalla completa
            proyectoModalContent.style.position = 'fixed';
            proyectoModalContent.style.top = '0';
            proyectoModalContent.style.left = '0';
            proyectoModalContent.style.width = '100%';
            proyectoModalContent.style.maxWidth = '100%';
            proyectoModalContent.style.height = '100vh';
            proyectoModalContent.style.maxHeight = '100vh';
            proyectoModalContent.style.margin = '0';


        } else {
            // --- Minimizar a tamaño normal ---
            // Restaurar los estilos originales guardados
            proyectoModalContent.style.position = 'relative';
            proyectoModalContent.style.width = modalOriginalStyles.width || '80%';
            proyectoModalContent.style.maxWidth = modalOriginalStyles.maxWidth || '600px';
            proyectoModalContent.style.height = modalOriginalStyles.height || 'auto';
            proyectoModalContent.style.maxHeight = modalOriginalStyles.maxHeight || '90vh';
            proyectoModalContent.style.margin = modalOriginalStyles.margin || '15% auto';
        }
    });

    // Selecciona la flecha para subir
    const scrollUpArrow = document.getElementById('scrollUpArrow');


    // Agrega un evento de clic a la flecha para subir
    scrollUpArrow.addEventListener('click', function () {
        // Selecciona el header
        const nav = document.querySelector('nav');

        // Desplazamiento suave hacia el header
        nav.scrollIntoView({ behavior: 'smooth' });
    });

    var scene = document.getElementById('scene');
    var text = document.getElementById('text');

    let parallaxInstanceScene = new Parallax(scene);
    let parallaxInstanceText = new Parallax(text);


})

//funcion del tutorial del personaje    
document.addEventListener('DOMContentLoaded', function() {
    const tutorialOverlay = document.getElementById('tutorial-overlay');
    const tutorialModal = document.getElementById('tutorial-modal');
    const tutorialMessageElement = tutorialModal.querySelector('.tutorial-message');
    const tutorialNextButton = document.getElementById('tutorial-next-button');

    // Array de mensajes del tutorial
    const tutorialMessages = [
        "¡Hola, explorador! Soy Joshua, tu guía en este viaje digital.",
        "Aquí verás el recorrido de mis proyectos, como si fuera un mapa de un gran mundo.",
        "Cada punto en el mapa es un proyecto, ¡un hito en mi aventura!",
        "Haz clic en los puntos para descubrir más sobre mis trabajos y las tecnologías que usé.",
        "¡Mucha suerte en tu exploración! ¡A la aventura!"
    ];

    let currentMessageIndex = 0; // Índice del mensaje actual
    let typingSpeed = 50; // Velocidad de escritura en milisegundos

    // Función para mostrar el tutorial
    function showTutorial() {
        tutorialOverlay.classList.add('is-visible');
        tutorialModal.classList.add('is-visible');
        typeMessage(tutorialMessages[currentMessageIndex]);
    }

    // Función para escribir el mensaje con efecto de máquina de escribir
    function typeMessage(message) {
        tutorialMessageElement.textContent = ''; // Limpia el mensaje anterior
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < message.length) {
                tutorialMessageElement.textContent += message.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, typingSpeed);
    }

    // Función para avanzar o cerrar el tutorial
    function nextTutorialStep() {
        currentMessageIndex++;
        if (currentMessageIndex < tutorialMessages.length) {
            typeMessage(tutorialMessages[currentMessageIndex]);
        } else {
            // Último mensaje, cerrar el tutorial
            tutorialOverlay.classList.remove('is-visible');
            tutorialModal.classList.remove('is-visible');
            // Opcional: Eliminar los elementos del DOM si no se van a volver a usar
            // tutorialOverlay.remove();
            // tutorialModal.remove();
        }
    }

    // Event Listener para el botón "Entendido"
    tutorialNextButton.addEventListener('click', nextTutorialStep);

  
    // if (!sessionStorage.getItem('tutorialShown')) {
    //     showTutorial();
    //     sessionStorage.setItem('tutorialShown', 'true');
    // }

    // Por ahora, lo mostramos siempre al cargar la página de proyectos para probar
    showTutorial();

});