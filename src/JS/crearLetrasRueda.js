import calculateLetterPositions from '../lib/letter_positions.js';

let posicionesLetras;

function crearRuedaLetras(letras) {
    const numLetras = letras.length;
    posicionesLetras = calculateLetterPositions(numLetras);

    const wheel = document.getElementById("wheel");

    letras.split('').forEach((letra, i) => {
        const { left, top } = posicionesLetras[i]; //se ponen las variables entre {} porque calculateLetterPositions() devuelve un objeto, para desesctructurarlo.
        const divWheel = document.createElement('div');
        divWheel.className = 'wheel-letter';
        divWheel.style = `left: ${left}; top: ${top}`;
        divWheel.textContent = letra;
        wheel.appendChild(divWheel);
    })
    return posicionesLetras;
}

export { crearRuedaLetras }

