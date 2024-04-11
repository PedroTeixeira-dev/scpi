  // criando o aray que irá armazenar as pendencias criadas.

  let pendencias = []

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/pendencias';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.pendencias.forEach(item => insertList(item))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputAutor, inputTitulo, inputEquipamento, inputDescricao, inputStatus) => {
  const formData = new FormData();
  formData.append('autor', inputAutor);
  formData.append('titulo', inputTitulo);
  formData.append('equipamento', inputEquipamento);
  formData.append('descricao', inputDescricao);
  formData.append('status', inputStatus)

  let url = 'http://127.0.0.1:5000/pendencia';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/pendencia?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

// criando a classe das pendeências. 

class Pendencia {
    constructor(autor, titulo, equipamento, descricao, status = 'Em aberto') {
      this.autor = autor;
      this.titulo = titulo;
      this.equipamento = equipamento;
      this.descricao = descricao;
      this.status = status;
    }
  }


  
  // função responsável pela criacao de um novo item (pendencia).

  const newItem = () => {
      
      const inputAutor = document.getElementById("newAutor").value;
      const inputTitulo = document.getElementById("newTitulo").value;
      const inputEquipamento = document.getElementById("newEquipamento").value;
      const inputDescricao = document.getElementById("newDescricao").value;
      const inputStatus = document.getElementById("newStatus").value;

      // validacão inicial dos dados.

      const existePendencia = pendencias.some(pendencia => pendencia.titulo === inputTitulo);
      if (existePendencia) {
          alert("Já existe uma pendência com esse título, favor escolher outro");
      } 
      else if (inputTitulo.length == 0 || inputDescricao.length == 0 || inputAutor.length == 0) {
        alert("Insira o título, descricão e autor"); 
      }
      
      else {
          postItem(inputAutor, inputTitulo, inputEquipamento, inputDescricao, inputStatus)

          const novaPendencia = new Pendencia(inputAutor, inputTitulo, inputEquipamento, inputDescricao, inputStatus);
          insertList(novaPendencia);
          atualizarDashboard()
      }
  }
  
  // funcão que inseri os dados da pendencia na tabela.

  const insertList = (novaPendencia) => {

    console.log(novaPendencia)
    
    pendencias.push(novaPendencia)

    const table = document.getElementById('myTable');
    const row = table.insertRow();
  
    const cellAutor = row.insertCell();
    cellAutor.textContent = novaPendencia.autor;

    const cellTitulo = row.insertCell()
    cellTitulo.textContent = novaPendencia.titulo 

    const cellEquipamento = row.insertCell()
    cellEquipamento.textContent = novaPendencia.equipamento

    const cellDescricao = row.insertCell()
    cellDescricao.textContent = novaPendencia.descricao
      
    cellStatus = row.insertCell();
    cellStatus.textContent = novaPendencia.status;
    cellStatus.setAttribute('contenteditable', 'false'); // Impede edição direta na tabela.
    
    const editCell = row.insertCell();
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.onclick = function() {
      editStatus(row);
    };
    editCell.appendChild(editButton);
    
    // faz o "reset" do imput.

    document.getElementById("newAutor").value = "";
    document.getElementById("newTitulo").value = "";
    document.getElementById("newEquipamento").value = "";
    document.getElementById("newDescricao").value = "";

    insertButton(row.insertCell(-1));
    removeElement()
    atualizarDashboard()
  }
  
  // função para fazer a edicão do status da pendência.

  const editStatus = (row) => {
    const tituloDaAlteracao = row.cells[1].textContent; // Obtém o título da pendência.
    const statusCell = row.cells[4]; // Índice da coluna de status (começando de 0).
    const status = statusCell.textContent;
    
    // Criar um novo select para escolher o status.
    const selectStatus = document.createElement('select');
    const statusOptions = ['Em aberto', 'Em tratamento', 'Concluída'];
    statusOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        if (option === status) {
            optionElement.selected = true;
        }
        selectStatus.appendChild(optionElement);
    });
  
    // Substituir o conteúdo da célula pelo select.
    statusCell.textContent = '';
    statusCell.appendChild(selectStatus);
  
    // Adicionar evento para salvar o novo status ao selecionar uma opção.
    selectStatus.addEventListener('change', () => {
        const novoStatus = selectStatus.value;

        // altera o status no aray pendências.
        for (let pendencia of pendencias) {
            if (pendencia.titulo === tituloDaAlteracao) {
                pendencia.status = novoStatus;
                console.log(pendencia.status);
                console.log(pendencias);
                break;
            }
        }
        statusCell.textContent = novoStatus
        atualizarDashboard()
    });
}

  
  // funcão para inserir o botão de "close".
  const insertButton = (parent) => {
    const span = document.createElement("button");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
  }

  // função para remover uma pendência do array pendências.
  const removePendenciaByTitulo = (titulo) => {
    for (let i = 0; i < pendencias.length; i++) {
        if (pendencias[i].titulo === titulo) {
            pendencias.splice(i, 1); // Remove 1 elemento a partir do índice encontrado
            break; // Encerra o loop após remover a pendência
        }
    }
}

  // remove um elemento da tabela.
  const removeElement = () => {
    let close = document.getElementsByClassName("close");
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[1].innerHTML

        removePendenciaByTitulo(nomeItem)
      
        if (confirm("Você tem certeza?")) {
          div.remove()
          deleteItem(nomeItem)
          alert("Removido!")
        }
        atualizarDashboard()
      }
    }
  }

  // Função para atualizar os números de pendências e tipos no dashboard.
const atualizarDashboard = () => {
  const contagemStatus = {
      'Em aberto': 0,
      'Em tratamento': 0,
      'Concluída': 0
  };

  // Conta o número de pendências para cada tipo de status.
  pendencias.forEach(pendencia => {
      contagemStatus[pendencia.status]++;
  });

  // Atualiza os contadores no HTML
  document.getElementById('pendenciasAberto').textContent = contagemStatus['Em aberto'];
  document.getElementById('pendenciasExecucao').textContent = contagemStatus['Em tratamento'];
  document.getElementById('pendenciasConcluidas').textContent = contagemStatus['Concluída'];
};

  