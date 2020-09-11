const IMG_ARRAY = ["imagens/bobrossparrot.gif", "imagens/explodyparrot.gif", "imagens/fiestaparrot.gif", "imagens/metalparrot.gif", "imagens/revertitparrot.gif", "imagens/tripletsparrot.gif","imagens/unicornparrot.gif"];
var OPENED_CARDS_ARRAY = [], PONTOS, NUM_CARDS, JOGADAS;

function start(){
    resetCards();
    NUM_CARDS = prompt("Com quantas cartas queres jogar? (apenas números pares de 4 a 14)");
    OPENED_CARDS_ARRAY = [];
    JOGADAS = 0;
    PONTOS = 0;
    let teste = testaNUM_CARDS();
    
    if(teste === 1){
        createCards(NUM_CARDS);
    }
    else{
        alert("NUMERO ERRADO")
        start();
    } 
}

function testaNumCards(){
    if(((NUM_CARDS > 3) && (NUM_CARDS < 15)) && ((NUM_CARDS%2) == 0)){
        return 1;
    }
    else{
        return 0;
    }
}

function createCards(){

    let array = arrayMirror = criaArrayNUM_CARDS();
    let arrayNUM_CARDS = array.concat(arrayMirror);
    let shuffledArray = shuffle(arrayNUM_CARDS);

    for(let i = 0; i < shuffledArray.length; i++){
        
        let newLi = document.createElement("li");
        newLi.classList.add("card");
        newLi.setAttribute("onclick", "cardClick(this);");
        
        newLi.innerHTML = "<div class='front-face'> <img class='front-img' src='imagens/front.png'> </div> <div class='back-face'><img class='back-img'  src='"+ shuffledArray[i] +"'></div>";
        let lista = document.querySelector("ul");
        
        lista.appendChild(newLi);  
    }
}

function criaArrayNumCards(){
    let ArrayNUM_CARDS = []
    for(let i = 0; i < (NUM_CARDS/2); i++){
        ArrayNUM_CARDS[i] = IMG_ARRAY[i];
    }
    return ArrayNUM_CARDS;
}

function shuffle(array){
    for(let i = 0; i < array.length; i++){
        let x = Math.floor(Math.random() * (i + 1));
        let y = array[i];
        array[i] = array[x];
        array[x] = y;
    }
    return array;
}

function cardClick(element){
    
    OPENED_CARDS_ARRAY.push(element);
    
    cardFlip(element);

    disable(element);

    increaseJOGADAS();

    if(OPENED_CARDS_ARRAY.length === 2){  
        
        let card1 = OPENED_CARDS_ARRAY[0].getElementsByClassName("back-img")[0];
        let card2 = OPENED_CARDS_ARRAY[1].getElementsByClassName("back-img")[0];

        if(card1.src === card2.src){
            match();
        }
        else{
            notMatch();
        }
    }
}

function cardFlip(element){
    element.getElementsByClassName("back-face")[0].classList.toggle("virandoBack");
    element.getElementsByClassName("front-face")[0].classList.toggle("virandoFront");
}

function disable(element){
    element.classList.toggle("disable");
}

function match(){
    PONTOS = PONTOS + 2;
    OPENED_CARDS_ARRAY = [];
    if(PONTOS == NUM_CARDS){
        setTimeout(function(){
            playAgain = parseInt(prompt("Você ganhou em " + JOGADAS + " JOGADAS!\nDeseja jogar novamente?\nDigite 1 para jogar novamente\nDigite 2 para finalizar"));
            if(playAgain === 1){
                start();
            }
        }, 500);
    }
}

function notMatch(){
    setTimeout(function(){
        cardFlip(OPENED_CARDS_ARRAY[0]);
        cardFlip(OPENED_CARDS_ARRAY[1]);
        disable(OPENED_CARDS_ARRAY[0]);
        disable(OPENED_CARDS_ARRAY[1]);
        OPENED_CARDS_ARRAY = [];
    },1000);
}

function increaseJOGADAS(){
    JOGADAS++;
}

function resetCards(){
    let father = document.getElementById("cards-ul");
    while(father.firstChild){
        father.removeChild(father.lastChild);
    }
}