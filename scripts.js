var imgArray = ["imagens/bobrossparrot.gif", "imagens/explodyparrot.gif", "imagens/fiestaparrot.gif", "imagens/metalparrot.gif", "imagens/revertitparrot.gif", "imagens/tripletsparrot.gif","imagens/unicornparrot.gif"];
var openedCards = [];

var pontos = 0;

var numCards;

var jogadas = 0;

start();

function start(){
    numCards = prompt("Com quantas cartas queres jogar? (apenas números pares de 4 a 14)");
    
    var teste = testaNumCards();
    
    if(teste === 1){
        createCards(numCards);
    }
    else{
        alert("NUMERO ERRADO")
        start();
    } 
}

function testaNumCards(){
    if(((numCards > 3) && (numCards < 15)) && ((numCards%2) == 0)){
        return 1;
    }
    else{
        return 0;
    }
}

function createCards(){

    let array = arrayMirror = criaArrayNumCards();
    let arrayNumCards = array.concat(arrayMirror);
    let shuffledArray = shuffle(arrayNumCards);

    for(let i = 0; i < shuffledArray.length; i++){
        
        var newLi = document.createElement("li");
        newLi.classList.add("card");
        newLi.setAttribute("onclick", "cardOpen(this);");
        
        newLi.innerHTML = "<div class='front-face'> <img class='front-img' src='imagens/front.png'> </div> <div class='back-face'><img class='back-img'  src='"+ shuffledArray[i] +"'></div>";
        var lista = document.querySelector("ul");
        
        lista.appendChild(newLi);  
    }
}

function criaArrayNumCards(){
    let ArrayNumCards = []
    for(let i = 0; i < (numCards/2); i++){
        ArrayNumCards[i] = imgArray[i];
    }
    return ArrayNumCards;
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


function cardOpen(element){
    
    openedCards.push(element);
    
    cardFlip(element);
    disable(element);

    increaseJogadas();

    if(openedCards.length === 2){  
        if(openedCards[0].getElementsByClassName("back-img")[0].src === openedCards[1].getElementsByClassName("back-img")[0].src){
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
    openedCards = [];
    if(pontos == numCards){
        setTimeout(ganhou, 1000);
    }
}

function ganhou(){
    alert("Você ganhou em " + jogadas + " jogadas!");
}

function notMatch(){
    setTimeout(resetOpenedCards,1000);
}

function resetOpenedCards(){
    cardFlip(openedCards[0]);
    cardFlip(openedCards[1]);
    disable(openedCards[0]);
    disable(openedCards[1]);
    openedCards = [];
}

function increaseJogadas(){
    jogadas++;
}