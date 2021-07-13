
// 2C dos de treboles
// 2D dos de diamantes
// 2H dos de corazones
// 2S dos de espadas

//Patron modulo: El usuario no puede acceder a las variables
const miModulo = (() =>{

    'use strict'

        
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    //let puntosJugador = 0,
    //    puntosComputadora = 0;
    let puntosJugadores = [];

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntos = document.querySelectorAll('small');

    // Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    //Se inicializa el juego
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();

        puntosJugadores = [];
        for( let i = 0; i < numJugadores; i++ ){
            puntosJugadores.push(0);
        }

        puntos.forEach( elem => elem.innerText = 0);
        divCartasJugadores.forEach( elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnPedir.disabled = false;
    }

    // Esta funcion crea una nueva baraja 
    const crearDeck = () => {

        deck = [];
        for (let i = 2; i <= 10; i++){
            for(let tipo of tipos){
                deck.push( i + tipo );
            }
        }

        for(let tipo of tipos){
            for(let especial of especiales){
                deck.push(especial + tipo);
            }
        }
        
        return _.shuffle(deck);
    }

    // Esta funcion me permite tomar una carta 

    const pedirCarta = () => {

        if ( deck.length === 0 ) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();

    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0,carta.length - 1);

        return ( isNaN(valor)) ? 
                    (valor === 'A') ? 11 : 10
                    : valor * 1; // Transforma a númerico

    }

    // turn: 0 = primer jugador y  el 'ultimo será la computadora
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);  
        puntos[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );
  
    }

    const determinarGanador = () => {
        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        setTimeout(() => {
            if(puntosComputadora === puntosMinimos) {
                alert('Nadie gana :(');
            } else if(puntosMinimos > 21 ) {
                alert('Computadora gana');
            } else if(puntosComputadora > 21) {
                alert('Jugador gana');
            } else {
                alert('Computadora gana');
            }
        }, 500);

    }

    // turno de la Computadora
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;
        do{
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta( carta, puntosJugadores.length - 1);
            
        }while((puntosComputadora < puntosMinimos) && (puntosComputadora <= 21));

        determinarGanador();
    }



    //Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

       crearCarta( carta, 0 );

        if ( puntosJugador > 21 ) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        }else if ( puntosJugador === 21 ) {
            console.warn('21, genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora( puntosJugadores[0] );

    });

    btnNuevo.addEventListener('click', () => {

        inicializarJuego();

    });

    return {
       nuevoJuego: inicializarJuego
    }
})();



