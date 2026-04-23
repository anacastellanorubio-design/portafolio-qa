// 1. CAMBIAR POR URL Y KEY DE TU API
const SUPABASE_URL = 'https://bavsppsyyfzblwdvhrca.supabase.co/rest/v1/form';                      
const SUPABASE_API_KEY = 'sb_publishable_AYa4RIwBAu1c5ORvsjwCxw_3aOrL8_C';

//ENVIAR DATOS DE UN FORMULARIO A UNA API CON POST
//2. FUNCION PARA ENVIAR DATOS DEL FORMULARIO A LA API, esta funcion debes ponerla en el boton del formulario que quieras usar.
function enviarFormulario(event) {
  event.preventDefault();
  

  //3. CAMBIA SI ES NECESARIO LOS DATOS, DEBES INDICAR EL NOMBRE DEL CAMPO QUE QUIERES MANDAR A LA API, Y EL ID DEL FORMULARIO QUE TIENE ESE DATO.
  var data = {

    nombre: document.getElementById('nombre').value, //campo name de la api, se obtiene del input del formulario con id nombre
    email: document.getElementById('email').value, //campo email de la api, se obtiene del input del formulario con id email
    asunto: document.getElementById('asunto').value, //campo subject de la api, se obtiene del input del formulario con id asunto
    mensaje: document.getElementById('mensaje').value //campo message de la api, se obtiene del input del formulario con id mensaje
  }
  postAPI(data);

  nombre: document.getElementById('nombre').value,
  email: document.getElementById('email').value,
  asunto: document.getElementById('asunto').value,
  mensaje: document.getElementById('mensaje').value
};
  postAPI(data);     


   return false;
}
//4. CAMBIA SI QUIERES EL MENSAJE QUE MUESTRA AL ENVIAR EL FORMULARIO (OPCIONAL) 
function mostrarMensajeExito(){
    var formMessage = document.getElementById('formMessage');
  formMessage.textContent = "Formulario enviado correctamente";
  formMessage.style.color  = "green";
}

//5. CAMBIA SI QUIERES EL MENSAJE QUE MUESTRA AL ENVIAR EL FORMULARIO (OPCIONAL) 
function mostrarMensajeError(){
  var formMessage = document.getElementById('formMessage'); //id del elemento de la pagina donde se va a mostrar el mensaje
  formMessage.textContent = "Error al enviar el formulario"; //mensaje que va a mostrarse
  formMessage.style.color  = "red"; //color en el que se va a mostrar
};

//FUNCION GENERICA PARA ENVIAR DATOS A UNA API POST Y MOSTRAR UN MENSAJE DE ERROR O EXITO. NO NECESITAS CAMBIAR NADA, FUNCIONA SIEMPRE.
function postAPI (data){
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
    console.log("RESPUESTA SUPABASE:", text);

    if (!response.ok) {
      throw new Error(text);
    }

    return true;
  })
  .then(function() {
    mostrarMensajeExito();
  })
  .catch(function(error) {
    console.log("ERROR REAL:", error);
    mostrarMensajeError();
  });
}

//MOSTRAR DATOS EN UNA TABLA DE UNA API CON GET
//1. USA ESTA FUNCION EN EL BOTON DE LA PAGINA EN LA QUE QUIERAS MOSTRAR LOS DATOS
function mostrarDatos() {
 //2. INDICA EL ID DE LA TABLA DONDE QUIERES QUE SE MUESTRE
  const table = document.getElementById("formsTable");
  if (!table) return;

  //LLAMA A LA API Y MUESTRA LOS DATOS EN LA TABLA. GENERICA. NO NECESITA CAMBIOS.
  getAPI()
    .then(function(data) {

      if (!Array.isArray(data) || data.length === 0) {
        table.innerHTML = '<tr><td>No hay datos</td></tr>';
        return;
      }

      table.innerHTML = '';

      // CABECERA
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');

      Object.keys(data[0]).forEach(function(key) {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
      });

      thead.appendChild(headerRow);
      table.appendChild(thead);

      // CUERPO
      const tbody = document.createElement('tbody');

      data.forEach(function(item) {
        const row = document.createElement('tr');

        Object.values(item).forEach(function(value) {
          const td = document.createElement('td');
          td.textContent = value ?? '';
          row.appendChild(td);
        });

        tbody.appendChild(row);
      });

      table.appendChild(tbody);
    })
    .catch(function(error) {
      console.error(error);
      table.innerHTML = '<tr><td>Error</td></tr>';
    });
}

  //FUNCIÓN PARA OBTENER LOS DATOS DE LA API CON GET. GENERICA NO NECESITA CAMBIOS.
function getAPI() {
  return fetch(SUPABASE_URL, {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_API_KEY,
      'Authorization': 'Bearer ' + SUPABASE_API_KEY
    }
  })
  .then(function(response) {
    if (!response.ok) throw new Error('Error');
    return response.json();
  });
};


