console.log("scrip funcionando");
let prev = document.querySelector('.prev'); //Aqui coje al primer elemento que encuentra con este identificador. 
let next = document.querySelector('.next'); //y aqui hace lo mismo pero el primero con el elemento next 
console.log("prev: ", prev);
console.log("next", next);

next.addEventListener('click', function() {
    let items = document.querySelectorAll('.item'); //te va a devolver un array con todos los elementos de la clase item.
    document.querySelector('.slide').appendChild(items[0])
    console.log("derecha")}
);

prev.addEventListener('click', function() {
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').insertBefore(items[items.length - 1], items[0])
});