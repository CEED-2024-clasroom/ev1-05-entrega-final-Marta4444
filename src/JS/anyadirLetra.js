function anyadirLetra(divARevelar, desplazamiento, game) {
    //A partir del atributo grid-area se obtiene la posicion del div seleccionado de manera aleatoria.
    const gridArea = divARevelar.style.gridArea;

    const posicion = gridArea.split(" / "); //Para obtener la posicion en formato [x, y] desde el atributo grid-area.

    //grid-area tiene formato fila/columna, pero letterAt espera (columna, fila).
    const columna = parseInt(posicion[1], 10) - 1; //-1 porque gridArea empieza en 1, pero las letras del juego empiezan en 0.
    const fila = parseInt(posicion[0], 10) - 1; //El 10 es indica a parseInt que lo debe convertir a un numero de base 10.

    const posicionAntesDeCentrar = [columna - desplazamiento[0], fila - desplazamiento[1]]; //se le restan las posiciones desplazadas para centrar las letras.

    const letra = game.letterAt(posicionAntesDeCentrar[0], posicionAntesDeCentrar[1]); //se obtiene la letra de esa posicion.

    divARevelar.textContent = letra; //Se añade la letra al div vacio.
}

export { anyadirLetra }