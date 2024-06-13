// Función para obtener las piezas seleccionadas
function obtenerPiezasSeleccionadas() {
  const piezasSeleccionadas = [];
  for (let i = 1; i <= 8; i++) {
    const piezaSelect = document.getElementById(`pieza${i}`);
    const piezaSeleccionada = {
      id: piezaSelect.value,
      nombre: piezaSelect.options[piezaSelect.selectedIndex].text,
    };
    if (piezaSeleccionada.id !== "None") {
      piezasSeleccionadas.push(piezaSeleccionada);
    }
  }
  return piezasSeleccionadas;
}

// Función para obtener el precio de la pieza seleccionada
function obtenerPrecioPieza(piezaId) {
  const precioSeleccionado = obtenerPrecioSeleccionado(piezaId);
  const pieza = piezas.find((p) => p.id === piezaId);
  if (pieza && precioSeleccionado) {
    const precio = pieza.price.find((p) => p.material === precioSeleccionado);
    return precio ? precio.precio : null;
  }
  return null;
}

// Función para obtener el precio seleccionado de la pieza
function obtenerPrecioSeleccionado(piezaId) {
  const piezaSelect = document.getElementById(piezaId);
  return piezaSelect ? piezaSelect.value : null;
}

document.addEventListener("DOMContentLoaded", function () {
  /* SE LE COMANDA QUE COJA DEL URL DATA.JSON*/
  const url = "data.json";

  /*SELECCIONADO EL DROPDOWN DEL DOM*/
  const dropdown = document.getElementById("tela");

  /*CON FETCH TRAIGO LOS ARCHIVOS DEL DATA.JSON*/
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      /*SOBRE ESOS DATOS CREA UNA OPTION POR CADA UNO*/
      data.forEach((item) => {
        const option = document.createElement("option");
        option.id = item.id;
        option.textContent = `${item.serie} / ${item.tela}`;

        dropdown.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching the data:", error));
});

/*SCRIPT PARA LLENAR LAS PIEZAS*/
document.addEventListener("DOMContentLoaded", function () {
  /*COGE LOS ID DE PIEZAS DEL 1-8*/
  for (let i = 1; i <= 8; i++) {
    const dropdown = document.getElementById(`pieza${i}`);

    if (dropdown) {
      piezas.forEach((pieza) => {
        const option = document.createElement("option");
        option.value = pieza.id;
        option.textContent = `${pieza.title}`;
        option.dataset.price = JSON.stringify(pieza.price); // Convertir el precio a string
        dropdown.appendChild(option);
      });
    }
  }
});

/* RESUMEN */
document.addEventListener("DOMContentLoaded", function () {
  // Obtener todos los elementos select
  const selectElements = document.querySelectorAll("select");

  // Agregar event listener a cada elemento select
  selectElements.forEach((select) => {
    select.addEventListener("change", function () {
      generarResumen();
    });
  });

  // Llamar a generarResumen() inicialmente para mostrar el resumen al cargar la página
  generarResumen();
});

// Función para generar el resumen
function generarResumen() {
  // Obtener valores seleccionados
  const modelo = document.getElementById("modelo").value;
  const piezas = obtenerPiezasSeleccionadas();
  const tela = document.getElementById("tela").value;

  // Obtener precios de las piezas seleccionadas
  const preciosPiezas = piezas.map((pieza) => {
    const precio = obtenerPrecioPieza(pieza.id);
    return precio ? `${pieza.nombre}: ${precio}` : null;
  });

  // Filtrar piezas seleccionadas que no sean "None"
  const piezasFiltradas = piezas.filter((pieza) => pieza.id !== "None");

  // Mostrar resumen
  const resumenElement = document.getElementById("resumen");
  resumenElement.innerHTML = `
        <li>Modelo: ${modelo}</li>
        ${
          piezasFiltradas.length > 0
            ? "<li>Piezas seleccionadas:</li><ul>" +
              preciosPiezas.map((precio) => `<li>${precio}</li>`).join("") +
              "</ul>"
            : ""
        }
        <li>Tela seleccionada: ${tela}</li>
    `;
}
