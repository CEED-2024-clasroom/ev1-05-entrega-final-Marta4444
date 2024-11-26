function mezclarPosiciones(posiciones) {
    for (let i = posiciones.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [posiciones[i], posiciones[j]] = [posiciones[j], posiciones[i]]; // Intercambia las posiciones
        /*j tendrá valor entre 0 e i (posicion de la letra en el array). Luego se intercambia la letra en la posicion i por la que ocupa la posicion j.
        Ejemplo: array = [A, E, R, B]. Si j = 2 e i=3, el resultado será array=[A, E, B, R], y así hasta mover todas las posiciones.
        */
    }
    return posiciones;
    //devuelve [{x, y}, {x, y}, {x, y}]. Cada {x, y} corresponde a una letra.
}

function actualizarPosiciones(posiciones) {
    const divsRueda = document.querySelectorAll(".wheel-letter");

    divsRueda.forEach((divsRueda, i) => {
        const { left, top } = posiciones[i];
        divsRueda.style = `left: ${left}; top: ${top}`;
    });
}

function mezclarLetras(posiciones){
    const posicionesMezcladas = mezclarPosiciones([...posiciones]);
    actualizarPosiciones(posicionesMezcladas);
}

function ayudaBotonShuffle(posicionesLetras){
    const botonesAyuda = document.querySelectorAll(".tool"); //Seleccionar botones de ayuda, todos.
    const botonMezcla = botonesAyuda[0];
    const funcionMezclarLetras = () => mezclarLetras(posicionesLetras); //Necesario guardar la referencia a la funcion para pasarla al eventListener.
    botonMezcla.addEventListener("click", funcionMezclarLetras);
}

export { ayudaBotonShuffle }