var imgArray = ["imagens/bobrossparrot.gif", "imagens/explodyparrot.gif", "imagens/fiestaparrot.gif", "imagens/metalparrot.gif", "imagens/revertitparrot.gif", "imagens/tripletsparrot.gif","imagens/unicornparrot.gif"];

start();

function start(){
    var numCards = prompt("Com quantas cartas queres jogar? (apenas números pares de 4 a 14)");
    
    var teste = testaNumCards(numCards);
    
    if(teste === 1){
        createCards(numCards);
    }
    else{
        alert("NUMERO ERRADO")
        start();
    } 
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

function createCards(numCards){

    let array = arrayMirror = criaArrayNumCards(numCards);
    let arrayNumCards = array.concat(arrayMirror);
    let shuffledArray = shuffle(arrayNumCards);

    for(let i = 0; i < shuffledArray.length; i++){
        
        var newLi = document.createElement("li");
        newLi.classList.add("card");
        newLi.setAttribute("onclick", "flipCard(this);");
        
        newLi.innerHTML = "<div class='front-face'> <img class='front-img' src='imagens/front.png'> </div> <div class='back-face'><img class='back-img'  src='"+ shuffledArray[i] +"'></div>";
        var lista = document.querySelector("ul");
        
        lista.appendChild(newLi);  
    }
}

function criaArrayNumCards(numCards){
    let ArrayNumCards = []
    for(let i = 0; i < (numCards/2); i++){
        ArrayNumCards[i] = imgArray[i];
    }
    return ArrayNumCards;
}

function flipCard(x){
    x.getElementsByClassName("back-face")[0].classList.toggle("virandoBack");
    x.getElementsByClassName("front-face")[0].classList.toggle("virandoFront");
}

function testaNumCards(numCards){
    if(((numCards > 3) && (numCards < 15)) && ((numCards%2) == 0)){
        return 1;
    }
    else{
        return 0;
    }
}
