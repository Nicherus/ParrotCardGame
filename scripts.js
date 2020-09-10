padrao();

function padrao(){
    
    var numCards = prompt("Com quantas cartas queres jogar? (apenas números pares de 4 a 14)");
    
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
        newLi.classList.add("card");
        newLi.setAttribute("onclick", "flipCards(this);");
        
        newLi.innerHTML = "<div class='front-face'> <img class='front-img' src='imagens/front.png'> </div> <div class='back-face'><img class='back-img'  src='imagens/fiestaparrot.gif'></div>";
        var lista = document.querySelector("ul");
        
        lista.appendChild(newLi);
    
    }
}

function flipCards(x){
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


/* 
    imagens/bobrossparrot.gif
    imagens/explodyparrot.gif
    imagens/fiestaparrot.gif
    imagens/metalparrot.gif
    imagens/revertitparrot.gif
    imagens/tripletsparrot.gif
    imagens/unicornparrot.gif
*/