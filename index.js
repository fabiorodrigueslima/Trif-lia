// ================================
// ATUALIZA ANO AUTOMÁTICO NO FOOTER
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

    // Campos
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const servico = document.getElementById("servico").value;
    const mensagem = document.getElementById("mensagem").value.trim();
    const destino = document.getElementById("destino").value;

    // Validação básica
    if (!nome || !email || !destino) {
      mostrarFeedback("Por favor, preencha os campos obrigatórios.", "erro");
      return;
    }

    // Monta mensagem
    const texto = `
Olá! Gostaria de solicitar uma proposta.

Nome: ${nome}
E-mail: ${email}
WhatsApp: ${telefone || "Não informado"}
Serviço de interesse: ${servico}

Mensagem:
${mensagem || "Não informada"}
    `;

    const textoCodificado = encodeURIComponent(texto);
    const url = `https://wa.me/${destino}?text=${textoCodificado}`;

    // Feedback positivo
    mostrarFeedback("Redirecionando para o WhatsApp...", "sucesso");

    // Pequeno delay para UX
    setTimeout(() => {
      window.open(url, "_blank");
      form.reset();
    }, 800);
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
// DARK MODE
// ================================
const toggleTheme = document.getElementById("toggle-theme");

// Mantém preferência salva
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  if (toggleTheme) toggleTheme.textContent = "☀️";
}

if (toggleTheme) {
  toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      toggleTheme.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      toggleTheme.textContent = "🌙";
    }
  });
}
