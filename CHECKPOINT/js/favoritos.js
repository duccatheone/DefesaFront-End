/*
  CHECKPOINT - Portal gamer independente
  Arquivo: js/favoritos.js
  Descricao: exibe os jogos favoritos salvos no localStorage, com ordenacao e remocao.
  Depende de js/main.js (JOGOS, lerFavoritos, salvarFavoritos, buscarJogo, criarCartaoJogo).
  Autores: Eduardo Ducca e Marcelo Luz
*/

function obterJogosFavoritos() {
  const ids = lerFavoritos();
  const jogos = [];
  const idsValidos = [];
  ids.forEach(function (id) {
    const jogo = buscarJogo(id);
    if (jogo) {
      jogos.push(jogo);
      idsValidos.push(id);
    }
  });
  if (idsValidos.length !== ids.length) {
    salvarFavoritos(idsValidos);
  }
  return jogos;
}

function ordenarJogos(lista, criterio) {
  const copia = lista.slice();
  switch (criterio) {
    case "nome":
      copia.sort(function (a, b) {
        return a.nome.localeCompare(b.nome, "pt-BR");
      });
      break;
    case "nota":
      copia.sort(function (a, b) {
        return b.nota - a.nota;
      });
      break;
    case "ano":
      copia.sort(function (a, b) {
        return b.ano - a.ano;
      });
      break;
    default:
      break;
  }
  return copia;
}

function renderizarFavoritos() {
  const lista = document.getElementById("lista-favoritos");
  const vazio = document.getElementById("sem-favoritos");
  const contagem = document.getElementById("contagem-favoritos");
  const painel = document.getElementById("painel-controles");
  const criterio = document.getElementById("ordenar-favoritos").value;

  lista.textContent = "";
  const favoritos = ordenarJogos(obterJogosFavoritos(), criterio);

  favoritos.forEach(function (jogo) {
    lista.appendChild(criarCartaoJogo(jogo));
  });

  const total = favoritos.length;
  vazio.hidden = total !== 0;
  painel.hidden = total === 0;
  if (total === 1) {
    contagem.textContent = "1 jogo favorito";
  } else {
    contagem.textContent = total + " jogos favoritos";
  }
}

function removerTodosFavoritos() {
  if (lerFavoritos().length === 0) {
    return;
  }
  const confirmou = window.confirm("Deseja remover todos os jogos da sua lista de favoritos?");
  if (confirmou) {
    salvarFavoritos([]);
    atualizarContadorFavoritos();
    renderizarFavoritos();
    mostrarAviso("Todos os favoritos foram removidos.");
  }
}

function iniciarFavoritos() {
  const seletor = document.getElementById("ordenar-favoritos");
  const botaoLimpar = document.getElementById("remover-todos");
  if (!seletor || !botaoLimpar) {
    return;
  }
  seletor.addEventListener("change", renderizarFavoritos);
  botaoLimpar.addEventListener("click", removerTodosFavoritos);
  document.addEventListener("favoritos:alterados", renderizarFavoritos);
  window.addEventListener("storage", function (evento) {
    if (evento.key === CHAVE_FAVORITOS) {
      renderizarFavoritos();
    }
  });
  renderizarFavoritos();
}

document.addEventListener("DOMContentLoaded", iniciarFavoritos);
