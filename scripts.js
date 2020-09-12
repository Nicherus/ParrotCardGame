////////////////////////////////////////////////////////////////////////////
//                       GLOBAL CONST AND VARIABLES                       //
////////////////////////////////////////////////////////////////////////////

// array that holds the images bank
const IMG_ARRAY = ["imagens/bobrossparrot.gif", "imagens/explodyparrot.gif", "imagens/fiestaparrot.gif", "imagens/metalparrot.gif", "imagens/revertitparrot.gif", "imagens/tripletsparrot.gif","imagens/unicornparrot.gif"];

// constant that holds the adress of the clock
const CLOCK = document.querySelector(".clock");

// array that holds the current opened cards of the pair
var opened_cards_array = [];

// current score
var score;

// number of cards chosen by the user
var num_cards; 

// number of moves
var moves; 

// clock interval and seconds
var time, seconds;

// cards that found their match
var pairedCards = document.getElementsByClassName("paired");


////////////////////////////////////////////////////////////////////////////
//                       GAME RESET AND GAME START                        //
////////////////////////////////////////////////////////////////////////////

// start the game
function start(){

    // deletes all generated cards
    resetCards();
    
    // empty opened cards
    opened_cards_array = [];

    // reset moves, score and time
    moves = score = seconds = 0;
    CLOCK.innerHTML = "0s";

    // reset clock interval
    clearInterval(time);

    // prompt the user for the number of cards
    askCardsNumber();

}

// prompt the user for the number of cards that he wants to play with
function askCardsNumber(){

    num_cards = prompt("Com quantas cartas queres jogar? (apenas números pares de 4 a 14)");

    // checks if the number inserted by the user is valid even numbers from 4 to 14)
    if(((num_cards > 3) && (num_cards < 15)) && ((num_cards%2) == 0)){
        check = 1;
    }
    else{
        check = 0;
    }

    // if num_cards is a valid number proceed to create cards
    if(check === 1){
        createCards(num_cards);
    }
    else{
        alert("NÚMERO ERRADO")
        start();
    } 
}

// remove all cards from the ul
function resetCards(){
    let father = document.getElementById("cards-ul");
    while(father.firstChild){
        father.removeChild(father.lastChild);
    }
}

// update the timer each second
function timer(){
    time = setInterval(function(){
        CLOCK.innerHTML = seconds + "s";
        seconds++;
    }, 1000);
}

// clear the timer
function stopTimer(){
    clearInterval(time);
}

////////////////////////////////////////////////////////////////////////////
//                      ALL RELATED TO CREATING CARDS                     //
////////////////////////////////////////////////////////////////////////////

// creates all cards based by the number inserted by the user
function createCards(){

    // creates two identical arrays of src images based on the number inserted by the user
    let array = arrayMirror = createArrayNumCards();
    // concat both arrays and shuffle it so the order is randomized
    let shuffledArray = shuffle(array.concat(arrayMirror));

    // for each array element insert it on the card model to distribute all cards
    for(let i = 0; i < shuffledArray.length; i++){
        
        let newLi = document.createElement("li");
        newLi.classList.add("card");
        newLi.setAttribute("onclick", "cardClick(this);");

        // insert card model
        newLi.innerHTML = "<div class='front-face'> <img class='front-img' draggable='false' src='imagens/front.png'> </div> <div class='back-face'><img class='back-img' draggable='false'  src='"+ shuffledArray[i] +"'></div>";
        let lista = document.querySelector("ul");
        lista.appendChild(newLi);  
    
    }
}

// create an array with half the number of cards the user requested so you can double it after and have matching cards
function createArrayNumCards(){
    let arrayNumCards = [];
    for(let i = 0; i < (num_cards/2); i++){
        arrayNumCards[i] = IMG_ARRAY[i];
    }
    return arrayNumCards;
}

// shuffle algorithm
function shuffle(array){
    for(let i = 0; i < array.length; i++){
        let x = Math.floor(Math.random() * (i + 1));
        let y = array[i];
        array[i] = array[x];
        array[x] = y;
    }
    return array;
}


////////////////////////////////////////////////////////////////////////////
//                 ALL THAT HAPPENS WHEN YOU CLICK A CARD                 //
////////////////////////////////////////////////////////////////////////////


// on click calls this method
function cardClick(element){
    
    // push the opened card to the opened cards array
    opened_cards_array.push(element);
    addMoves();
    cardFlip(element);
    disable(element);

    // checks if you clicked on the second opened card (making a pair)
    if(opened_cards_array.length === 2){  
        
        let card1 = opened_cards_array[0].getElementsByClassName("back-img")[0];
        let card2 = opened_cards_array[1].getElementsByClassName("back-img")[0];

        //compare if the pair is a match based on the image src
        if(card1.src === card2.src){
            paired();
        }
        else{
            notPaired();
        }
    }
}

// toggle classes that flip the card
function cardFlip(element){
    element.getElementsByClassName("back-face")[0].classList.toggle("flipBack");
    element.getElementsByClassName("front-face")[0].classList.toggle("flipFront");
}

// add the class paired to matched cards and checks if the player won
function paired(){
    score += 2;
    opened_cards_array[0].classList.add("paired");
    opened_cards_array[1].classList.add("paired");
    opened_cards_array = [];
    if(score == num_cards){
        won();
    }
}

// when the opened cards are not a pair, disable all cards for 1s and then flip back the unmatched ones
function notPaired(){
    disableAllCards();
    setTimeout(function(){
        cardFlip(opened_cards_array[0]);
        cardFlip(opened_cards_array[1]);
        opened_cards_array = [];
        enableAllCards();
    },1000);
}

// disables clicks on the card
function disable(element){
    element.classList.toggle("disable");
}


// disables clicks on all cards
function disableAllCards(){
    let father = document.getElementById("cards-ul");
    for(let i = 0; i < num_cards; i++){
        father.getElementsByClassName("card")[i].classList.add("disable")
    }
}

// enables clicks on all cards except the already matched cards
function enableAllCards(){
    let father = document.getElementById("cards-ul");
    for(let i = 0; i < num_cards; i++){
        father.getElementsByClassName("card")[i].classList.remove("disable")
    }
    for(let i = 0; i < pairedCards.length; i++){
        pairedCards[i].classList.add("disable");
    }
}

// increase the number of moves and if it`s the first move of the game, starts the timer
function addMoves(){
    moves++;
    if(moves == 1){
        timer();
    }
}

// show game stats to the user when the game finishes and prompt for a restart
function won(){
    let playAgain;
    setTimeout(function(){
        playAgain = parseInt(prompt("Você ganhou em " + moves + " JOGADAS e " + seconds + " SEGUNDOS!\nDeseja jogar novamente?\nDigite 1 para jogar novamente\nDigite 2 para finalizar"));
        if(playAgain === 1){
            start();
        }
        else if(playAgain === 2){
            stopTimer();
        }
        else{
            alert("Número inserido errado, por favor digite novamente.")
            won();    
        }
    }, 100);
}