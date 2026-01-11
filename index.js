// ================================
// ANO AUTOMÁTICO
// ================================
const ano = document.getElementById("ano");
if (ano) {
  ano.textContent = new Date().getFullYear();
}

// ================================
// FORMULÁRIO → WHATSAPP
// ================================
const form = document.getElementById("form-whatsapp");
const feedback = document.querySelector(".feedback-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const telefone = document.getElementById("telefone");
    const servico = document.getElementById("servico");
    const mensagem = document.getElementById("mensagem");
    const destino = document.getElementById("destino");

    limparEstados([nome, email, telefone, mensagem, servico, destino]);

    let valido = true;

    if (!nome.value.trim()) {
      marcarErro(nome);
      valido = false;
    }

    if (!email.value.trim()) {
      marcarErro(email);
      valido = false;
    }

    if (!destino.value) {
      marcarErro(destino);
      valido = false;
    }

    if (!valido) {
      mostrarFeedback("Por favor, preencha os campos obrigatórios.", "erro");
      return;
    }

    const texto = `
Olá! Gostaria de solicitar uma proposta.

Nome: ${nome.value}
E-mail: ${email.value}
WhatsApp: ${telefone.value || "Não informado"}
Serviço: ${servico.value}

Mensagem:
${mensagem.value || "Não informada"}
    `;

    const url = `https://wa.me/${destino.value}?text=${encodeURIComponent(texto)}`;

    mostrarFeedback("Redirecionando para o WhatsApp...", "sucesso");

    setTimeout(() => {
      window.open(url, "_blank");
      form.reset();
    }, 800);
  });
}

function mostrarFeedback(msg, tipo) {
  feedback.textContent = msg;
  feedback.style.color = tipo === "sucesso" ? "#2f7d32" : "#c62828";
}

function marcarErro(campo) {
  campo.classList.add("erro");
}

function limparEstados(campos) {
  campos.forEach(campo => campo.classList.remove("erro", "sucesso"));
}


// ================================
// FUNÇÕES AUXILIARES
// ================================
function mostrarFeedback(texto, tipo) {
  if (!feedback) return;

  feedback.textContent = texto;
  feedback.style.display = "block";

  if (tipo === "sucesso") {
    feedback.style.color = "#2f7d32";
  } else {
    feedback.style.color = "#c62828";
  }
}

function marcarErro(campo) {
  campo.classList.add("erro");
  campo.setAttribute("aria-invalid", "true");
}

function marcarSucesso(campos) {
  campos.forEach(campo => {
    campo.classList.remove("erro");
    campo.classList.add("sucesso");
    campo.setAttribute("aria-invalid", "false");
  });
}

function limparEstados(campos) {
  campos.forEach(campo => {
    campo.classList.remove("erro", "sucesso");
    campo.removeAttribute("aria-invalid");
  });
}

// ================================
// FUNÇÃO DE FEEDBACK
// ================================
function mostrarFeedback(mensagem, tipo) {
  if (!feedback) return;

  feedback.textContent = mensagem;
  feedback.className = "feedback-form";

  if (tipo === "sucesso") {
    feedback.style.color = "#2f7d32";
  } else {
    feedback.style.color = "#c62828";
  }
}

// ================================
// DARK MODE (AUTOMÁTICO + MANUAL)
// ================================
const toggleTheme = document.getElementById("toggle-theme");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Verifica preferência salva
function aplicarTemaInicial() {
  const temaSalvo = localStorage.getItem("theme");

  if (temaSalvo) {
    document.body.classList.toggle("dark", temaSalvo === "dark");
  } else {
    document.body.classList.toggle("dark", prefersDarkScheme.matches);
  }

  atualizarIcone();
}

// Atualiza ícone do botão
function atualizarIcone() {
  if (!toggleTheme) return;
  toggleTheme.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

// Clique manual
if (toggleTheme) {
  toggleTheme.addEventListener("click", () => {
    const modoEscuroAtivo = document.body.classList.toggle("dark");
    localStorage.setItem("theme", modoEscuroAtivo ? "dark" : "light");
    atualizarIcone();
  });
}

// Detecta mudança no sistema (se usuário não escolheu manualmente)
prefersDarkScheme.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    document.body.classList.toggle("dark", e.matches);
    atualizarIcone();
  }
});

// Aplica tema ao carregar
aplicarTemaInicial();

// ================================
// AOS – ANIMAÇÕES AO ROLAR A PÁGINA
// ================================
document.addEventListener("DOMContentLoaded", function () {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 900,        // duração da animação
      easing: "ease-out-cubic",
      once: true,           // anima só uma vez
      offset: 120           // começa um pouco antes de aparecer
    });
  }
});
