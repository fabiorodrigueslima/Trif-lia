// ======================
// AOS
// ======================
AOS.init({
  duration: 900,
  once: true
});

// ======================
// ANO AUTOMÁTICO
// ======================
document.getElementById("ano").textContent = new Date().getFullYear();

// ======================
// FORMULÁRIO WHATSAPP
// ======================
const form = document.getElementById("form-whatsapp");
const feedback = document.querySelector(".feedback-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const servico = document.getElementById("servico").value;
  const mensagem = document.getElementById("mensagem").value;
  const destino = document.getElementById("destino").value;

  if (!destino) {
    feedback.textContent = "Selecione um WhatsApp para envio.";
    return;
  }

  const texto =
    `Olá! Gostaria de solicitar uma proposta.%0A%0A` +
    `Nome: ${nome}%0A` +
    `E-mail: ${email}%0A` +
    `Telefone: ${telefone}%0A` +
    `Serviço: ${servico}%0A` +
    `Mensagem: ${mensagem}`;

  window.open(`https://wa.me/${destino}?text=${texto}`, "_blank");

  feedback.textContent = "Mensagem enviada! Em breve entraremos em contato 🙂";
  form.reset();
});
