class Pendencia {
    constructor(autor, titulo, equipamento, descricao, status = 'Em aberto') {
      this.autor = autor;
      this.titulo = titulo;
      this.equipamento = equipamento;
      this.descricao = descricao;
      this.status = status;
    }
  }

  let pendencias = []
  
  const newItem = () => {
      
      const inputAutor = document.getElementById("newAutor").value;
      const inputTitulo = document.getElementById("newTitulo").value;
      const inputEquipamento = document.getElementById("newEquipamento").value;
      const inputDescricao = document.getElementById("newDescricao").value;
      const inputStatus = document.getElementById("newStatus").value;

      const existePendencia = pendencias.some(pendencia => pendencia.titulo === inputTitulo);
      if (existePendencia) {
          alert("Já existe uma pendência com esse título, favor escolher outro");
      } 
      else if (inputTitulo.length == 0 || inputDescricao.length == 0 || inputAutor.length == 0) {
        alert("Insira o título, descricão e autor"); 
      }
      
      else {
          const novaPendencia = new Pendencia(inputAutor, inputTitulo, inputEquipamento, inputDescricao, inputStatus);
  
          pendencias.push(novaPendencia);
      
          console.log(pendencias);
      
          insertList(novaPendencia);

          atualizarDashboard()
      }
  }
  
  const insertList = (novaPendencia) => {
    const table = document.getElementById('myTable');
    const row = table.insertRow();
  
    for (let key in novaPendencia) {
      if (key !== 'status') {
        const cell = row.insertCell();
        cell.textContent = novaPendencia[key];
      } else {
        const cell = row.insertCell();
        cell.textContent = novaPendencia[key];
        cell.setAttribute('contenteditable', 'false'); // Impede edição direta na tabela
      }
    }
  
    const editCell = row.insertCell();
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.onclick = function() {
      editStatus(row);
    };
    editCell.appendChild(editButton);
    

    document.getElementById("newAutor").value = "";
    document.getElementById("newTitulo").value = "";
    document.getElementById("newEquipamento").value = "";
    document.getElementById("newDescricao").value = "";
    insertButton(row.insertCell(-1));
    removeElement()
  }
  
  const editStatus = (row) => {
    const tituloDaAlteracao = row.cells[1].textContent; // Obtém o título da pendência
    const statusCell = row.cells[4]; // Índice da coluna de status (começando de 0)
    const status = statusCell.textContent;
    
    // Criar um novo select para escolher o status
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
  
    // Substituir o conteúdo da célula pelo select
    statusCell.textContent = '';
    statusCell.appendChild(selectStatus);
  
    // Adicionar evento para salvar o novo status ao selecionar uma opção
    selectStatus.addEventListener('change', () => {
        const novoStatus = selectStatus.value;

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

  
  // statusCell.textContent = novoStatus
  const insertButton = (parent) => {
    const span = document.createElement("span");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
  }

  const removePendenciaByTitulo = (titulo) => {
    for (let i = 0; i < pendencias.length; i++) {
        if (pendencias[i].titulo === titulo) {
            pendencias.splice(i, 1); // Remove 1 elemento a partir do índice encontrado
            break; // Encerra o loop após remover a pendência
        }
    }
}


  const removeElement = () => {
    let close = document.getElementsByClassName("close");
    // var table = document.getElementById('myTable');
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[1].innerHTML

        removePendenciaByTitulo(nomeItem)
      
        if (confirm("Você tem certeza?")) {
          div.remove()
          /*deleteItem(nomeItem)*/
          alert("Removido!")
        }
        atualizarDashboard()
      }
    }
  }

  // Função para atualizar os números de pendências e tipos no dashboard
const atualizarDashboard = () => {
  const contagemStatus = {
      'Em aberto': 0,
      'Em tratamento': 0,
      'Concluída': 0
  };

  // Conta o número de pendências para cada tipo de status
  pendencias.forEach(pendencia => {
      contagemStatus[pendencia.status]++;
  });

  // Atualiza os contadores no HTML
  document.getElementById('pendenciasAberto').textContent = contagemStatus['Em aberto'];
  document.getElementById('pendenciasExecucao').textContent = contagemStatus['Em tratamento'];
  document.getElementById('pendenciasConcluidas').textContent = contagemStatus['Concluída'];
};

  