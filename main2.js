class Pendencia {
    constructor(autor, titulo, equipamento, descricao) {
        this.autor = autor
        this.titulo = titulo
        this.equipamento = equipamento
        this.descricao = descricao
    }
}


const pendenciaTeste = new Pendencia("Pedro", "Vazamanto no CP101", "CP101", "Vazamanto de óleo na junta da gaxeta")



const newItem = () => {
    console.log("adicionando um item")
    let inputAutor = document.getElementById("newAutor").value;
    console.log(inputAutor)
    let inputTitulo = document.getElementById("newTitulo").value;
    let inputEquipamento = document.getElementById("newEquipamento").value;
    let inputDescricao = document.getElementById("newDescricao").value

    const novaPendencia = new Pendencia(inputAutor, inputTitulo, inputEquipamento, inputDescricao)

    console.log(novaPendencia)

    if (inputAutor === '') {
      alert("Escreva o nome de um item!");
    } else if (inputTitulo.length == 0 || inputEquipamento.length == 0) {
      alert("Insira o título e o equiopmaneto");
    } else {
      insertList(novaPendencia)
      alert("Pendência adicionada!")
    }
  }

  const insertList = (novaPendencia) => {

    var pendencia = [novaPendencia.autor, novaPendencia.titulo, novaPendencia.equipamento, novaPendencia.descricao]
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

  const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
  }
