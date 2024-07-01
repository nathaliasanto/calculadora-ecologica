//elementos extraÃ­dos direto do HTML (DOM)
const enunciadoPrincipal = document.querySelector('.enunciado-principal');
const botaoPrincipal = document.querySelector('.botao-principal');
const inputRange = document.querySelector('#input-range');
const labelRange = document.querySelector("#lenRange");
const inputRadioSim = document.querySelector('#radio-sim');
const inputRadioNao = document.querySelector('#radio-nao');
const labelRadioSim = document.querySelector("#label-radio-sim");
const labelRadioNao = document.querySelector("#label-radio-nao");
const imgResultado = document.querySelector('.img-planeta');
const textoResultado = document.querySelector('.qtd-planetas');

//elementos HTML criados no JavaScript
const inputNome = document.createElement('input');
const inputNumber = document.createElement('input');
const inputBox = document.createElement('div');
const divRadio1 = document.createElement('div');
const divRadio2 = document.createElement('div');
const divResultado = document.createElement('div');

//atribuiÃ§Ã£o de classes
inputRange.classList.add('input-range');
inputBox.classList.add('input-box');
divResultado.classList.add('resultado-div');

//especificaÃ§Ã£o de tipo e valores de input
inputNome.type = "text";
inputNumber.type = "number";
inputNumber.value = "1";
inputNumber.min = 1;

const respostas = [5]; //array que armazena quantidade de pontos por pergunta
let paginaAtual = 0;
let resultadoFinal; //total de pontos
let qtdPlanetas; 
let nome;
let segundos = 0;
let atualizaTimer;
let timer;
let pontos = [5];

seletorPagina();

function criaTimer(){
    timer = new Date(segundos * 1000);
}

botaoPrincipal.addEventListener('click', function (evento){
    evento.preventDefault();

    if(paginaAtual === 1) {
        atualizaTimer = setInterval(function () {
            segundos++;
            criaTimer();
        }, 1000);
    }

    if(paginaAtual === 6) {
        clearInterval(atualizaTimer);
    }
});

botaoPrincipal.addEventListener('click', function (evento) {
    evento.preventDefault();
    paginaAtual++;
    
    if(paginaAtual === 8) {
        paginaAtual = 0;
    }
    
    if(!inputNome.value && paginaAtual === 2){
        paginaAtual = 1;
        alert('Ops, informe o seu nome antes de continuar!');
    }

    if(paginaAtual === 3){
        respostas[0] = Number(inputRange.value);
    }else if(paginaAtual === 4){
        respostas[1] = Number(inputRange.value);
    }else if(paginaAtual === 5){
        respostas[2] = Number(inputNumber.value);
    }else if(paginaAtual === 6){
        if(inputRadioSim.checked){
            respostas[3] = 1;
        }else{
            respostas[3] = 0;
        }
    }else if(paginaAtual === 7){
        respostas[4] = Number(inputRange.value);
    }

    seletorPagina();

});

inputNome.addEventListener('change', function () {
    nome = inputNome.value;
});

labelRange.innerHTML = inputRange.value + "%";

inputRange.addEventListener('input', function (){
    labelRange.innerHTML = `${inputRange.value}%`;
});

function seletorPagina (){
    if(paginaAtual === 0){
        resultadoFinal = 0;
        enunciadoPrincipal.innerHTML = `OlÃ¡! Vamos calcular sua pegada ecolÃ³gica? `;
        botaoPrincipal.innerHTML = 'Iniciar';
    }else if(paginaAtual === 1){
        enunciadoPrincipal.innerHTML = '';
        enunciadoPrincipal.appendChild(inputNome);
        inputNome.value = '';
        inputNome.classList.add('input-text');
        inputNome.setAttribute('placeholder', 'Digite o seu nome:');
        botaoPrincipal.innerHTML = 'Continuar';
    }else if(paginaAtual === 2){
        enunciadoPrincipal.innerHTML = `${nome}, com que frequÃªncia vocÃª consome produtos de origem animal?`;
        inputRange.value = '50';
        labelRange.innerHTML = "50%";
        enunciadoPrincipal.appendChild(inputRange);
        enunciadoPrincipal.appendChild(labelRange); 
    }else if(paginaAtual === 3){
        inputRange.value = '50';
        labelRange.innerHTML = "50%";
        enunciadoPrincipal.innerHTML = `${nome}, dos alimentos que consome, qual a percentagem de comida nÃ£o processada, nÃ£o embalada ou cultivada localmente?`
        enunciadoPrincipal.appendChild(inputRange);
        enunciadoPrincipal.appendChild(labelRange); 
    }else if(paginaAtual === 4){
        enunciadoPrincipal.innerHTML = `${nome}, quantas pessoas residem no teu agregado familiar?`;
        enunciadoPrincipal.appendChild(inputNumber);
        inputNumber.value = 1;
        inputNumber.classList.add('input-number');
    }else if(paginaAtual === 5){
        enunciadoPrincipal.innerHTML = `${nome}, vocÃª tem energia elÃ©trica em casa?`;
        enunciadoPrincipal.appendChild(inputBox);
        inputBox.appendChild(divRadio1);
        inputBox.appendChild(divRadio2);
        divRadio1.appendChild(inputRadioNao);
        divRadio2.appendChild(inputRadioSim);
        divRadio1.appendChild(labelRadioNao);
        divRadio2.appendChild(labelRadioSim);
        divRadio1.classList.add('radio');
        divRadio2.classList.add('radio');
    }else if(paginaAtual === 6){
        enunciadoPrincipal.innerHTML = `${nome}, com que frequÃªncia viaja de aviÃ£o anualmente?`;
        inputRange.value = '50';
        labelRange.innerHTML = "50%";
        enunciadoPrincipal.appendChild(inputRange);
        enunciadoPrincipal.appendChild(labelRange); 
    }else if(paginaAtual === 7){
        calculaResultado();
        enunciadoPrincipal.innerHTML = `<p class="descricao-resultado">Aqui estÃ¡ sua pegada ecolÃ³gica, ${nome}!</p>`;
        enunciadoPrincipal.appendChild(divResultado);
        divResultado.appendChild(imgResultado);
        divResultado.appendChild(textoResultado);
        textoResultado.innerHTML = `${qtdPlanetas} planetas.`;
        enunciadoPrincipal.innerHTML += `<p class="descricao-resultado">Como seria se todos no mundo vivessem como vocÃª?</p>`;
        enunciadoPrincipal.innerHTML += `<p class="descricao-resultado">VocÃª demorou ${adicionaZeroTempo(timer.getMinutes())}:${adicionaZeroTempo(timer.getSeconds())}s para responder esse questionÃ¡rio.</p>`;
        botaoPrincipal.innerHTML = "Refazer";
        enunciadoPrincipal.style.width = "100%";
        botaoPrincipal.style.marginBottom = "20px";
    }
}

function calculaResultado () {
    pontos[0] = (Math.floor(respostas[0]/20)) * 5;//consumo de carne animal
    let i = (Math.floor(respostas[1]/20));
    pontos[1] = (5 - i) * 5;//consumo de alimentos vegetal
    if(respostas[2] <= 2){//agregado familiar
        pontos[2] = 5;
    }else if(respostas[2] <= 5){
        pontos[2] = 10;
    }else{
        pontos[2] = 20;
    }

    pontos[3] = respostas[3] * 20; //energia eletrica
    pontos[4] = (Math.floor(respostas[4]/20)) * 5;//aviÃ£o

    for(let i = 0; i < 5; i++) {
        resultadoFinal += pontos[i];
    }

    qtdPlanetas = Math.floor(resultadoFinal/20);
}

function adicionaZeroTempo (numero) {
    if(numero < 10) {
        return `0${numero}`;
    } else {
        return numero;
    }
}