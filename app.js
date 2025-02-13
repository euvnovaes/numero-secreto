let numerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
exibirMsgInicial();

function exibirTextoNaTela(tag, texto) { // Esta função exibe um texto na tela, recebendo como parâmetro a tag e o texto a ser exibido
    let campo = document.querySelector(tag);
    campo.innerHTML = texto
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1;
        window.speechSynthesis.speak(utterance);
    } else
        console.log('Web Speech API não suportada neste navegador.');
}

function exibirMsgInicial() { // Esta função exibe a mensagem inicial do jogo, com o título e a instrução
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Tente adivinhar o número secreto entre 1 e ${numeroLimite}`);
}


function verificarChute() { // Esta função verifica se o chute do usuário é igual ao número secreto
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou em ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if (chute > numeroSecreto)
            exibirTextoNaTela('p', 'O número secreto é menor');
        else
            exibirTextoNaTela('p', 'O número secreto é maior');
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() { // Esta função gera um número aleatório entre 1 e 10
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // Gera um número aleatório entre 1 e 10
    let quantidadeNumerosSorteados = numerosSorteados.length; // Verifica a quantidade de números sorteados

    if (quantidadeNumerosSorteados == numeroLimite) // Se a quantidade de números sorteados for igual a 10, limpa o array
        numerosSorteados = [];

    if (numerosSorteados.includes(numeroEscolhido))
        return gerarNumeroAleatorio();
    else {
        numerosSorteados.push(numeroEscolhido);
        console.log(numerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() { // Esta função limpa o campo de input do html
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() { // Esta função reinicia o jogo, gerando um novo número secreto e limpando o campo de input
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMsgInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}