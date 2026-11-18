/*
  CHECKPOINT - Portal gamer independente
  Arquivo: js/main.js
  Descricao: dados dos jogos, funcoes compartilhadas (favoritos, cards, avisos, menu) e logica da Home.
  Carregado em todas as paginas, antes dos demais scripts.
  Autores: Eduardo Ducca e Marcelo Luz
*/

const CHAVE_FAVORITOS = "checkpoint_favoritos";
const PLATAFORMAS = ["PC", "PlayStation", "Xbox", "Nintendo"];
const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

const JOGOS = [
  {
    id: "zelda-botw",
    nome: "The Legend of Zelda: Breath of the Wild",
    genero: "Aventura",
    plataformas: ["Nintendo"],
    ano: 2017,
    lancamento: "2017-03-03",
    nota: 9.7,
    analise: true,
    imagem: "zelda-botw.svg",
    desc: "Explore Hyrule com liberdade total em um mundo aberto cheio de física e descobertas.",
    resumo: "Lançado em 2017 para Nintendo Switch e Wii U, reinventou a série ao deixar o jogador escolher o caminho e resolver problemas com as regras do próprio mundo."
  },
  {
    id: "elden-ring",
    nome: "Elden Ring",
    genero: "RPG",
    plataformas: ["PC", "PlayStation", "Xbox"],
    ano: 2022,
    lancamento: "2022-02-25",
    nota: 9.5,
    analise: true,
    imagem: "elden-ring.svg",
    desc: "RPG de ação em mundo aberto da FromSoftware, com combate exigente e exploração livre.",
    resumo: "Cada região esconde chefes, masmorras e itens opcionais. O mundo foi desenvolvido com a colaboração do escritor George R. R. Martin na criação da mitologia."
  },
  {
    id: "god-of-war-ragnarok",
    nome: "God of War Ragnarök",
    genero: "Ação",
    plataformas: ["PlayStation", "PC"],
    ano: 2022,
    lancamento: "2022-11-09",
    nota: 9.3,
    analise: false,
    imagem: "god-of-war-ragnarok.svg",
    desc: "Kratos e Atreus atravessam os Nove Reinos em uma aventura de combate brutal e história emotiva.",
    resumo: "Chegou ao PlayStation em 2022 e ao PC em 2024. Mantém a câmera sobre o ombro e aprofunda a relação entre pai e filho."
  },
  {
    id: "hades",
    nome: "Hades",
    genero: "Roguelike",
    plataformas: ["PC", "Nintendo", "PlayStation", "Xbox"],
    ano: 2020,
    lancamento: "2020-09-17",
    nota: 9.4,
    analise: true,
    imagem: "hades.svg",
    desc: "Fuja do submundo grego em partidas rápidas nas quais cada tentativa avança a história.",
    resumo: "Desenvolvido pela Supergiant Games, transforma a morte em parte da narrativa: cada fuga fracassada rende diálogos e melhorias."
  },
  {
    id: "celeste",
    nome: "Celeste",
    genero: "Plataforma",
    plataformas: ["PC", "Nintendo", "PlayStation", "Xbox"],
    ano: 2018,
    lancamento: "2018-01-25",
    nota: 9.0,
    analise: true,
    imagem: "celeste.svg",
    desc: "Escale a montanha Celeste em fases de precisão com uma história sensível sobre ansiedade.",
    resumo: "Conhecido pelo modo de assistência, que permite ajustar a dificuldade sem abrir mão da experiência completa."
  },
  {
    id: "stardew-valley",
    nome: "Stardew Valley",
    genero: "Simulação",
    plataformas: ["PC", "Nintendo", "PlayStation", "Xbox"],
    ano: 2016,
    lancamento: "2016-02-26",
    nota: 9.2,
    analise: true,
    imagem: "stardew-valley.svg",
    desc: "Herde uma fazenda, plante, pesque, faça amigos e construa a vida no seu próprio ritmo.",
    resumo: "Criado quase inteiramente por uma única pessoa, Eric Barone, tornou-se referência entre os jogos independentes de simulação."
  },
  {
    id: "minecraft",
    nome: "Minecraft",
    genero: "Sandbox",
    plataformas: ["PC", "Nintendo", "PlayStation", "Xbox"],
    ano: 2011,
    lancamento: "2011-11-18",
    nota: 9.4,
    analise: false,
    imagem: "minecraft.svg",
    desc: "Construa, minere e sobreviva em mundos de blocos gerados proceduralmente.",
    resumo: "Um dos jogos mais vendidos da história, funciona como ferramenta de criatividade e também como ambiente de aprendizagem."
  },
  {
    id: "witcher-3",
    nome: "The Witcher 3: Wild Hunt",
    genero: "RPG",
    plataformas: ["PC", "PlayStation", "Xbox", "Nintendo"],
    ano: 2015,
    lancamento: "2015-05-19",
    nota: 9.6,
    analise: false,
    imagem: "witcher-3.svg",
    desc: "Siga Geralt de Rívia em busca de Ciri em um RPG denso, com missões secundárias memoráveis.",
    resumo: "Produzido pela CD Projekt Red, ficou famoso pela qualidade das missões paralelas e pelas escolhas que mudam o desfecho."
  },
  {
    id: "hollow-knight",
    nome: "Hollow Knight",
    genero: "Aventura",
    plataformas: ["PC", "Nintendo", "PlayStation", "Xbox"],
    ano: 2017,
    lancamento: "2017-02-24",
    nota: 9.1,
    analise: false,
    imagem: "hollow-knight.svg",
    desc: "Desça às profundezas de Hallownest em uma aventura metroidvania de atmosfera marcante.",
    resumo: "Feito pela Team Cherry, combina exploração não linear, combate preciso e direção de arte desenhada à mão."
  },
  {
    id: "forza-horizon-5",
    nome: "Forza Horizon 5",
    genero: "Corrida",
    plataformas: ["Xbox", "PC", "PlayStation"],
    ano: 2021,
    lancamento: "2021-11-09",
    nota: 9.0,
    analise: false,
    imagem: "forza-horizon-5.svg",
    desc: "Corra por paisagens inspiradas no México em um festival de automobilismo em mundo aberto.",
    resumo: "Reúne centenas de carros e eventos variados, do asfalto à terra, com foco em diversão e acessibilidade."
  },
  {
    id: "halo-infinite",
    nome: "Halo Infinite",
    genero: "Tiro",
    plataformas: ["Xbox", "PC"],
    ano: 2021,
    lancamento: "2021-12-08",
    nota: 8.4,
    analise: false,
    imagem: "halo-infinite.svg",
    desc: "Master Chief retorna em uma campanha de mundo aberto e em um multiplayer de acesso gratuito.",
    resumo: "Mistura combate clássico da série com o gancho de ação, que amplia a mobilidade durante os tiroteios."
  },
  {
    id: "mario-odyssey",
    nome: "Super Mario Odyssey",
    genero: "Plataforma",
    plataformas: ["Nintendo"],
    ano: 2017,
    lancamento: "2017-10-27",
    nota: 9.5,
    analise: false,
    imagem: "mario-odyssey.svg",
    desc: "Mario viaja por reinos variados com o chapéu Cappy, capturando inimigos e objetos.",
    resumo: "Um dos jogos mais elogiados do Nintendo Switch, com fases cheias de segredos e movimentos criativos."
  },
  {
    id: "red-dead-2",
    nome: "Red Dead Redemption 2",
    genero: "Ação",
    plataformas: ["PlayStation", "Xbox", "PC"],
    ano: 2018,
    lancamento: "2018-10-26",
    nota: 9.6,
    analise: false,
    imagem: "red-dead-2.svg",
    desc: "Acompanhe Arthur Morgan e a gangue de Dutch no declínio da era do Velho Oeste.",
    resumo: "Da Rockstar Games, destaca-se pelo ritmo contemplativo, pelo mundo detalhado e pela narrativa de personagens."
  },
  {
    id: "baldurs-gate-3",
    nome: "Baldur's Gate 3",
    genero: "RPG",
    plataformas: ["PC", "PlayStation", "Xbox"],
    ano: 2023,
    lancamento: "2023-08-03",
    nota: 9.7,
    analise: true,
    imagem: "baldurs-gate-3.svg",
    desc: "RPG por turnos baseado em Dungeons & Dragons, com liberdade para resolver quase tudo de várias formas.",
    resumo: "Desenvolvido pela Larian Studios, permite jogar sozinho ou em cooperativo, com decisões que alteram a história."
  },
  {
    id: "portal-2",
    nome: "Portal 2",
    genero: "Quebra-cabeça",
    plataformas: ["PC", "PlayStation", "Xbox", "Nintendo"],
    ano: 2011,
    lancamento: "2011-04-19",
    nota: 9.4,
    analise: false,
    imagem: "portal-2.svg",
    desc: "Resolva desafios de lógica usando portais em um laboratório cheio de humor ácido.",
    resumo: "Da Valve, amplia as ideias do primeiro jogo com novos elementos de física e um modo cooperativo."
  },
  {
    id: "rocket-league",
    nome: "Rocket League",
    genero: "Esporte",
    plataformas: ["PC", "PlayStation", "Xbox", "Nintendo"],
    ano: 2015,
    lancamento: "2015-07-07",
    nota: 8.7,
    analise: false,
    imagem: "rocket-league.svg",
    desc: "Futebol com carros acrobáticos: partidas rápidas, fáceis de aprender e difíceis de dominar.",
    resumo: "Criado pela Psyonix, popularizou o conceito de esporte eletrônico com regras simples e muita habilidade mecânica."
  }
];

const PREVISTOS = [
  {
    id: "projeto-aurora",
    nome: "Projeto Aurora",
    genero: "Aventura",
    plataformas: ["PC", "PlayStation", "Xbox"],
    lancamento: "2027-02-12",
    imagem: "projeto-aurora.svg"
  },
  {
    id: "drift-zero",
    nome: "Drift Zero",
    genero: "Corrida",
    plataformas: ["PC", "Xbox"],
    lancamento: "2027-03-05",
    imagem: "drift-zero.svg"
  },
  {
    id: "ecos-de-valkor",
    nome: "Ecos de Valkor",
    genero: "RPG",
    plataformas: ["PC", "PlayStation"],
    lancamento: "2027-04-20",
    imagem: "ecos-de-valkor.svg"
  },
  {
    id: "pixel-harbor",
    nome: "Pixel Harbor",
    genero: "Simulação",
    plataformas: ["PC", "Nintendo"],
    lancamento: "2027-05-14",
    imagem: "pixel-harbor.svg"
  },
  {
    id: "sombras-de-kael",
    nome: "Sombras de Kael",
    genero: "Ação",
    plataformas: ["PlayStation", "Xbox", "PC"],
    lancamento: "2027-06-18",
    imagem: "sombras-de-kael.svg"
  },
  {
    id: "arena-vortex",
    nome: "Arena Vortex",
    genero: "Esporte",
    plataformas: ["PC", "PlayStation", "Xbox", "Nintendo"],
    lancamento: "2027-07-09",
    imagem: "arena-vortex.svg"
  }
];

function criarElemento(tag, classes, texto) {
  const elemento = document.createElement(tag);
  if (classes) {
    elemento.className = classes;
  }
  if (texto !== undefined) {
    elemento.textContent = texto;
  }
  return elemento;
}

function formatarNota(nota) {
  return nota.toFixed(1).replace(".", ",");
}

function formatarData(dataIso) {
  const partes = dataIso.split("-");
  const dia = parseInt(partes[2], 10);
  const mes = MESES[parseInt(partes[1], 10) - 1];
  return dia + " " + mes + " " + partes[0];
}

function buscarJogo(id) {
  for (let i = 0; i < JOGOS.length; i++) {
    if (JOGOS[i].id === id) {
      return JOGOS[i];
    }
  }
  return null;
}

function lerFavoritos() {
  try {
    const bruto = localStorage.getItem(CHAVE_FAVORITOS);
    const lista = bruto ? JSON.parse(bruto) : [];
    return Array.isArray(lista) ? lista : [];
  } catch (erro) {
    return [];
  }
}

function salvarFavoritos(lista) {
  try {
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(lista));
    return true;
  } catch (erro) {
    return false;
  }
}

function ehFavorito(id) {
  return lerFavoritos().indexOf(id) !== -1;
}

function alternarFavorito(id) {
  const lista = lerFavoritos();
  const posicao = lista.indexOf(id);
  let agoraFavorito;
  if (posicao === -1) {
    lista.push(id);
    agoraFavorito = true;
  } else {
    lista.splice(posicao, 1);
    agoraFavorito = false;
  }
  salvarFavoritos(lista);
  atualizarContadorFavoritos();
  document.dispatchEvent(new CustomEvent("favoritos:alterados", { detail: { id: id, favorito: agoraFavorito } }));
  return agoraFavorito;
}

function atualizarContadorFavoritos() {
  const total = lerFavoritos().length;
  const contadores = document.querySelectorAll(".contador-favoritos");
  contadores.forEach(function (contador) {
    contador.textContent = total;
  });
}

function atualizarBotaoFavorito(botao, favorito) {
  botao.setAttribute("aria-pressed", favorito ? "true" : "false");
  botao.textContent = favorito ? "♥ Favorito" : "♡ Favoritar";
}

function sincronizarBotoesFavorito() {
  const botoes = document.querySelectorAll(".btn-fav");
  botoes.forEach(function (botao) {
    atualizarBotaoFavorito(botao, ehFavorito(botao.dataset.id));
  });
}

function mostrarAviso(mensagem) {
  const area = document.getElementById("alertas");
  if (!area) {
    return;
  }
  const aviso = criarElemento("div", "toast-nx", mensagem);
  area.appendChild(aviso);
  setTimeout(function () {
    aviso.remove();
  }, 3200);
}

function criarCartaoJogo(jogo) {
  const cartao = criarElemento("article", "cartao cartao-jogo card");
  cartao.dataset.id = jogo.id;

  const imagem = criarElemento("img", "card-img-top");
  imagem.src = "img/" + jogo.imagem;
  imagem.alt = "Ilustração de capa do jogo " + jogo.nome;
  imagem.loading = "lazy";
  cartao.appendChild(imagem);

  const corpo = criarElemento("div", "cartao-corpo card-body");

  const titulo = criarElemento("h3", "card-title", jogo.nome);
  corpo.appendChild(titulo);

  const meta = criarElemento("div", "cartao-meta");
  meta.appendChild(criarElemento("span", "", jogo.genero));
  meta.appendChild(criarElemento("span", "", String(jogo.ano)));
  meta.appendChild(criarElemento("span", "", "Nota " + formatarNota(jogo.nota)));
  corpo.appendChild(meta);

  const selos = criarElemento("div", "selos");
  jogo.plataformas.forEach(function (plataforma) {
    selos.appendChild(criarElemento("span", "selo", plataforma));
  });
  corpo.appendChild(selos);

  corpo.appendChild(criarElemento("p", "card-text", jogo.desc));

  const detalhes = criarElemento("div", "detalhes");
  detalhes.appendChild(criarElemento("p", "", jogo.resumo));
  corpo.appendChild(detalhes);

  const acoes = criarElemento("div", "cartao-acoes");

  const botaoDetalhes = criarElemento("button", "btn-detalhes", "Ver detalhes");
  botaoDetalhes.type = "button";
  botaoDetalhes.setAttribute("aria-expanded", "false");
  acoes.appendChild(botaoDetalhes);

  const botaoFavorito = criarElemento("button", "btn-fav");
  botaoFavorito.type = "button";
  botaoFavorito.dataset.id = jogo.id;
  atualizarBotaoFavorito(botaoFavorito, ehFavorito(jogo.id));
  acoes.appendChild(botaoFavorito);

  if (jogo.analise) {
    const link = criarElemento("a", "btn btn-sm btn-outline-info", "Ler análise");
    link.href = "analises.html#" + jogo.id;
    acoes.appendChild(link);
  }

  corpo.appendChild(acoes);
  cartao.appendChild(corpo);
  return cartao;
}

function alternarDetalhes(botao) {
  const cartao = botao.closest(".cartao");
  const detalhes = cartao ? cartao.querySelector(".detalhes") : null;
  if (!detalhes) {
    return;
  }
  const aberto = detalhes.classList.toggle("aberto");
  botao.setAttribute("aria-expanded", aberto ? "true" : "false");
  botao.textContent = aberto ? "Ocultar detalhes" : "Ver detalhes";
}

function tratarCliqueGlobal(evento) {
  const botaoFavorito = evento.target.closest(".btn-fav");
  if (botaoFavorito) {
    const id = botaoFavorito.dataset.id;
    const jogo = buscarJogo(id);
    const favorito = alternarFavorito(id);
    sincronizarBotoesFavorito();
    if (jogo) {
      mostrarAviso(favorito ? jogo.nome + " foi adicionado aos favoritos." : jogo.nome + " foi removido dos favoritos.");
    }
    return;
  }
  const botaoDetalhes = evento.target.closest(".btn-detalhes");
  if (botaoDetalhes) {
    alternarDetalhes(botaoDetalhes);
  }
}

function iniciarMenuPuro() {
  const botao = document.getElementById("menu-botao");
  const menu = document.getElementById("menu-colapso");
  if (!botao || !menu) {
    return;
  }
  function fecharMenu() {
    menu.classList.remove("aberto");
    botao.setAttribute("aria-expanded", "false");
  }
  botao.addEventListener("click", function () {
    const aberto = menu.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", aberto ? "true" : "false");
  });
  menu.addEventListener("click", function (evento) {
    if (evento.target.closest("a")) {
      fecharMenu();
    }
  });
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
      fecharMenu();
    }
  });
}

function preencherAnoAtual() {
  const alvo = document.getElementById("ano-atual");
  if (alvo) {
    alvo.textContent = new Date().getFullYear();
  }
}

function renderizarJogosPopulares() {
  const alvo = document.getElementById("jogos-populares");
  if (!alvo) {
    return;
  }
  const ordenados = JOGOS.slice().sort(function (a, b) {
    return b.nota - a.nota;
  });
  const populares = ordenados.slice(0, 4);
  populares.forEach(function (jogo) {
    alvo.appendChild(criarCartaoJogo(jogo));
  });
}

function renderizarProximosLancamentos() {
  const alvo = document.getElementById("proximos-lancamentos");
  if (!alvo) {
    return;
  }
  PREVISTOS.slice(0, 3).forEach(function (jogo) {
    const evento = criarElemento("article", "evento");
    const data = criarElemento("div", "evento-data");
    const partes = formatarData(jogo.lancamento).split(" ");
    data.appendChild(criarElemento("strong", "", partes[0]));
    data.appendChild(criarElemento("span", "", partes[1] + " " + partes[2]));
    evento.appendChild(data);
    const texto = criarElemento("div");
    texto.appendChild(criarElemento("h3", "", jogo.nome));
    texto.appendChild(criarElemento("p", "", jogo.genero + " · " + jogo.plataformas.join(", ")));
    texto.appendChild(criarElemento("span", "selo selo-laranja", "Previsto (fictício)"));
    evento.appendChild(texto);
    alvo.appendChild(evento);
  });
}

function renderizarSugestaoDoDia() {
  const alvo = document.getElementById("sugestao-dia");
  if (!alvo) {
    return;
  }
  const hoje = new Date();
  const inicioAno = new Date(hoje.getFullYear(), 0, 0);
  const diaDoAno = Math.floor((hoje - inicioAno) / 86400000);
  const jogo = JOGOS[diaDoAno % JOGOS.length];
  alvo.insertBefore(criarCartaoJogo(jogo), alvo.firstChild);
}

function iniciarFiltroNoticias() {
  const abas = document.querySelectorAll(".aba[data-categoria]");
  const cartoes = document.querySelectorAll(".cartao[data-categoria]");
  if (abas.length === 0) {
    return;
  }
  abas.forEach(function (aba) {
    aba.addEventListener("click", function () {
      const categoria = aba.dataset.categoria;
      let visiveis = 0;
      abas.forEach(function (outra) {
        outra.classList.toggle("ativa", outra === aba);
        outra.setAttribute("aria-pressed", outra === aba ? "true" : "false");
      });
      cartoes.forEach(function (cartao) {
        const mostrar = categoria === "todas" || cartao.dataset.categoria === categoria;
        cartao.hidden = !mostrar;
        if (mostrar) {
          visiveis++;
        }
      });
      const contagem = document.getElementById("contagem-noticias");
      if (contagem) {
        contagem.textContent = visiveis + (visiveis === 1 ? " matéria exibida" : " matérias exibidas");
      }
    });
  });
}

function listarLancamentos() {
  const lista = [];
  JOGOS.forEach(function (jogo) {
    lista.push({ nome: jogo.nome, genero: jogo.genero, plataformas: jogo.plataformas, lancamento: jogo.lancamento, status: "lancado" });
  });
  PREVISTOS.forEach(function (jogo) {
    lista.push({ nome: jogo.nome, genero: jogo.genero, plataformas: jogo.plataformas, lancamento: jogo.lancamento, status: "previsto" });
  });
  return lista;
}

function ordenarLancamentos(lista) {
  const previstos = lista.filter(function (item) {
    return item.status === "previsto";
  });
  const lancados = lista.filter(function (item) {
    return item.status === "lancado";
  });
  previstos.sort(function (a, b) {
    return a.lancamento.localeCompare(b.lancamento);
  });
  lancados.sort(function (a, b) {
    return b.lancamento.localeCompare(a.lancamento);
  });
  return previstos.concat(lancados);
}

function criarEventoLancamento(item) {
  const evento = criarElemento("article", "evento");
  const partes = formatarData(item.lancamento).split(" ");
  const data = criarElemento("div", "evento-data");
  data.appendChild(criarElemento("strong", "", partes[0]));
  data.appendChild(criarElemento("span", "", partes[1] + " " + partes[2]));
  evento.appendChild(data);
  const texto = criarElemento("div");
  texto.appendChild(criarElemento("h3", "", item.nome));
  texto.appendChild(criarElemento("p", "", item.genero + " · " + item.plataformas.join(", ")));
  if (item.status === "previsto") {
    texto.appendChild(criarElemento("span", "selo selo-laranja", "Previsto (fictício)"));
  } else {
    texto.appendChild(criarElemento("span", "selo selo-oliva", "Lançado"));
  }
  evento.appendChild(texto);
  return evento;
}

function renderizarCalendario(status, plataforma) {
  const alvo = document.getElementById("calendario");
  if (!alvo) {
    return;
  }
  alvo.textContent = "";
  const filtrados = ordenarLancamentos(listarLancamentos()).filter(function (item) {
    const statusOk = status === "todos" || item.status === status;
    const plataformaOk = plataforma === "todas" || item.plataformas.indexOf(plataforma) !== -1;
    return statusOk && plataformaOk;
  });
  filtrados.forEach(function (item) {
    alvo.appendChild(criarEventoLancamento(item));
  });
  const contagem = document.getElementById("contagem-lancamentos");
  if (contagem) {
    contagem.textContent = filtrados.length + (filtrados.length === 1 ? " título no calendário" : " títulos no calendário");
  }
  const vazio = document.getElementById("sem-lancamentos");
  if (vazio) {
    vazio.hidden = filtrados.length !== 0;
  }
}

function renderizarTabelaLancamentos() {
  const corpo = document.getElementById("tabela-lancamentos");
  if (!corpo) {
    return;
  }
  ordenarLancamentos(listarLancamentos()).forEach(function (item) {
    const linha = document.createElement("tr");
    const celulaNome = criarElemento("th", "", item.nome);
    celulaNome.scope = "row";
    linha.appendChild(celulaNome);
    linha.appendChild(criarElemento("td", "", formatarData(item.lancamento)));
    linha.appendChild(criarElemento("td", "", item.genero));
    const celulaPlataformas = document.createElement("td");
    item.plataformas.forEach(function (plataforma) {
      celulaPlataformas.appendChild(criarElemento("span", "selo", plataforma));
    });
    linha.appendChild(celulaPlataformas);
    const celulaStatus = document.createElement("td");
    if (item.status === "previsto") {
      celulaStatus.appendChild(criarElemento("span", "selo selo-laranja", "Previsto (fictício)"));
    } else {
      celulaStatus.appendChild(criarElemento("span", "selo selo-oliva", "Lançado"));
    }
    linha.appendChild(celulaStatus);
    corpo.appendChild(linha);
  });
}

function iniciarLancamentos() {
  const abas = document.querySelectorAll(".aba[data-status]");
  const seletor = document.getElementById("filtro-plataforma-lancamentos");
  if (abas.length === 0 || !seletor) {
    return;
  }
  let statusAtual = "todos";
  PLATAFORMAS.forEach(function (plataforma) {
    const opcao = criarElemento("option", "", plataforma);
    opcao.value = plataforma;
    seletor.appendChild(opcao);
  });
  function atualizar() {
    renderizarCalendario(statusAtual, seletor.value);
  }
  abas.forEach(function (aba) {
    aba.addEventListener("click", function () {
      statusAtual = aba.dataset.status;
      abas.forEach(function (outra) {
        outra.classList.toggle("ativa", outra === aba);
        outra.setAttribute("aria-pressed", outra === aba ? "true" : "false");
      });
      atualizar();
    });
  });
  seletor.addEventListener("change", atualizar);
  atualizar();
  renderizarTabelaLancamentos();
}

function iniciar() {
  document.addEventListener("click", tratarCliqueGlobal);
  iniciarMenuPuro();
  preencherAnoAtual();
  atualizarContadorFavoritos();
  renderizarJogosPopulares();
  renderizarProximosLancamentos();
  renderizarSugestaoDoDia();
  iniciarFiltroNoticias();
  iniciarLancamentos();
  window.addEventListener("storage", function (evento) {
    if (evento.key === CHAVE_FAVORITOS) {
      atualizarContadorFavoritos();
      sincronizarBotoesFavorito();
    }
  });
}

document.addEventListener("DOMContentLoaded", iniciar);
