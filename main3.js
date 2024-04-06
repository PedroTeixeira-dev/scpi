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
      
      const novaPendencia = new Pendencia(inputAutor, inputTitulo, inputEquipamento, inputDescricao, inputStatus);

    insertList(novaPendencia);
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
  
    insertButton(row.insertCell(-1));
    removeElement()
  }
  
  const editStatus = (row) => {
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
      statusCell.textContent = selectStatus.value;
    });
  }
  
  
  const insertButton = (parent) => {
    const span = document.createElement("span");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
  }

  const removeElement = () => {
    let close = document.getElementsByClassName("close");
    // var table = document.getElementById('myTable');
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza?")) {
          div.remove()
          /*deleteItem(nomeItem)*/
          alert("Removido!")
        }
      }
    }
  }
  