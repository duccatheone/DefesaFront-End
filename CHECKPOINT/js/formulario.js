/*
  CHECKPOINT - Portal gamer independente
  Arquivo: js/formulario.js
  Descricao: validacao do formulario da Comunidade, mensagens de confirmacao e
  armazenamento das mensagens enviadas no localStorage.
  Depende de js/main.js (criarElemento, mostrarAviso).
  Autores: Eduardo Ducca e Marcelo Luz
*/

const CHAVE_SUGESTOES = "checkpoint_sugestoes";
const LIMITE_MENSAGEM = 500;

function lerSugestoes() {
  try {
    const bruto = localStorage.getItem(CHAVE_SUGESTOES);
    const lista = bruto ? JSON.parse(bruto) : [];
    return Array.isArray(lista) ? lista : [];
  } catch (erro) {
    return [];
  }
}

function salvarSugestoes(lista) {
  try {
    localStorage.setItem(CHAVE_SUGESTOES, JSON.stringify(lista));
    return true;
  } catch (erro) {
    return false;
  }
}

function obterMensagemErro(campo) {
  const estado = campo.validity;
  if (estado.valueMissing) {
    return "Preencha este campo.";
  }
  if (estado.tooShort) {
    return "Digite pelo menos " + campo.minLength + " caracteres (você digitou " + campo.value.length + ").";
  }
  if (estado.typeMismatch) {
    return "Informe um e-mail válido, como nome@exemplo.com.";
  }
  if (estado.patternMismatch) {
    return campo.dataset.erroPadrao || "O formato informado não é válido.";
  }
  return "";
}

function validarCampo(campo) {
  const area = document.getElementById(campo.id + "-erro");
  const valido = campo.checkValidity();
  const texto = valido ? "" : obterMensagemErro(campo);
  campo.setAttribute("aria-invalid", valido ? "false" : "true");
  if (area) {
    area.textContent = texto;
    area.classList.toggle("visivel", texto !== "");
  }
  return valido;
}

function marcarComoTocado(campo) {
  campo.classList.add("tocado");
  validarCampo(campo);
}

function atualizarContadorMensagem() {
  const campo = document.getElementById("mensagem");
  const contador = document.getElementById("contador-mensagem");
  contador.textContent = campo.value.length + "/" + LIMITE_MENSAGEM;
}

function mostrarAlertaFormulario(tipo, texto) {
  const area = document.getElementById("mensagem-formulario");
  area.textContent = "";
  const alerta = criarElemento("div", "alert alert-" + tipo, texto);
  alerta.setAttribute("role", "alert");
  area.appendChild(alerta);
  setTimeout(function () {
    if (alerta.parentNode) {
      alerta.remove();
    }
  }, 7000);
}

function formatarDataHora(timestamp) {
  return new Date(timestamp).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

function removerSugestao(id) {
  const restantes = lerSugestoes().filter(function (item) {
    return item.id !== id;
  });
  salvarSugestoes(restantes);
  renderizarSugestoes();
  mostrarAviso("Mensagem removida deste navegador.");
}

function criarCartaoSugestao(item) {
  const cartao = criarElemento("article", "sugestao");
  const titulo = item.jogo ? item.categoria + ": " + item.jogo : item.categoria;
  cartao.appendChild(criarElemento("h3", "", titulo));
  cartao.appendChild(criarElemento("p", "", item.mensagem));

  const rodape = criarElemento("div", "sugestao-rodape");
  rodape.appendChild(criarElemento("span", "", item.nome + " · " + formatarDataHora(item.data)));
  const botao = criarElemento("button", "btn-excluir", "Excluir");
  botao.type = "button";
  botao.setAttribute("aria-label", "Excluir a mensagem enviada por " + item.nome);
  botao.addEventListener("click", function () {
    removerSugestao(item.id);
  });
  rodape.appendChild(botao);
  cartao.appendChild(rodape);
  return cartao;
}

function renderizarSugestoes() {
  const lista = document.getElementById("lista-sugestoes");
  const vazio = document.getElementById("sem-sugestoes");
  const sugestoes = lerSugestoes();
  lista.textContent = "";
  sugestoes
    .slice()
    .reverse()
    .forEach(function (item) {
      lista.appendChild(criarCartaoSugestao(item));
    });
  vazio.hidden = sugestoes.length !== 0;
}

function enviarFormulario(evento) {
  evento.preventDefault();
  const formulario = evento.target;
  const campos = formulario.querySelectorAll("input, select, textarea");
  let primeiroInvalido = null;
  let tudoValido = true;

  campos.forEach(function (campo) {
    campo.classList.add("tocado");
    if (!validarCampo(campo)) {
      tudoValido = false;
      if (!primeiroInvalido) {
        primeiroInvalido = campo;
      }
    }
  });

  if (!tudoValido) {
    mostrarAlertaFormulario("danger", "Não foi possível enviar. Corrija os campos destacados e tente novamente.");
    primeiroInvalido.focus();
    return;
  }

  const sugestao = {
    id: Date.now(),
    nome: formulario.elements["nome"].value.trim(),
    email: formulario.elements["email"].value.trim(),
    categoria: formulario.elements["categoria"].value,
    jogo: formulario.elements["jogo"].value.trim(),
    mensagem: formulario.elements["mensagem"].value.trim(),
    data: Date.now()
  };

  const lista = lerSugestoes();
  lista.push(sugestao);
  const salvou = salvarSugestoes(lista);

  if (!salvou) {
    mostrarAlertaFormulario("warning", "Mensagem validada, mas este navegador não permitiu salvá-la localmente.");
    return;
  }

  mostrarAlertaFormulario("success", "Obrigado, " + sugestao.nome.split(" ")[0] + "! Sua mensagem foi registrada e aparece na lista abaixo.");
  formulario.reset();
  campos.forEach(function (campo) {
    campo.classList.remove("tocado");
    campo.removeAttribute("aria-invalid");
    const area = document.getElementById(campo.id + "-erro");
    if (area) {
      area.textContent = "";
      area.classList.remove("visivel");
    }
  });
  atualizarContadorMensagem();
  renderizarSugestoes();
}

function iniciarFormulario() {
  const formulario = document.getElementById("formulario-comunidade");
  if (!formulario) {
    return;
  }
  const campos = formulario.querySelectorAll("input, select, textarea");
  campos.forEach(function (campo) {
    campo.addEventListener("blur", function () {
      marcarComoTocado(campo);
    });
    campo.addEventListener("input", function () {
      if (campo.classList.contains("tocado")) {
        validarCampo(campo);
      }
    });
    campo.addEventListener("change", function () {
      marcarComoTocado(campo);
    });
  });
  document.getElementById("mensagem").addEventListener("input", atualizarContadorMensagem);
  formulario.addEventListener("submit", enviarFormulario);
  document.getElementById("limpar-sugestoes").addEventListener("click", function () {
    if (lerSugestoes().length === 0) {
      return;
    }
    if (window.confirm("Remover todas as mensagens salvas neste navegador?")) {
      salvarSugestoes([]);
      renderizarSugestoes();
      mostrarAviso("Todas as mensagens foram removidas.");
    }
  });
  atualizarContadorMensagem();
  renderizarSugestoes();
}

document.addEventListener("DOMContentLoaded", iniciarFormulario);
