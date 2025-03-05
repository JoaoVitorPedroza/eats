// Seleciona todos os elementos de pratos, bebidas e sobremesas
var pratos = document.querySelectorAll('.pratos > div');
var bebidas = document.querySelectorAll('.bebidas > div');
var sobremesas = document.querySelectorAll('.sobremesas > div');

// Variáveis para armazenar os itens selecionados
var pratoSelecionado = null;
var bebidaSelecionada = null;
var sobremesaSelecionada = null;

// Função para adicionar borda verde ao elemento clicado, remover dos outros e capturar o item clicado
function adicionarBordaVerde(event) {
    var elementos = event.currentTarget.parentElement.children;
    for (var i = 0; i < elementos.length; i++) {
        elementos[i].style.border = "none";
    }
    event.currentTarget.style.border = "3px solid #32B72F";

    // Captura o item clicado e atribui à variável correspondente
    if (event.currentTarget.parentElement.classList.contains('pratos')) {
        pratoSelecionado = event.currentTarget;
    } else if (event.currentTarget.parentElement.classList.contains('bebidas')) {
        bebidaSelecionada = event.currentTarget;
    } else if (event.currentTarget.parentElement.classList.contains('sobremesas')) {
        sobremesaSelecionada = event.currentTarget;
    }

    // Exibe os itens selecionados no console
    console.log('Prato selecionado:', pratoSelecionado ? pratoSelecionado.innerText : 'Nenhum');
    console.log('Bebida selecionada:', bebidaSelecionada ? bebidaSelecionada.innerText : 'Nenhum');
    console.log('Sobremesa selecionada:', sobremesaSelecionada ? sobremesaSelecionada.innerText : 'Nenhum');

    // Verifica se todos os itens foram selecionados
    verificarSelecao();
}

// Função para verificar se todos os itens foram selecionados
function verificarSelecao() {
    if (pratoSelecionado && bebidaSelecionada && sobremesaSelecionada) {
        var botao = document.getElementById('botao');
        botao.style.backgroundColor = '#32B72F';
        botao.innerText = 'Fechar Pedido';
        botao.onclick = mostrarCarrinho;
    }
}

// Função para exibir o carrinho
function mostrarCarrinho() {
    var carrinho = document.getElementById('carrinho');
    var overlay = document.getElementById('overlay');
    carrinho.style.display = 'block';
    overlay.style.display = 'block';

    // Adiciona a classe para tornar o fundo opaco
    document.body.classList.add('fundo-opaco');

    // Atualiza o carrinho com os itens selecionados
    var pratoNome = pratoSelecionado.querySelector('h4').innerText;
    var pratoPreco = pratoSelecionado.querySelector('p:last-of-type').innerText;
    var bebidaNome = bebidaSelecionada.querySelector('h4').innerText;
    var bebidaPreco = bebidaSelecionada.querySelector('p:last-of-type').innerText;
    var sobremesaNome = sobremesaSelecionada.querySelector('h4').innerText;
    var sobremesaPreco = sobremesaSelecionada.querySelector('p:last-of-type').innerText;

    document.getElementById('pf').innerText = pratoNome + ' - ' + pratoPreco;
    document.getElementById('suco').innerText = bebidaNome + ' - ' + bebidaPreco;
    document.getElementById('lanchinho').innerText = sobremesaNome + ' - ' + sobremesaPreco;

    // Calcula o preço total
    var precoTotal = parseFloat(pratoPreco.replace('R$', '').replace(',', '.')) +
                     parseFloat(bebidaPreco.replace('R$', '').replace(',', '.')) +
                     parseFloat(sobremesaPreco.replace('R$', '').replace(',', '.'));
    document.getElementById('preco_total').innerText = 'Total: R$ ' + precoTotal.toFixed(2).replace('.', ',');

    // Atualiza o link do WhatsApp
    var mensagem = `Olá, gostaria de fazer um pedido: ${pratoNome}, ${bebidaNome}, ${sobremesaNome}. Total: R$ ${precoTotal.toFixed(2).replace('.', ',')}`;
    var linkWhatsApp = `https://wa.me//5571999531468?text=${encodeURIComponent(mensagem)}`;
    document.getElementById('zap-link').href = linkWhatsApp;
}

// Adiciona o evento de clique a cada elemento de pratos
pratos.forEach(function(prato) {
    prato.addEventListener('click', adicionarBordaVerde);
});

// Adiciona o evento de clique a cada elemento de bebidas
bebidas.forEach(function(bebida) {
    bebida.addEventListener('click', adicionarBordaVerde);
});

// Adiciona o evento de clique a cada elemento de sobremesas
sobremesas.forEach(function(sobremesa) {
    sobremesa.addEventListener('click', adicionarBordaVerde);
});

// Função para voltar e esconder o carrinho
function voltar() {
    document.getElementById('carrinho').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.body.classList.remove('fundo-opaco');
}