# Descrição

Seu segundo projeto com JavaScript será a implementação do jogo Parrot Card Game, um jogo da memória temático com aleatoridade, efeitos e transição, responsividade e papagaios dançantes!

Além do seu primeiro jogo, este também será o primeiro projeto usando Git :)

Todas as instruções estão em: [https://github.com/bootcamp-ra/projeto-04-parrot-card-game](https://github.com/bootcamp-ra/projeto-04-parrot-card-game)

# Requisitos

- Geral
    - [x]  Não utilize nenhuma biblioteca para implementar este projeto (jquery, lodash, etc), somente JavaScript puro
    - [x]  Seu projeto deverá ser desenvolvido utilizando Git e GitHub
    - [x]  Para isso, comece fazendo um **fork** **privado** do projeto de referência: [https://github.com/bootcamp-ra/projeto-04-parrot-card-game](https://github.com/bootcamp-ra/projeto-04-parrot-card-game)
    - [x]  **A cada requisito implementado** faça um commit com uma mensagem descritiva do que você evoluiu
    - [x]  Caso queira dividir um requisito em vários commits, não há problema. Mas evite colocar mais de um requisito no mesmo commit.
- Layout
    - [x]  Aplicar layout para desktop, seguindo imagens fornecidas
    - [X]  Aplicar layout para mobile, seguindo imagens fornecidas
    - [X]  Fonte usada deve ser a Roboto
    - [X]  Cores
        - Verde título: #7ab08e
        - Amarelo Background: #effabf
        - Verde cartas: #A7E9AF
- Distribuição de cartas
    - [x]  Ao entrar no jogo, o usuário deverá ser perguntado com quantas cartas quer jogar (utilize `prompt`)
    - [X]  O usuário só poderá inserir números pares no `prompt`, de 4 a 12. Qualquer número que fuja a essa regra não deve ser aceito. No caso de números inválidos, o `prompt` deverá ficar sendo repetido, até que o usuário coloque um número válido.
    - [ ]  Após inserir um número de cartas válido, o jogo deverá inserir as cartas viradas pra baixo na página de forma que a distribuição seja aleatória
- Clique na carta
    - [X]  Ao clicar em uma carta, a mesma deve ser virada
    - [ ]  Caso seja a primeira carta do par, ela deve permanecer virada até o usuário escolher a segunda carta
    - [ ]  Caso seja a segunda carta, existem 2 situações:
        - [ ]  Caso seja igual à primeira carta, o usuário acertou e ambas agora devem ficar viradas pra cima até o final do jogo
        - [ ]  Caso seja uma carta diferente da primeira carta virada, o usuário errou. Nesse caso, o jogo deve **aguardar 1 segundo** e então virar as duas cartas para baixo novamente
    - [X]  **Dica**: se quiser fazer o efeito 3D da carta virando, você pode ver o CSS necesśario em: [https://repl.it/@BootcampRespond/FlippedCards#index.html](https://repl.it/@BootcampRespond/FlippedCards#index.html) . Só se atente que nesse exemplo a carta vira ao passar o mouse. No caso do jogo, seria ao clicar.
- Fim do Jogo
    - [ ]  Quando o usuário terminar de virar todas as cartas corretamente, deverá ser exibido um alert com a mensagem **"Você ganhou em X jogadas!"** sendo X a quantidade de vezes que o usuário virou uma carta no jogo.

# Bônus (opcional)

- [ ]  Coloque um relógio no topo superior direito da tela, contando quantos segundos já passaram desde o início do jogo. Ao final, informe na mensagem de vitória a quantidade de segundos.
- [ ]  Ao final do jogo, pergunte com um prompt se o usuário gostaria de reiniciar a partida. Se ele responder sim, comece novamente o jogo perguntando a quantidade de cartas.
