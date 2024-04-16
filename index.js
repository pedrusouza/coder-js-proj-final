  import { Produtos } from "./Produtos.js";

  const listaDeProdutos = [];

      const resultadoElemento = document.getElementById('resultado');

      function exibirResultado(mensagem) {
        document.getElementById('resultadoTexto').innerText = mensagem;
        $('#resultadoModal').modal('show');
      }

      //Modal de buscar produto
      function exibirModalBuscarProduto() {
        $('#buscarProdutoModal').modal('show');
      }

// Atualize os event listeners para chamar as funções corretas ao clicar nos botões
document.getElementById('buscarProduto').addEventListener('click', exibirModalBuscarProduto);

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


      function adicionarOpcoesTamanho(tipoProdutoSelecionado) {
        const tamProdutoDiv = document.getElementById('tamProduto');
        tamProdutoDiv.innerHTML = ''; // Limpa as opções existentes
      
        let opcoesTamanho = [];
      
        // Determina as opções de tamanho com base no tipo de produto
        switch (tipoProdutoSelecionado) {
          case 'Camisetas':
            opcoesTamanho = ['PP', 'P', 'M', 'G', 'GG', 'Único'];
            break;
          case 'Bermudas / Shorts':
            opcoesTamanho = ['PP', 'P', 'M', 'G', 'GG', 'Único'];
            break;
          case 'Tênis / Sapatos':
            opcoesTamanho = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44'];
            break;
          case 'Acessórios':
            opcoesTamanho = ['Tamanho único'];
            break;
          default:
            break;
        }
      
        // Adiciona as opções de tamanho ao select
        opcoesTamanho.forEach(opcao => {
          const checkboxDiv = document.createElement('div');
          checkboxDiv.classList.add('form-check');

          const checkboxInput = document.createElement('input');
          checkboxInput.type = 'checkbox';
          checkboxInput.classList.add('form-check-input');
          checkboxInput.value = opcao;
          checkboxInput.id = `tam-${opcao}`;
          checkboxInput.name = 'tamanho';
          
          const checkboxLabel = document.createElement('label');
          checkboxLabel.classList.add('form-check-label');
          checkboxLabel.htmlFor = `tam-${opcao}`;
          checkboxLabel.textContent = opcao;

          checkboxDiv.appendChild(checkboxInput);
          checkboxDiv.appendChild(checkboxLabel);

          tamProdutoDiv.appendChild(checkboxDiv);
        });
      }
      
      // Modifique o evento 'change' do tipo de produto para chamar a função adicionarOpcoesTamanho com o tipo de produto selecionado
      document.getElementById('tipoProduto').addEventListener('change', function() {
        const tipoProdutoSelecionado = this.value;
        adicionarOpcoesTamanho(tipoProdutoSelecionado);
      });
    
          document.getElementById('formCadastro').addEventListener('submit', function(event) {
          event.preventDefault();
        
          const nomeProduto = document.getElementById('nomeProduto').value;
          const tipoProduto = document.getElementById('tipoProduto').value;
          const qtProduto = document.getElementById('qtProduto').value;
          const checkboxesSelecionadas = document.querySelectorAll('input[name="tamanho"]:checked');
          const tamanhosSelecionados = Array.from(checkboxesSelecionadas).map(checkbox => checkbox.value);
          const vlProduto = parseInt(document.getElementById('vlProduto').value);

        

          let novoProduto = new Produtos(nomeProduto, tipoProduto, qtProduto, tamanhosSelecionados, vlProduto); 
          listaDeProdutos.push(novoProduto);
          document.getElementById('formCadastro').style.display = 'none';

          exibirResultado('Produto cadastrado!');
      });

      function buscarProduto() {
        $('#buscarProdutoModal').modal('show');
      
      
      // Adicione um event listener para o botão de buscar dentro do modal
      document.getElementById('btnBuscarProduto').addEventListener('click', function() {
        // Recupere o texto inserido pelo usuário
        const buscarNome = document.getElementById('buscarNomeProduto').value.toLowerCase();
        
        // Faça a busca no array de produtos
        const produtoEncontrado = listaDeProdutos.find(produto => produto.nome.toLowerCase() === buscarNome);
      
        // Exiba o resultado
        if (produtoEncontrado) {
          exibirResultado(`Nome: ${produtoEncontrado.nome}, Tipo: ${produtoEncontrado.tipo}, Quantidade: ${produtoEncontrado.quantidade}, Tamanhos Disponíveis: ${produtoEncontrado.tamanho}, Valor Unitário: R$ ${produtoEncontrado.valor.toLocaleString('pt-BR')}`);
        } else {
          exibirResultado('O produto informado não está cadastrado!');
        }
      
        // Feche o modal
        $('#buscarProdutoModal').modal('hide');
      });
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

      document.getElementById('abrirFormulario').addEventListener('click', function() {
        $('#formularioModal').modal('show');
      });
      document.getElementById('cadastrarVenda').addEventListener('click', cadastrarVenda);
      document.getElementById('buscarProduto').addEventListener('click', buscarProduto);
      document.getElementById('verificarEstoque').addEventListener('click', verificarEstoque);
      export { cadastrarVenda, buscarProduto, verificarEstoque };
