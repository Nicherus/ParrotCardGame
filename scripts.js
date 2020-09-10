padrao();

function padrao(){
    
    var numCards = prompt("Com quantas cartas queres jogar? (apenas números pares de 4 a 12)");
    
    var teste = testaNumCards(numCards);
    
    if(teste === 1){
        createCards(numCards);
    }
    else{
        alert("NUMERO ERRADO")
        padrao();
    } 
}

function createCards(numCards){
    for(var i = 0; i < numCards; i++){
        var newLi = document.createElement("li");
        newLi.setAttribute('class', 'card');
        newLi.innerHTML = 
        "<div class='front-face'> <img class='front-img' src='imagens/front.png'> </div> <div class='back-face'><img class='back-img' src='imagens/fiestaparrot.gif'></div>";
        var lista = document.querySelector("ul");
        lista.appendChild(newLi);
    }
}


function testaNumCards(numCards){
    if(((numCards > 3) && (numCards < 13)) && ((numCards%2) == 0)){
        return 1;
    }
    else{
        return 0;
    }
}


/* 
    imagens/bobrossparrot.gif
    imagens/explodyparrot.gif
    imagens/fiestaparrot.gif
    imagens/metalparrot.gif
    imagens/revertitparrot.gif
    imagens/tripletsparrot.gif
    imagens/unicornparrot.gif
*/