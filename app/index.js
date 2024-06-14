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
});

function generarResumen() {
  // Obtener valores seleccionados
  const modelo = document.getElementById("modelo").value;
  const piezas = obtenerPiezasSeleccionadas();
  const tela = document.getElementById("tela").value;

  // Filtrar piezas seleccionadas que no sean "None"
  const piezasFiltradas = piezas.filter((pieza) => pieza.id !== "None");

  // Mostrar resumen
  const resumenElement = document.getElementById("resumen");
  resumenElement.innerHTML = `
        <li>Modelo: ${modelo}</li>
        ${
          piezasFiltradas.length > 0
            ? "<li>Piezas seleccionadas:</li><ul>" +
              piezasFiltradas
                .map((pieza) => `<li>${pieza.nombre}</li>`)
                .join("") +
              "</ul>"
            : ""
        }
        <li>Tela seleccionada: ${tela}</li>
    `;
}

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

// Llamar a generarResumen() inicialmente para mostrar el resumen al cargar la página
generarResumen();
