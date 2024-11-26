import '../lib/fontawesome.js';
import { Game } from '../lib/Game.js';
import { centrarPalabras, crearTablero } from '../JS/crearTablero.js';
import { crearRuedaLetras } from '../JS/crearLetrasRueda.js';
import { ayudaBotonShuffle } from '../JS/botonShuffle.js';
import { ayudaBotonBombillayDiana } from '../JS/botonBombilla.js';
import { crearLineayAnadirPalabra } from '../JS/crearLineas.js';
import { ayudaBotonMartillo } from '../JS/botonMartillo.js';

const game = new Game(2); //se inicializa un nuevo juego
const wordPositions = game.wordPositions; //array con las posiciones de las palabras y su longitud
const gridWidth = 10;
const gridHeight = 10;

const desplazamiento = centrarPalabras(wordPositions, gridWidth, gridHeight); //Se centran las palabras para crear el tablero.

crearTablero(wordPositions, desplazamiento); //Se crea el tablero de cuadrículas.

const letras = game.letters; //se obtienen las letras de la rueda.
const posicionesLetras = crearRuedaLetras(letras); //Se crean las letras de la rueda. Devuelve las posiciones de las letras en un objeto. Necesario para luego cambiarlas de posicion con el boton de shuffle.

crearLineayAnadirPalabra(desplazamiento, game)
ayudaBotonShuffle(posicionesLetras); 
ayudaBotonBombillayDiana(desplazamiento, game);
ayudaBotonMartillo(desplazamiento, game);



