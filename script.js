
const SUPABASE_URL = 'https://bavsppsyyfzblwdvhrca.supabase.co/rest/v1/form';
const SUPABASE_API_KEY = 'sb_publishable_AYa4RIwBAu1c5ORvsjwCxw_3aOrL8_C';

console.log("SCRIPT CARGADO");

// FORMULARIO
document.getElementById("contactForm")
  .addEventListener("submit", enviarFormulario);

function enviarFormulario(event) {
  event.preventDefault();

  const data = {
    name: document.getElementById('nombre').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('asunto').value,
    message: document.getElementById('mensaje').value
  };

  postAPI(data);
}

// ENVIAR A SUPABASE
function postAPI(data) {
  fetch(SUPABASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_API_KEY,
      'Authorization': 'Bearer ' + SUPABASE_API_KEY
    },
    body: JSON.stringify(data)
  })
  .then(async function(response) {

    const text = await response.text();

    console.log("STATUS:", response.status);
    console.log("RESPUESTA:", text);

    if (!response.ok) {
      mostrarMensajeError();
      return;
    }

    mostrarMensajeExito();
  })
  .catch(function(error) {
    console.log(error);
    mostrarMensajeError();
  });
}

// MENSAJES
function mostrarMensajeExito() {
  document.getElementById('formMessage').textContent = "Formulario enviado correctamente";
  document.getElementById('formMessage').style.color = "green";
}

function mostrarMensajeError() {
  document.getElementById('formMessage').textContent = "Error al enviar el formulario";
  document.getElementById('formMessage').style.color = "red";
}
