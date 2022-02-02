
let bottone = document.getElementById('play');

bottone.addEventListener('click', play)

function play() {

    numeroBombe = 16;

    let grid = document.getElementById('grid');

    grid.innerHTML = '';
    document.getElementById('target').innerHTML = '';
    let difficolta = document.getElementById('difficolta').value;

    let numeroCelle
    if (difficolta == 'easy') {
        numeroCelle = 100;
    } else if (difficolta == 'hard') {
        numeroCelle = 81
    } else if (difficolta == 'crazy') {
        numeroCelle = 49
    } else {
        alert('ERRORE!')
    }

    creaCampo(numeroCelle);

    let bombe = creaBombe(numeroBombe, numeroCelle);
    let tentativi = [];
    console.log(bombe);

    
    



    //qui iniziano le funzioni!!

    function creaCampo(numeroCelle) {

        let cellePerRiga = Math.sqrt(numeroCelle);
    
        for (let i = 1; i <= numeroCelle; i++) {
            
            let node = document.createElement('div');
            
            node.classList.add('square');
            
            let dimensione = `calc(100% / ${cellePerRiga})`;
            node.style.height = dimensione;
            node.style.width = dimensione;
    
            node.innerText = i;
    
            node.addEventListener('click', gestioneClick)
            
            grid.appendChild(node);
        }    
    }
    
    function gestioneClick() {
        this.classList.add('clicked');
        this.removeEventListener('click', gestioneClick)

        let cellaCliccata = parseInt(this.innerText);
        
        if (bombe.includes(cellaCliccata)) {
            fineGioco();
        } else {
            tentativi.push(cellaCliccata)
        }

        if (tentativi.length == (numeroCelle - numeroBombe)) {
            vittoria();
        }
    }


    function vittoria() {
        let quadrati2 = document.getElementsByClassName('square');

        for (let i = 0; i < quadrati2.length; i++) {
            
            quadrati2[i].removeEventListener('click', gestioneClick)
        }

        document.getElementById('target').innerHTML = 'HAI VINTO!!';

    }
    
    function fineGioco() {
        const quadrati = document.getElementsByClassName('square');

        for (let i = 0; i < quadrati.length; i++) {
            if(bombe.includes(parseInt(quadrati[i].innerText))) {
                quadrati[i].classList.add('bomba');
            }
            quadrati[i].removeEventListener('click', gestioneClick)
        }
        document.getElementById('target').innerHTML = 'Hai effettutato ' + tentativi.length + ' tentativi prima di trovare la bomba!';
    } 
   
    
    function creaBombe(numBombe, numCelle) {
        const bombeCreate = [];
    
        while (bombeCreate.length < numBombe) {
    
            let bomba = numeroCasuale(1, numCelle);
    
            if (!bombeCreate.includes(bomba)) {
                bombeCreate.push(bomba);
            }
        }
    
        return bombeCreate;
    }
}



function numeroCasuale(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);
}