
// Add JS here

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
  }


  /*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
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
          deleteItem(nomeItem)
          alert("Removido!")
        }
      }
    }
  }


    /*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (autor, titulo, equipamento, descricao) => {
    console.log(autor, titulo,equipamento,descricao)
    var pendencia = [autor, titulo, equipamento, descricao]
    var table = document.getElementById('myTable');
    var row = table.insertRow();
  
    for (var i = 0; i < pendencia.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = pendencia[i];
    }
    insertButton(row.insertCell(-1))
    document.getElementById("newAutor").value = "";
    document.getElementById("newTitulo").value = "";
    document.getElementById("newEquipamento").value = "";
    document.getElementById("newDescricao").value = "";
  
    removeElement()
  }

  const newItem = () => {
    console.log("adicionando um item")
    let inputAutor = document.getElementById("newAutor").value;
    console.log(inputAutor)
    let inputTitulo = document.getElementById("newTitulo").value;
    let inputEquipamento = document.getElementById("newEquipamento").value;
    let inputDescricao = document.getElementById("newDescricao").value
  
    if (inputAutor === '') {
      alert("Escreva o nome de um item!");
    } else if (inputTitulo.length == 0 || inputEquipamento.length == 0) {
      alert("Insira o título e o equiopmaneto");
    } else {
      insertList(inputAutor, inputTitulo, inputEquipamento, inputDescricao)
      alert("Pendência adicionada!")
    }
  }

