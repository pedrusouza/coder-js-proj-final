class Produtos {
    constructor (nome, tipo, quantidade, tamanho, valor){
        this.nome = nome;
        this.tipo = tipo;
        this.quantidade = quantidade;
        this.tamanho = tamanho;
        this.valor = valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    }
}

const listaDeProdutos = [];

//funcao para cadastrar vendas
cadastrarVenda = () => {


    const excluirProduto = prompt('Informe o nome do produto vendido');
    
    
    const produtoVendido = listaDeProdutos.find(exclusaoProduto => exclusaoProduto.nome === excluirProduto);
    
    if (produtoVendido){
        const qntVendida = parseInt(prompt('Informe a quantidade de itens vendidos desse produto'));
        const tamVendido = prompt('Informe o(s) tamanho(s) vendido(s)');
    

        if (qntVendida <= produtoVendido.quantidade && produtoVendido.tamanho.includes(tamVendido)){
            produtoVendido.quantidade -= qntVendida;
            
            console.log(`Venda registrada com sucesso. Quantidade restante de ${produtoVendido.nome}: ${produtoVendido.quantidade}`);
            alert('Venda registrada com sucesso. Obrigado!');
            menuInicial();
        } else {
            console.log("Quantidade ou tamanho inválido. Por favor, verifique e tente novamente.");
            alert('Quantidade ou tamanho inválido. Por favor, verifique e tente novamente.');
            menuInicial();
        }
    } else {
    console.log("Produto não encontrado. Por favor, verifique o nome e tente novamente.");
    alert('Produto não encontrado. Por favor, verifique o nome e tente novamente.');
    menuInicial();
    }
}


//Funcao para cadastro dos produtos
casdastroDosProdutos = () => {

let opcaoCadastro = 2;

//Condicao caso o usuario queira cadastrar outro produto seguido
while (opcaoCadastro == 2){
    let nomeProduto = prompt('Informe o nome do produto');
    let tipoProduto = prompt('Informe o tipo de produto\n'+
                                '-> Camisetas\n'+
                                '-> Bermudas / Shorts \n'+
                                '-> Tênis / Sapatos \n'+
                                '-> Acessórios');
    let qtProduto = prompt('Informe a quantidade disponível');
    let tamProduto = prompt('Tem variedade de tamanhos?\n'+
                                '(1) Sim  (2) Não');
        switch (tamProduto){
            case '1':
                tamProduto = prompt("Informe os tamanhos disponíveis (separados por vírgula):").split(",");
                break;
            case '2':
                tamProduto = 'Tamanho unico';
                break;
        }

    const vlProduto = parseInt(prompt('Informe o valor do produto'));

    let novoProduto = new Produtos(nomeProduto, tipoProduto, qtProduto, tamProduto, vlProduto); 
    listaDeProdutos.push(novoProduto);


    alert('Produto cadastrado!');

    opcaoCadastro = prompt('(1) Voltar ao menu principal\n'+
            '(2) Cadastrar outro produto')
        
    if (opcaoCadastro == 1){
        menuInicial();
    }
}
}


//Funcao para buscar o produto
buscarProduto = () => {

let opcaoBuscador = 2;

while (opcaoBuscador == 2){
    const buscarNome = prompt('Informe o nome do produto');

    listaDeProdutos.forEach(produto => {
        if (produto.nome.toLocaleLowerCase === buscarNome.toLocaleLowerCase){
            console.log(`Nome: ${produto.nome}, Tipo: ${produto.tipo}, Quantidade: ${produto.quantidade}, Tamanhos Disponíveis: ${produto.tamanho}, Valor Unitário: ${produto.valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`);
    
        } else{
            console.log('O produto informado não está cadastrado!')
        }
    })


    opcaoBuscador = prompt('(1) Voltar ao menu principal\n'+
    '(2) Buscar novamente')
    if (opcaoBuscador == 1){
        menuInicial();
    }
}
}





//Funcao para verificar as opcoes do menu
menuInicial = () => {
    const menu = prompt ('Você está no programa de cadastro de estoque!\n' +
    'Informe uma opção válida:\n'+
    '(1) Verificar estoque\n'+
    '(2) Cadastrar produto\n'+
    '(3) Buscar produto\n'+
    '(4) Cadastrar uma venda\n'+
    '(5) Encerrar programa');


switch (menu){
    case '1':
        if (listaDeProdutos.length == 0){
            alert('Lista de produtos vazia!')
        }else{
            listaDeProdutos.forEach(estoque => {
                console.log(`NOME: ${estoque.nome}\n` +
                `TIPO: ${estoque.tipo}\n` +
                `QUANTIDADE: ${estoque.quantidade}\n` +
                `TAMANHO(S): ${estoque.tamanho}\n` +
                `R$: ${estoque.valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`);
            });
        }
        menuInicial()
        break;
    case '2':
        casdastroDosProdutos();
        break;
    case '3':
        buscarProduto();
        break;
    case '4':
        cadastrarVenda();
        break;
    default:
        console.log('Programa encerrado!')
    }
        
}

menuInicial();





