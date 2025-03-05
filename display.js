
var pratos = document.querySelectorAll('.pratos > div');
var bebidas = document.querySelectorAll('.bebidas > div');
var sobremesas = document.querySelectorAll('.sobremesas > div');


var pratoSelecionado = null;
var bebidaSelecionada = null;
var sobremesaSelecionada = null;


function adicionarBordaVerde(event) {
    var elementos = event.currentTarget.parentElement.children;
    for (var i = 0; i < elementos.length; i++) {
        elementos[i].style.border = "none";
    }
    event.currentTarget.style.border = "3px solid #32B72F";

   
    if (event.currentTarget.parentElement.classList.contains('pratos')) {
        pratoSelecionado = event.currentTarget;
    } else if (event.currentTarget.parentElement.classList.contains('bebidas')) {
        bebidaSelecionada = event.currentTarget;
    } else if (event.currentTarget.parentElement.classList.contains('sobremesas')) {
        sobremesaSelecionada = event.currentTarget;
    }

   
    console.log('Prato selecionado:', pratoSelecionado ? pratoSelecionado.innerText : 'Nenhum');
    console.log('Bebida selecionada:', bebidaSelecionada ? bebidaSelecionada.innerText : 'Nenhum');
    console.log('Sobremesa selecionada:', sobremesaSelecionada ? sobremesaSelecionada.innerText : 'Nenhum');

   
    verificarSelecao();
}


function verificarSelecao() {
    if (pratoSelecionado && bebidaSelecionada && sobremesaSelecionada) {
        var botao = document.getElementById('botao');
        botao.style.backgroundColor = '#32B72F';
        botao.innerText = 'Fechar Pedido';
        botao.onclick = mostrarCarrinho;
    }
}

function mostrarCarrinho() {
    var carrinho = document.getElementById('carrinho');
    var overlay = document.getElementById('overlay');
    carrinho.style.display = 'block';
    overlay.style.display = 'block';

  
    document.body.classList.add('fundo-opaco');


    var pratoNome = pratoSelecionado.querySelector('h4').innerText;
    var pratoPreco = pratoSelecionado.querySelector('p:last-of-type').innerText;
    var bebidaNome = bebidaSelecionada.querySelector('h4').innerText;
    var bebidaPreco = bebidaSelecionada.querySelector('p:last-of-type').innerText;
    var sobremesaNome = sobremesaSelecionada.querySelector('h4').innerText;
    var sobremesaPreco = sobremesaSelecionada.querySelector('p:last-of-type').innerText;

    document.getElementById('pf').innerText = pratoNome + ' - ' + pratoPreco;
    document.getElementById('suco').innerText = bebidaNome + ' - ' + bebidaPreco;
    document.getElementById('lanchinho').innerText = sobremesaNome + ' - ' + sobremesaPreco;

  
    var precoTotal = parseFloat(pratoPreco.replace('R$', '').replace(',', '.')) +
                     parseFloat(bebidaPreco.replace('R$', '').replace(',', '.')) +
                     parseFloat(sobremesaPreco.replace('R$', '').replace(',', '.'));
    document.getElementById('preco_total').innerText = 'Total: R$ ' + precoTotal.toFixed(2).replace('.', ',');

    
    var mensagem = `Olá, gostaria de fazer um pedido: ${pratoNome}, ${bebidaNome}, ${sobremesaNome}. Total: R$ ${precoTotal.toFixed(2).replace('.', ',')}`;
    var linkWhatsApp = `https://wa.me//5571999531468?text=${encodeURIComponent(mensagem)}`;
    document.getElementById('zap-link').href = linkWhatsApp;
}


pratos.forEach(function(prato) {
    prato.addEventListener('click', adicionarBordaVerde);
});


bebidas.forEach(function(bebida) {
    bebida.addEventListener('click', adicionarBordaVerde);
});


sobremesas.forEach(function(sobremesa) {
    sobremesa.addEventListener('click', adicionarBordaVerde);
});

function voltar() {
    document.getElementById('carrinho').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.body.classList.remove('fundo-opaco');
}