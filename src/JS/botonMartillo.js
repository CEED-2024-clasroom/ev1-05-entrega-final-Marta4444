import { anyadirLetra } from "../JS/anyadirLetra";

function ayudaMartillo(div, letras, desplazamiento, game) {
    div.classList.remove("hidden");

    for (let letra of letras) {
        console.log(("letra: " + letra.classList));
        letra.classList.add("on-top");
        console.log("letra despues: " + letra.classList);
    }

    function finalizarAyuda(clickLetra) {
        letras.forEach((letra) => {
            letra.classList.remove("on-top");
            letra.removeEventListener("click", clickLetra);
        });
        div.classList.add("hidden");
    }

    const manejarClickLetra = (event) => {
        const letra = event.currentTarget;
        if (letra.textContent === "") {
            anyadirLetra(letra, desplazamiento, game);
            finalizarAyuda(manejarClickLetra);
        }
    }

    for (let letra of letras) {
        letra.addEventListener("click", manejarClickLetra);
    }

    const manejarClickExterno = (event) => {
        if (!event.target.classList.contains("letter")) {
            document.removeEventListener("click", manejarClickExterno);
            finalizarAyuda(manejarClickLetra);
        }
    }
    document.addEventListener("click", manejarClickExterno);
}

function ayudaBotonMartillo(desplazamiento, game){
    const botonesAyuda = document.querySelectorAll(".tool"); //Seleccionar botones de ayuda, todos.

    const botonMartillo = botonesAyuda[3];
    const divBlack = document.getElementById("black");
    const letrasTablero = document.querySelectorAll(".letter");

    botonMartillo.addEventListener("click", (event) => {
        event.stopPropagation(); //Para evitar que finalice la ayuda al hacer click sobre el martillo (document.addEventListener con manejarClickExterno)
        ayudaMartillo(divBlack, letrasTablero, desplazamiento, game);
    });
}

export { ayudaBotonMartillo }