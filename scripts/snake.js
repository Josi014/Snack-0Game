window.onload = function() {

    var screen = document.getElementById('screen');
    var paint = screen.getContext("2d");
    setInterval(gameCobrinha, 100);
    var marcaPontos = document.getElementById('placar');
    var placar = 0;
    var audio = document.createElement("AUDIO")
    document.body.appendChild(audio);
    audio.src = '../sons/trilha.mp3'

    var vel = 1;

    var velX = 0;
    var velY = 0;
    var pontoX = 10;
    var pontoY = 15;
    var tq = 20;
    var aq = 20;
    var appleX = appleY = 10;


    var rastro = [];
    var tail = 1;


    function gameCobrinha() {
        pontoX += velX;
        pontoY += velY;
        if (pontoX < 0) {
            pontoX = aq - 1;
        }
        if (pontoX > aq - 1) {
            pontoX = 0;
        }
        if (pontoY < 0) {
            pontoY = aq - 1;
        }
        if (pontoY > aq - 1) {
            pontoY = 0;
        }


        paint.fillStyle = "green";
        paint.fillRect(0, 0, screen.width, screen.height);

        paint.fillStyle = "red";
        paint.fillRect(appleX * tq, appleY * tq, tq, tq);


        for (var i = 0; i < rastro.length; i++) {
            paint.fillStyle = mudaCorDaCobra();
            paint.fillRect(rastro[i].x * tq, rastro[i].y * tq, tq, tq);
            pegouMaca()
            if (rastro[i].x == pontoX && rastro[i].y == pontoY) {
                velX = velY = 0;
                tail = 1;
                placar = 0;
            }
        }

        rastro.push({
            x: pontoX,
            y: pontoY
        })
        while (rastro.length > tail) {
            rastro.shift();
        }
        if (appleX == pontoX && appleY == pontoY) {
            tail++;
            placar++;
            appleX = Math.floor(Math.random() * aq);
            appleY = Math.floor(Math.random() * aq);
        }

    }

    function mudaCorDaCobra(opacidade = 1) {
        let r = Math.random() * 255;
        let g = Math.random() * 255;
        let b = Math.random() * 255;

        return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
    }


    function pegouMaca() {
        marcaPontos.innerHTML = placar;
    }


    const button = document.getElementById('restartGame');
    button.addEventListener('click', novoJogo);
    const button2 = document.getElementById('iniciarGame');
    button2.addEventListener('click', comecarJogo);



    function novoJogo() {
        if (button.value === 'Restart') {
            velX = velY = 0;
            tail = 1;
            placar = 0;
            pontoX = 10;
            pontoY = 15;
            appleX = appleY = 10;
            audio.play()
        } else {
            button.value = 'Restart';

        }

    }


    function comecarJogo(event) {
        if (button2.value === 'Partida') {
            document.addEventListener("keydown", movimentaCobrinha, mudaFase2());
            audio.play()
        }

    }

    function mudaFase2() {
        if (placar === 10) {
            paint.fillStyle = "orange";
            paint.fillRect(appleX * tq, appleY * tq, tq, tq);
            doument.getElementById("mudaFase2")
        }
    }

    function movimentaCobrinha(event) {
        switch (event.keyCode) {
            case 37:
                velX = -vel;
                velY = 0;
                break;
            case 38:
                velX = 0;
                velY = -vel;
                break;
            case 39:
                velX = vel;
                velY = 0;
                break;
            case 40:
                velX = 0;
                velY = vel;
                break;
            default:
                break;

        }


    }
}