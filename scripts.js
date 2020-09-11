const IMG_ARRAY = ["imagens/bobrossparrot.gif", "imagens/explodyparrot.gif", "imagens/fiestaparrot.gif", "imagens/metalparrot.gif", "imagens/revertitparrot.gif", "imagens/tripletsparrot.gif","imagens/unicornparrot.gif"];
const CLOCK = document.querySelector(".clock");
var opened_cards_array = [], pontos, num_cards, jogadas, time, seconds;


function start(){
    resetCards();
    num_cards = prompt("Com quantas cartas queres jogar? (apenas números pares de 4 a 14)");
    opened_cards_array = [];
    jogadas = 0;
    pontos = 0;
    seconds = 0;
    let teste = testaNumCards();
    CLOCK.innerHTML = "0s";
    clearInterval(time);
    if(teste === 1){
        createCards(num_cards);
    }
    else{
        alert("NUMERO ERRADO")
        start();
    } 
}

function testaNumCards(){
    if(((num_cards > 3) && (num_cards < 15)) && ((num_cards%2) == 0)){
        return 1;
    }
    else{
        return 0;
    }
}

function createCards(){

    let array = arrayMirror = criaArrayNumCards();
    let arraynum_cards = array.concat(arrayMirror);
    let shuffledArray = shuffle(arraynum_cards);

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
    let Arraynum_cards = []
    for(let i = 0; i < (num_cards/2); i++){
        Arraynum_cards[i] = IMG_ARRAY[i];
    }
    return Arraynum_cards;
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
    
    opened_cards_array.push(element);
    
    cardFlip(element);

    disable(element);

    adicionarjogadas();

    if(opened_cards_array.length === 2){  
        
        let card1 = opened_cards_array[0].getElementsByClassName("back-img")[0];
        let card2 = opened_cards_array[1].getElementsByClassName("back-img")[0];

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
    pontos = pontos + 2;
    opened_cards_array = [];
    if(pontos == num_cards){
        setTimeout(function(){
            playAgain = parseInt(prompt("Você ganhou em " + jogadas + " JOGADAS e " + seconds + " SEGUNDOS!\nDeseja jogar novamente?\nDigite 1 para jogar novamente\nDigite 2 para finalizar"));
            if(playAgain === 1){
                start();
            }
            else if(playAgain === 2){
                stopTimer();
            }
        }, 100);
    }
}

function notMatch(){
    setTimeout(function(){
        cardFlip(opened_cards_array[0]);
        cardFlip(opened_cards_array[1]);
        disable(opened_cards_array[0]);
        disable(opened_cards_array[1]);
        opened_cards_array = [];
    },1000);
}

function adicionarjogadas(){
    jogadas++;
    if(jogadas == 1){
        timer();
    }
}

function resetCards(){
    let father = document.getElementById("cards-ul");
    while(father.firstChild){
        father.removeChild(father.lastChild);
    }
}

function timer(){
    time = setInterval(function(){
        CLOCK.innerHTML = seconds + "s";
        seconds++;
    }, 1000);
}

function stopTimer(){
    clearInterval(time);
}