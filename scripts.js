//var numCards = prompt("Com quantas cartas queres jogar? (apenas números pares de 4 a 12)");

testaNumCards();


function testaNumCards(){
    if(((numCards > 3) && (numCards < 13)) && ((numCards%2) == 0)){
        return 1;
    }
    else{
        return 0;
    }
}