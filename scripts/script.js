document.addEventListener('DOMContentLoaded', () => {
    const scene = document.getElementById('scene');
    const text = document.getElementById('text');

    // Inicializar Parallax solo si los elementos existen
    if (scene) new Parallax(scene);
    if (text) new Parallax(text);

    const scrollUpArrow = document.getElementById('scrollUpArrow');
    if (scrollUpArrow) {
        scrollUpArrow.addEventListener('click', () => {
            const nav = document.querySelector('nav');
            if (nav) nav.scrollIntoView({ behavior: 'smooth' });
        });
    }

    let cardVolteada = null;

    // Función genérica para voltear una tarjeta
    const voltearTarjeta = (tarjeta) => {
        if (!tarjeta.classList.contains('card')) return;

        if (cardVolteada && cardVolteada !== tarjeta) {
            cardVolteada.classList.remove('is-flipped');
        }

        tarjeta.classList.toggle('is-flipped');
        cardVolteada = tarjeta.classList.contains('is-flipped') ? tarjeta : null;
    };

    // Función para asignar evento a enlaces y tarjetas
    const asignarEvento = (enlaceId, tarjetaId) => {
        const enlace = document.getElementById(enlaceId);
        const tarjeta = document.getElementById(tarjetaId);

        if (enlace && tarjeta) {
            enlace.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelector('main.content')?.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => voltearTarjeta(tarjeta), 500);
            });
        }
    };

    // Asignación de eventos a secciones
    asignarEvento('enlace-sobre-mi', 'sobre-mi-card');
    asignarEvento('enlace-habilidades', 'habilidades-card');
    asignarEvento('enlace-experiencia', 'experiencia-card');

    // Evento directo en las tarjetas
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => voltearTarjeta(card));
    });
});
