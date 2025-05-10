const track = document.getElementById('image-track'); //creamos una variable para el track de las imagenes

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX; // aqui guardamos la posición del mouse al hacer click en el track
}

window.onmousemove = e => { // cuando el mouse se mueve
    if (track.dataset.mouseDownAt === "0") return; 

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX; // calculamos la diferencia entre la posición del mouse al hacer click y la posición actual del mouse
    const maxDelta = window.innerWidth / 2; // calculamos el máximo de diferencia que puede haber
    const percentage = (mouseDelta / maxDelta) * -100; // calculamos el porcentaje de diferencia

    
    const nextPercentage = Math.min(Math.max(parseFloat(track.dataset.prevPercentage) + percentage, -100), 0);  // calculamos el siguiente porcentaje de diferencia, asegurándonos de que no sea mayor a 0 ni menor a -100
    track.dataset.percentage = nextPercentage; // guardamos el porcentaje de diferencia

    console.log("mouseDelta: " + mouseDelta);
    console.log("percentage: " + percentage);

    track.style.transform = `translate(${nextPercentage}%, -50%)`; // movemos el track según el porcentaje de diferencia
    for (const image of track.getElementsByClassName("image")) {
        image.style.objectPosition = `${nextPercentage +100}% 50%`; // movemos las imágenes según el porcentaje de diferencia
        image.animate({
            objectPosition: `${100 + nextPercentage}% center` // animamos el movimiento de las imágenes para que sea más suave
        }, {
            duration: 1500,
            fill: "forwards"
        });
    }
    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, {
        duration: 1500,
        fill: "forwards"
    });
    
}

window.onmouseup = e => {
    track.dataset.mouseDownAt = "0"; // reseteamos la posición del mouse al hacer click
    track.dataset.prevPercentage = track.dataset.percentage; // guardamos el porcentaje de diferencia
}