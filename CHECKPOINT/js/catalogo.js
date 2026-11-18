/*
  CHECKPOINT - Portal gamer independente
  Arquivo: js/catalogo.js
  Descricao: pesquisa por nome e filtros por genero e plataforma na pagina de catalogo.
  Depende de js/main.js (JOGOS, PLATAFORMAS, criarCartaoJogo, criarElemento).
  Autores: Eduardo Ducca e Marcelo Luz
*/

const filtros = {
  busca: "",
  genero: "todos",
  plataforma: "todas"
};

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function listarGeneros() {
  const generos = [];
  JOGOS.forEach(function (jogo) {
    if (generos.indexOf(jogo.genero) === -1) {
      generos.push(jogo.genero);
    }
  });
  return generos.sort(function (a, b) {
    return a.localeCompare(b, "pt-BR");
  });
}

function preencherOpcoes(seletor, valores) {
  valores.forEach(function (valor) {
    const opcao = criarElemento("option", "", valor);
    opcao.value = valor;
    seletor.appendChild(opcao);
  });
}

function jogoCombinaComFiltros(jogo) {
  const termo = normalizarTexto(filtros.busca);
  const nomeNormalizado = normalizarTexto(jogo.nome);
  if (termo !== "" && nomeNormalizado.indexOf(termo) === -1) {
    return false;
  }
  if (filtros.genero !== "todos" && jogo.genero !== filtros.genero) {
    return false;
  }
  if (filtros.plataforma !== "todas" && jogo.plataformas.indexOf(filtros.plataforma) === -1) {
    return false;
  }
  return true;
}

function renderizarCatalogo() {
  const galeria = document.getElementById("galeria-jogos");
  const contagem = document.getElementById("contagem-jogos");
  const vazio = document.getElementById("sem-resultados");
  galeria.textContent = "";

  const encontrados = JOGOS.filter(jogoCombinaComFiltros);
  encontrados.forEach(function (jogo) {
    galeria.appendChild(criarCartaoJogo(jogo));
  });

  if (encontrados.length === 0) {
    contagem.textContent = "Nenhum jogo encontrado";
    vazio.hidden = false;
  } else {
    contagem.textContent = "Exibindo " + encontrados.length + " de " + JOGOS.length + " jogos";
    vazio.hidden = true;
  }
}

function limparFiltros() {
  filtros.busca = "";
  filtros.genero = "todos";
  filtros.plataforma = "todas";
  document.getElementById("busca-jogo").value = "";
  document.getElementById("filtro-genero").value = "todos";
  document.getElementById("filtro-plataforma").value = "todas";
  renderizarCatalogo();
}

function iniciarCatalogo() {
  const campoBusca = document.getElementById("busca-jogo");
  const seletorGenero = document.getElementById("filtro-genero");
  const seletorPlataforma = document.getElementById("filtro-plataforma");
  if (!campoBusca || !seletorGenero || !seletorPlataforma) {
    return;
  }

  preencherOpcoes(seletorGenero, listarGeneros());
  preencherOpcoes(seletorPlataforma, PLATAFORMAS);

  const parametros = new URLSearchParams(window.location.search);
  const plataformaUrl = parametros.get("plataforma");
  if (plataformaUrl && PLATAFORMAS.indexOf(plataformaUrl) !== -1) {
    filtros.plataforma = plataformaUrl;
    seletorPlataforma.value = plataformaUrl;
  }

  campoBusca.addEventListener("input", function () {
    filtros.busca = campoBusca.value;
    renderizarCatalogo();
  });
  seletorGenero.addEventListener("change", function () {
    filtros.genero = seletorGenero.value;
    renderizarCatalogo();
  });
  seletorPlataforma.addEventListener("change", function () {
    filtros.plataforma = seletorPlataforma.value;
    renderizarCatalogo();
  });
  document.getElementById("limpar-filtros").addEventListener("click", limparFiltros);
  document.getElementById("limpar-filtros-vazio").addEventListener("click", limparFiltros);

  renderizarCatalogo();
}

document.addEventListener("DOMContentLoaded", iniciarCatalogo);
