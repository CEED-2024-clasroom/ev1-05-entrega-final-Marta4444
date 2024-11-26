import { anyadirLetra } from "../JS/anyadirLetra";

function posicionesVacias() {
    const divsVacios = document.querySelectorAll(".letter:empty"); //Coge todos los divs vacios.
    return Array.from(divsVacios);
}

function ayudaBombilla(divsVacios, desplazamiento, game) {
    if (divsVacios.length === 0) {
        return;
    }
    const indice = Math.floor(Math.random() * divsVacios.length);

    const divSeleccionado = divsVacios.splice(indice, 1)[0]; //Devuelve un elemento aleatorio del array, y a la vez lo elimina del array. Así una vez se añada la letra ya no se puede volver a seleccionar para poner la letra.

    anyadirLetra(divSeleccionado, desplazamiento, game);
}

function revelarLetra(desplazamiento, game) {
    const divsSinLetra = posicionesVacias(); //Se obtiene el array de divs todavia vacios.
    ayudaBombilla(divsSinLetra, desplazamiento, game);
}

function revelar5Letras(desplazamiento, game) {
    const divsSinLetra = posicionesVacias();

    const cantidadARevelar = Math.min(5, divsSinLetra.length); // Selecciona el minimo entre 5 y el numero de divs vacios. Si hay menos de 5 divs vacios, selecciona los que hay.

    for (let i = 0; i < cantidadARevelar; i++) {
        revelarLetra(desplazamiento, game);
    }
}

function ayudaBotonBombillayDiana(desplazamiento, game){
    //Ayuda Bombilla (revelar 1 letra)
    const botonesAyuda = document.querySelectorAll(".tool"); 
    const botonBombilla = botonesAyuda[2]; 
    const funcionRevelarLetra = () => revelarLetra(desplazamiento, game);
    botonBombilla.addEventListener("click", funcionRevelarLetra);

    //Ayuda diana (revelar 5 letras)
    const botonDiana = botonesAyuda[1];
    const funcionRevelar5Letras = () => revelar5Letras(desplazamiento, game);
    botonDiana.addEventListener("click", funcionRevelar5Letras);
}

export { ayudaBotonBombillayDiana }