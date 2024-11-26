import center from '../lib/center.js';

function centrarPalabras(wordPositions, gridWidth, gridHeight) {

    let maxRow = 0;
    let maxColumn = 0;

    for (const { origin, direction, length } of wordPositions) {
        const [x, y] = origin;

        if (direction === 'horizontal') {
            maxRow = Math.max(maxRow, x + length - 1);
            maxColumn = Math.max(maxColumn, y);
        } else if (direction === 'vertical') {
            maxRow = Math.max(maxRow, x);
            maxColumn = Math.max(maxColumn, y + length - 1);
        }
    } //para obtener, sumando las longitudes de las palabras, la máxima fila y columna a la que llegaran las palabras. Necesario para usar los valores en la funcion center().

    let desplazamiento = center(maxRow, maxColumn, gridWidth, gridHeight); //devuelve un array, por ej, [2, 3], que indica las casillas a desplazar en cada dirección.

    return desplazamiento;
}

function crearTablero(wordPositions, desplazamiento) {
    const palabrasCentradas = wordPositions.map(({ origin, direction, length }) => {
        const [x, y] = origin;
        return {
            origin: [x + desplazamiento[0], y + desplazamiento[1]], //se suman las casillas a desplazar para centrarlo
            direction,
            length,
        };
    });

    const divPadre = document.getElementById("grid");
    const posicionesOcupadas = {}; //para letras compartidas por varias palabras

    palabrasCentradas.forEach(({ origin, direction, length }) => {
        const [x, y] = origin;

        for (let i = 0; i < length; i++) {
            const posX = (direction === 'horizontal') ? (x + i) : x;
            const posY = (direction === 'vertical') ? (y + i) : y;

            const clave = `${posX},${posY}`;

            if (!posicionesOcupadas[clave]) {
                const divLetra = document.createElement('div');
                divLetra.className = 'letter';
                divLetra.style.gridArea = `${posY + 1} / ${posX + 1}`;
                //se suma 1 porque el valor de gridArea empieza en 1, no en 0.

                divPadre.appendChild(divLetra);

                posicionesOcupadas[clave] = divLetra;
                //se añade la posicion ocupada para no repetirla.
            }
        }
    })
    return palabrasCentradas;
}

export { centrarPalabras, crearTablero }