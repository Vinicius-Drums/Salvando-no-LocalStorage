document.addEventListener("DOMContentLoaded", function () {
  const formAtividade = document.getElementById("form-atividade");
  const campoAtividade = document.getElementById("campo-atividade");
  const botaoAdicionar = document.getElementById("botao-adicionar");
  const lista = document.getElementById("lista");
  const contadorTarefas = document.getElementById("contador-tarefas");

  // Função para carregar a lista do localStorage
  function carregarLista() {
    const listaSalva = localStorage.getItem("lista");
    if (listaSalva) {
      lista.innerHTML = listaSalva;
      // Atualiza o contador de tarefas
      atualizarContadorTarefas();
    }
  }

  // Função para salvar a lista no localStorage
  function salvarLista() {
    // Obtém todos os itens da lista
    const itensLista = document.querySelectorAll("#lista .item");
    const listaArray = [];

    // Converte os itens em um array de objetos
    itensLista.forEach((item) => {
      const checkbox = item.querySelector(".caixa");
      const label = item.querySelector("label");

      listaArray.push({
        texto: label.textContent,
        concluido: checkbox.checked,
      });
    });

    // Salva o array como uma string JSON no localStorage
    localStorage.setItem("lista", JSON.stringify(listaArray));
    console.log("Lista salva no localStorage");
  }

  // Função para atualizar o contador de tarefas
  function atualizarContadorTarefas() {
    const numeroTarefas = lista.childElementCount;
    contadorTarefas.textContent = `Número de tarefas: ${numeroTarefas}`;
  }

  // Carrega a lista ao carregar a página
  carregarLista();

  botaoAdicionar.addEventListener("click", function () {
    const novaAtividade = campoAtividade.value.trim();

    if (novaAtividade !== "") {
      const novoItem = document.createElement("li");
      novoItem.classList.add("item");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("caixa");
      checkbox.id = "atividade" + (lista.childElementCount + 1);
      novoItem.appendChild(checkbox);

      const label = document.createElement("label");
      label.htmlFor = checkbox.id;
      label.textContent = novaAtividade;
      novoItem.appendChild(label);

      const botaoExcluir = document.createElement("button");
      botaoExcluir.classList.add("trash");
      botaoExcluir.textContent = "🗑️";
      novoItem.appendChild(botaoExcluir);

      lista.appendChild(novoItem);
      campoAtividade.value = "";

      // Atualiza o contador de tarefas
      atualizarContadorTarefas();

      // Salva a lista no localStorage
      salvarLista();
    } else {
      alert("Digite uma atividade antes de adicionar à lista.");
    }
  });

  lista.addEventListener("click", function (event) {
    const elementoClicado = event.target;

    // Verifica se o elemento clicado é um botão de exclusão
    if (elementoClicado.classList.contains("trash")) {
      // Pede confirmação antes de excluir
      const confirmacao = confirm(
        "Você realmente deseja excluir esta atividade?"
      );
      if (confirmacao) {
        const itemParaExcluir = elementoClicado.closest(".item");
        const checkbox = itemParaExcluir.querySelector(".caixa");

        // Verifica se o item está marcado como concluído e remove a classe
        if (checkbox.checked) {
          itemParaExcluir.querySelector("label").classList.remove("concluido");
        }
        // Remove o item da lista
        lista.removeChild(itemParaExcluir);

        // Atualiza o contador de tarefas
        atualizarContadorTarefas();

        // Salva a lista no localStorage
        salvarLista();
      }
    }

    // Verifica se o elemento clicado é um checkbox
    if (
      elementoClicado.type === "checkbox" &&
      elementoClicado.classList.contains("caixa")
    ) {
      const label = elementoClicado.nextElementSibling;

      // Adiciona ou remove a classe "concluido" no label
      label.classList.toggle("concluido");

      // Atualiza o contador de tarefas
      atualizarContadorTarefas();

      // Salva a lista no localStorage
      salvarLista();
    }
  });
});
