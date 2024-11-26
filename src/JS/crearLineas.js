import { getElementCenter, lengthAndAngle } from '../lib/line_position.js';
import { buscarPalabra, centrarPalabraYAnyadir } from '../JS/anyadirPalabra.js';

function crearLinea(letra, mouseX, mouseY) {
    const linea = document.createElement('div'); //la linea creada es un elemento div
    linea.classList.add("line");
    const { x: letraCentroX, y: letraCentroY } = getElementCenter(letra);
    const origin = [letraCentroX, letraCentroY];
    const end = [mouseX, mouseY];

    //Se añade la posicion en el atributo estilo
    linea.style.left = `${letraCentroX}px`;
    linea.style.top = `${letraCentroY}px`;

    const { length, angle } = lengthAndAngle(origin, end);

    //Para marcar la trayectoria y que vaya dibujando la letra al mover el ratón.
    linea.style.width = `${length}px`;
    linea.style.transform = `rotate(${angle}deg)`;

    document.body.appendChild(linea); //Se añade la línea al documento, en el body.

    return linea;
}

function actualizarLinea(letra, linea, mouseX, mouseY) {
    const { x: letraCentroX, y: letraCentroY } = getElementCenter(letra);
    const origin = [letraCentroX, letraCentroY];
    const end = [mouseX, mouseY];
    const { length, angle } = lengthAndAngle(origin, end);
    linea.style.width = `${length}px`;
    linea.style.transform = `rotate(${angle}deg)`;
}

function eliminarLineas() {
    const lineas = document.querySelectorAll(".line");
    lineas.forEach(linea => {
        linea.remove();
    });
}

function estaSobreLetra(mouseX, mouseY, letra) {
    const letraRect = letra.getBoundingClientRect();
    //esta función devuelve un objeto DOMRect, con las propiedades de las coordenadas y dimensiones del elemento en relación con la VENTANA DEL NAVEGADOR. En este caso, contiene las posiciones de los BORDES del div.

    const left = letraRect.left;
    const top = letraRect.top;
    const right = letraRect.right;
    const bottom = letraRect.bottom;
    /* Left: distancia del borde izquierdo del elemento (div) respecto al borde izquierdo de la ventana.
    Right: distancia del borde derecho del elemento (div) respecto al borde derecho de la ventana.
    Top: distancia del borde superior del elemento (div) respecto al borde superior de la ventana.
    Bottom: distancia del borde inferior del elemento (div) respecto al borde superior de la ventana.
    */

    return (mouseX >= left && mouseX <= right) && (mouseY >= top && mouseY <= bottom); //comprueba que la posicion del ratón esté dentro de las coordenadas ocupadas por el div. Devuelve True si está dentro, False si está fuera.
}

function fijarLineaANuevaLetra(linea, desde, hasta) {
    const { x: desdeX, y: desdeY } = getElementCenter(desde);
    const { x: hastaX, y: hastaY } = getElementCenter(hasta);
    const origin = [desdeX, desdeY];
    const end = [hastaX, hastaY];
    const { length, angle } = lengthAndAngle(origin, end);

    linea.style.left = `${desdeX}px`;
    linea.style.top = `${desdeY}px`;
    linea.style.width = `${length}px`;
    linea.style.transform = `rotate(${angle}deg)`;
}

function crearLineayAnadirPalabra(desplazamiento, game){
    const divLetras = document.querySelectorAll(".wheel-letter");
    let dibujando = false;
    let lineaActual = null;
    let ultimaLetraSeleccionada = null;
    let palabra = []; 
    let palabraFinal = ""; 

    const manejarMouseDown = function mouseDown(event) {
        if (event.button == 0) {
            const letra = event.currentTarget;
            letra.classList.add("selected");
            dibujando = true;
            ultimaLetraSeleccionada = letra; //para no repetir la letra seleccionada

            lineaActual = crearLinea(letra, event.clientX, event.clientY); //Se crea la linea cuando se aprieta sobre una letra.

            palabra.push(letra.textContent); //añade la letra sobre la que se pulsa a un array de letras, al cual luego se añaden las letras por las que se pasa por encima.
        }
    }

    const manejarMouseMove = function mouseMove(event) {
        if (dibujando && lineaActual) { //Debe existir la linea ya.
            actualizarLinea(ultimaLetraSeleccionada, lineaActual, event.clientX, event.clientY);

            divLetras.forEach(letra => {
                if (letra.classList.contains("selected")) {
                    return; //Cuando se pasa por una letra por la que ya se ha pasado, no hace nada más.
                };

                if (estaSobreLetra(event.clientX, event.clientY, letra)) {
                    if (ultimaLetraSeleccionada !== letra) {
                        fijarLineaANuevaLetra(lineaActual, ultimaLetraSeleccionada, letra);
                        letra.classList.add("selected");
                        lineaActual = crearLinea(letra, event.clientX, event.clientY);
                        ultimaLetraSeleccionada = letra; //Se actualiza la letra por la que se acaba de pasar.

                        palabra.push(letra.textContent); //añade las letras por las que pasa a un array de letras que se convertirá luego en string.
                    }
                }
            });
        }
    }

    const manejarMouseUp = function mouseUp() {
        if (dibujando) { //Solo se ejecuta cuando se habia creado una linea y se suelta el ratón.
            eliminarLineas();
            dibujando = false;

            divLetras.forEach(letra => {
                letra.classList.remove("selected"); //Se "des-seleccionan" las letras por las que se ha pasado.
            });

            //La palabra se debe añadir, si es válida, al soltar el ratón, por eso este código se coloca dentro de este eventLinstener.
            palabraFinal = palabra.join('');
            palabra = []; //para vaciar el array de letras seleccionadas.

            let posicionPalabraEnTablero = buscarPalabra(palabraFinal, game);
            centrarPalabraYAnyadir(posicionPalabraEnTablero, desplazamiento, palabraFinal)
        }
    }

    //EventListeners para crear lineas y añadir palabras
    for (let letra of divLetras) {
        letra.addEventListener("mousedown", manejarMouseDown);
    }
    document.addEventListener("mousemove", manejarMouseMove);
    document.addEventListener("mouseup", manejarMouseUp);

}

export { crearLineayAnadirPalabra }
