/* ==============================
   ANO AUTOMÁTICO
   ============================== */
const anoEl = document.getElementById("ano");
if (anoEl) {
  anoEl.textContent = new Date().getFullYear();
}

/* ==============================
   ANIMAÇÃO AO SCROLL
   ============================== */
const elementos = document.querySelectorAll(".animate");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.2
  });

  elementos.forEach(el => observer.observe(el));
} else {
  // fallback simples
  elementos.forEach(el => el.classList.add("show"));
}

/* ==============================
   FORMULÁRIO → WHATSAPP (2 NÚMEROS)
   ============================== */
const form = document.getElementById("form-whatsapp");
const feedback = document.querySelector(".feedback-form");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const servico = document.getElementById("servico").value;
    const mensagem = document.getElementById("mensagem").value.trim();
    const numeroWhatsApp = document.getElementById("destino").value;

    if (!nome || !email) {
      alert("Por favor, preencha nome e e-mail.");
      return;
    }

    if (!numeroWhatsApp) {
      alert("Escolha para qual WhatsApp enviar.");
      return;
    }

    const texto =
      "📌 Solicitação de Proposta\n\n" +
      "👤 Nome: " + nome + "\n" +
      "📧 E-mail: " + email + "\n" +
      "📱 WhatsApp: " + telefone + "\n" +
      "🛠 Serviço: " + servico + "\n\n" +
      "📝 Mensagem:\n" + mensagem;

    const url =
      "https://wa.me/" + numeroWhatsApp +
      "?text=" + encodeURIComponent(texto);

    window.open(url, "_blank");

    if (feedback) {
      feedback.textContent =
        "Mensagem enviada! Em breve entraremos em contato.";
      feedback.style.display = "block";
    }

    form.reset();
  });
}
