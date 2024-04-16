  import { Produtos } from "./Produtos.js";

  const listaDeProdutos = [];

      const resultadoElemento = document.getElementById('resultado');

      //Modal utilizado para dar a resposta após a pesquisa ou cadastro de produtos
      function exibirResultado(mensagem) {
        document.getElementById('resultadoTexto').innerText = mensagem;
        $('#resultadoModal').modal('show');
      }

      //Modal de buscar produto
      function exibirModalBuscarProduto() {
        $('#buscarProdutoModal').modal('show');
      }

document.getElementById('buscarProduto').addEventListener('click', exibirModalBuscarProduto);

//Função para cadastrar a venda e mostrar os produtos já cadastrados
function exibirModalCadastrarVenda() {
  const modalBody = document.getElementById('modalCadastrarVendaBody');
  modalBody.innerHTML = '';

  const form = document.createElement('form');

  const selectProduto = document.createElement('select');
  selectProduto.classList.add('form-select');
  selectProduto.setAttribute('aria-label', 'Selecionar produto');

  const defaultOption = document.createElement('option');
  defaultOption.text = 'Selecione um produto';
  defaultOption.disabled = true;
  defaultOption.selected = true;
  selectProduto.appendChild(defaultOption);

  listaDeProdutos.forEach(produto => {
    const option = document.createElement('option');
    option.value = produto.nome;
    option.text = `${produto.nome} - Tamanhos disponíveis: ${produto.tamanho.join(', ')}`;
    selectProduto.appendChild(option);
  });

  selectProduto.addEventListener('change', function() {
    const tamanhoProdutoDiv = document.getElementById('tamanhoProdutoDiv');
    tamanhoProdutoDiv.innerHTML = '';

    const produtoSelecionado = listaDeProdutos.find(produto => produto.nome === selectProduto.value);
    if (produtoSelecionado) {
      produtoSelecionado.tamanho.forEach(tamanho => {
        const checkboxDiv = document.createElement('div');
        checkboxDiv.classList.add('form-check');

        const checkboxInput = document.createElement('input');
        checkboxInput.type = 'checkbox';
        checkboxInput.classList.add('form-check-input');
        checkboxInput.value = tamanho;
        checkboxInput.id = `tamanho-${tamanho}`;
        checkboxInput.name = 'tamanho';
        
        const checkboxLabel = document.createElement('label');
        checkboxLabel.classList.add('form-check-label');
        checkboxLabel.htmlFor = `tamanho-${tamanho}`;
        checkboxLabel.textContent = tamanho;

        checkboxDiv.appendChild(checkboxInput);
        checkboxDiv.appendChild(checkboxLabel);

        tamanhoProdutoDiv.appendChild(checkboxDiv);
      });
    }
  });

  form.appendChild(selectProduto);
  const tamanhoProdutoDiv = document.createElement('div');
  tamanhoProdutoDiv.id = 'tamanhoProdutoDiv';
  form.appendChild(tamanhoProdutoDiv);

  const inputQuantidade = document.createElement('input');
  inputQuantidade.type = 'number';
  inputQuantidade.placeholder = 'Quantidade vendida';
  inputQuantidade.classList.add('form-control', 'mt-3');
  form.appendChild(inputQuantidade);

  const btnEnviar = document.createElement('button');
  btnEnviar.type = 'button';
  btnEnviar.textContent = 'Cadastrar Venda';
  btnEnviar.classList.add('btn', 'btn-dark', 'mt-3');
  btnEnviar.addEventListener('click', function() {
    const nomeProduto = selectProduto.value;
    const quantidade = parseInt(inputQuantidade.value);
    const checkboxesSelecionadas = document.querySelectorAll('input[name="tamanho"]:checked');
    const tamanhosSelecionados = Array.from(checkboxesSelecionadas).map(checkbox => checkbox.value);

    const produtoVendido = listaDeProdutos.find(produto => produto.nome === nomeProduto);

    if (produtoVendido) {
      if (quantidade <= produtoVendido.quantidade && tamanhosSelecionados.every(tamanho => produtoVendido.tamanho.includes(tamanho))) {
        produtoVendido.quantidade -= quantidade;
        tamanhosSelecionados.forEach(tamanho => {
          produtoVendido.tamanho.splice(produtoVendido.tamanho.indexOf(tamanho), 1);
        });
        $('#modalCadastrarVenda').modal('hide');
        exibirResultado(`Venda registrada com sucesso. Quantidade restante de ${produtoVendido.nome}: ${produtoVendido.quantidade}`);
      } else {
        exibirResultado("Quantidade ou tamanho inválido. Por favor, verifique e tente novamente.");
      }
    } else {
      exibirResultado("Produto não encontrado. Por favor, verifique o nome e tente novamente.");
    }
  });
  form.appendChild(btnEnviar);

  modalBody.appendChild(form);

  $('#modalCadastrarVenda').modal('show');
}


document.getElementById('btnAbrirModalCadastrarVenda').addEventListener('click', exibirModalCadastrarVenda);

      function adicionarOpcoesTamanho(tipoProdutoSelecionado) {

        const tamProdutoDiv = document.getElementById('tamProduto');
        tamProdutoDiv.innerHTML = '';
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
        if (tipoProdutoSelecionado == '') {
          alert('Por favor, selecione uma opção válida.');
        }
        else{
          adicionarOpcoesTamanho(tipoProdutoSelecionado);
        }
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
          $('#formularioModal').modal('hide');
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
      document.getElementById('btnAbrirModalCadastrarVenda').addEventListener('click', exibirModalCadastrarVenda);
      document.getElementById('buscarProduto').addEventListener('click', buscarProduto);
      document.getElementById('verificarEstoque').addEventListener('click', verificarEstoque);
