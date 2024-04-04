import { Produtos } from "./Produtos.js";

    const listaDeProdutos = [];

    const resultadoElemento = document.getElementById('resultado');

    function exibirResultado(mensagem) {
      resultadoElemento.innerText = mensagem;
    }

    function cadastrarVenda() {
      const excluirProduto = prompt('Informe o nome do produto vendido');
      const produtoVendido = listaDeProdutos.find(exclusaoProduto => exclusaoProduto.nome === excluirProduto);

      let qntVendida;
      let tamVendido;

      if (produtoVendido) {
        qntVendida = parseInt(prompt('Informe a quantidade de itens vendidos desse produto'));
        tamVendido = prompt('Informe o(s) tamanho(s) vendido(s)');

        if (qntVendida <= produtoVendido.quantidade && produtoVendido.tamanho.includes(tamVendido)) {
          produtoVendido.quantidade = produtoVendido.quantidade - qntVendida;
          produtoVendido.tamanho.pop(tamVendido);
          exibirResultado(`Venda registrada com sucesso. Quantidade restante de ${produtoVendido.nome}: ${produtoVendido.quantidade}`);
        } else {
          exibirResultado("Quantidade ou tamanho inválido. Por favor, verifique e tente novamente.");
        }
      } else {
        exibirResultado("Produto não encontrado. Por favor, verifique o nome e tente novamente.");
      }
    }

        document.getElementById('abrirFormulario').addEventListener('click', function() {
        document.getElementById('formulario').style.display = 'block';
      });

      document.getElementById('tipoProduto').addEventListener('change', function() {
        const tipoProdutoSelecionado = this.value;
        const tamProdutoSelect = document.getElementById('tamProduto');
        tamProdutoSelect.innerHTML = '';
        
        switch (tipoProdutoSelecionado) {
          case 'Camisetas':
            adicionarOpcoesTamanho(['PP', 'P' , 'M', 'G', 'GG']);
            break;
          case 'Bermudas / Shorts':
            adicionarOpcoesTamanho(['PP', 'P', 'M', 'G', 'GG']);
            break;
          case 'Tênis / Sapatos':
            adicionarOpcoesTamanho(['35', '36', '37', '38', '39', '40', '41', '42', '43', '44']);
            break;
          default:
            break;
        }
      });
      
      function adicionarOpcoesTamanho(opcoesTamanho) {
        const tamProdutoSelect = document.getElementById('tamProduto');
        opcoesTamanho.forEach(opcao => {
          const option = document.createElement('option');
          option.text = opcao;
          option.value = opcao;
          tamProdutoSelect.add(option);
        });
      }
  
        document.getElementById('formCadastro').addEventListener('submit', function(event) {
        event.preventDefault();
      
        const nomeProduto = document.getElementById('nomeProduto').value;
        const tipoProduto = document.getElementById('tipoProduto').value;
        const qtProduto = document.getElementById('qtProduto').value;
        const tamProdutoSelect = document.getElementById('tamProduto');
        const selectedOptions = Array.from(tamProdutoSelect.selectedOptions); // Obtém todas as opções selecionadas
        const tamanhosSelecionados = selectedOptions.map(option => option.value)
        const vlProduto = parseInt(document.getElementById('vlProduto').value);

      

        let novoProduto = new Produtos(nomeProduto, tipoProduto, qtProduto, tamanhosSelecionados, vlProduto); 
        listaDeProdutos.push(novoProduto);
        document.getElementById('formulario').style.display = 'none';

        exibirResultado('Produto cadastrado!');
    });


    function buscarProduto() {
      let opcaoBuscador = 2;

      while (opcaoBuscador == 2) {
        const buscarNome = prompt('Informe o nome do produto');

        const produtoEncontrado = listaDeProdutos.find(produto => produto.nome.toLowerCase() === buscarNome.toLowerCase());

        if (produtoEncontrado) {
          exibirResultado(`Nome: ${produtoEncontrado.nome}, Tipo: ${produtoEncontrado.tipo}, Quantidade: ${produtoEncontrado.quantidade}, Tamanhos Disponíveis: ${produtoEncontrado.tamanho}, Valor Unitário: R$ ${produtoEncontrado.valor.toLocaleString('pt-BR')}`);
        } else {
          exibirResultado('O produto informado não está cadastrado!');
        }

        opcaoBuscador = prompt('(1) Voltar ao menu principal\n'+
          '(2) Buscar novamente');

        if (opcaoBuscador == 1) {
          break;
        }
      }
    }

    function verificarEstoque() {
      if (listaDeProdutos.length === 0) {
        exibirResultado('Lista de produtos vazia!');
      } else {
        let resultado = '';
        listaDeProdutos.forEach(produto => {
          resultado += `NOME: ${produto.nome}\n` +
                      `TIPO: ${produto.tipo}\n` +
                      `QUANTIDADE: ${produto.quantidade}\n` +
                      `TAMANHO(S): ${produto.tamanho}\n` +
                      `${produto.valor.toLocaleString('pt-BR')}\n\n`;
        });
        exibirResultado(resultado);
      }
    }

    document.getElementById('cadastrarVenda').addEventListener('click', cadastrarVenda);
    document.getElementById('buscarProduto').addEventListener('click', buscarProduto);
    document.getElementById('verificarEstoque').addEventListener('click', verificarEstoque);

    export { cadastrarVenda, buscarProduto, verificarEstoque };