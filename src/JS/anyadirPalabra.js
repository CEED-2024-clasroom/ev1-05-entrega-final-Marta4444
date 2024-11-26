
import { WordNotFound } from "../lib/Game";

function obtenerCoordenadas(posicion, movimiento, direccion) {
    if (direccion === 'vertical') {
        return [posicion[1] + movimiento, posicion[0]];
    } else {
        return [posicion[1], posicion[0] + movimiento];
    }
}

function colocarLetraEnPosicion(fila, columna, letra) {
    //Se selecciona el div que corresponde a la letra y se añade la letra dentro.
    let div = document.querySelector(`.letter[style*="grid-area: ${fila + 1} / ${columna + 1};"]`); //+1 porque gridArea empieza en el 1, no en 0.
    if (div) { //se ejecuta solo si ese div existe y se ha seleccionado.
        div.textContent = letra;
    }
}

function colocarPalabraEnDireccion(palabraFinal, posicion, direccion) {
    //Va colocando las letras de la palabra. Va seleccionando el div correspondiente, avanzando por el tablero y en las letras de la palabra.
    for (let i = 0; i < palabraFinal.length; i++) {
        let [fila, columna] = obtenerCoordenadas(posicion, i, direccion);
        colocarLetraEnPosicion(fila, columna, palabraFinal.charAt(i));
    }
}

function buscarPalabra(palabraFinal, game) {

    if (palabraFinal === "") {
        return; //si no se han seleccionado letras, no hace nada.
    }

    let posicionPalabraSeleccionada;

    try{
        posicionPalabraSeleccionada = game.findWord(palabraFinal); 
    //devuelve un objeto con { origin: [x, y], direction: 'vertical'/'horizontal'}.

    } catch (error) {
        if (error instanceof WordNotFound) {
            console.error(error.message); //lanza un mensaje por consola: "La palabra xxx no está en el juego ID_juego".
            return; //para que no ejecute el resto del código de la función si falla.
        }
    }
    return posicionPalabraSeleccionada;
}

function centrarPalabraYAnyadir(posicionPalabraSeleccionada, desplazamiento, palabraFinal){
    //Centrar la palabra, usando la variable desplazamiento obtenida al principio de la función centrar()
    const palabraSeleccionadaCentrada = [
        posicionPalabraSeleccionada.origin[0] + desplazamiento[0],
        posicionPalabraSeleccionada.origin[1] + desplazamiento[1]
    ];

    if (posicionPalabraSeleccionada.direction === 'vertical') {
        colocarPalabraEnDireccion(palabraFinal, palabraSeleccionadaCentrada, 'vertical');
    } else if (posicionPalabraSeleccionada.direction === 'horizontal') {
        colocarPalabraEnDireccion(palabraFinal, palabraSeleccionadaCentrada, 'horizontal');
    }
}

export { buscarPalabra, centrarPalabraYAnyadir }