document.addEventListener("DOMContentLoaded", function () {
  const materialesSet = new Set();

  // TOMA CADA PIEZA Y COGE EL MATERIAL
  piezas.forEach((pieza) => {
    if (pieza.price) {
      pieza.price.forEach((precio) => {
        materialesSet.add(precio.material);
      });
    }
  });

  const dropdown = document.getElementById("tela");

  dropdown.innerHTML = "";

  // AGREGAR OPCIONES DROPDOWN
  materialesSet.forEach((material) => {
    const option = document.createElement("option");
    option.value = material;
    option.textContent = material;
    dropdown.appendChild(option);
  });
  generarResumen();
});

// SCRIPT PARA LLENAR LAS PIEZAS
document.addEventListener("DOMContentLoaded", function () {
  // COGE LOS ID DE PIEZAS DEL 1-8
  for (let i = 1; i <= 8; i++) {
    const dropdown = document.getElementById(`pieza${i}`);

    if (dropdown) {
      piezas.forEach((pieza) => {
        const option = document.createElement("option");
        option.value = pieza.id;
        option.textContent = `${pieza.title}`;
        option.dataset.price = JSON.stringify(pieza.price);
        option.dataset.imageUrl = pieza.imageUrl;
        dropdown.appendChild(option);
      });
    }
  }
});

// DROPDOWN
function toggleDropdown() {
  document.getElementById("dropdown-content").classList.toggle("show");
}

function openTab(evt, tabName) {
  var tabcontent = document.getElementsByClassName("tabcontent");
  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.remove("active");
  }
  var tablinks = document.getElementsByClassName("tablinks");
  for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  var tab = document.getElementById(tabName);
  if (tab) {
    tab.classList.add("active");
    evt.currentTarget.className += " active";
  }
}

// FUNCION DE CREACION DE DIVS DE OPTIONS CON LAS IMG

function selectOption(element) {
  const selectedOption = element.dataset.nombre;
  document.getElementById(
    "selected-option"
  ).innerText = `Tela seleccionada: ${selectedOption}`;
  document.getElementById("selected-option").dataset.nombre = selectedOption;
  document.getElementById("dropdown-content").classList.remove("show");
}

function initializeTabs() {
  const tabContentContainer = document.getElementById("tab-content-container");
  for (const [tabName, items] of Object.entries(muestras)) {
    const tabContentDiv = document.createElement("div");
    tabContentDiv.id = tabName;
    tabContentDiv.className = "tabcontent";
    items.forEach((item) => {
      const itemContainer = document.createElement("div");
      itemContainer.className = "item-container";

      const option = document.createElement("p");
      option.dataset.nombre = item.nombre;
      option.innerHTML = `
        <img id="muestraImg" src="${item.img}" alt="${item.nombre}" class="telas-image">
        <p>${item.nombre}</p>
      `;

      option.onclick = function () {
        selectOption(this);
      };

      itemContainer.appendChild(option);
      tabContentDiv.appendChild(itemContainer);
    });
    tabContentContainer.appendChild(tabContentDiv);
  }

  // ABRIR DIRECTAMENTE LA BRIXTON AL ABRIR EL TAB
  openTab({ currentTarget: document.querySelector(".tablinks") }, "brixton");
}

// EVITA QUE SE CIERRE AL APRETAR LAS TABS
window.onclick = function (event) {
  if (
    !event.target.matches(".select-box") &&
    !event.target.matches(".tablinks")
  ) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", initializeTabs);
document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.getElementById("dropdown-content");

  dropdown.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      /*Obtener texto de elemento seleccionado*/
      const selectedOption = event.target.textContent;
    }
  });
});

// RESUMEN
document.addEventListener("DOMContentLoaded", function () {
  const selectElements = document.querySelectorAll("select");

  selectElements.forEach((select) => {
    select.addEventListener("change", function () {
      generarResumen();
      mostrarImagenes();
    });
  });

  const motorInput = document.getElementById("motor");
  motorInput.addEventListener("input", function () {
    const motorValue = parseInt(motorInput.value, 10);
    const motorTotal = motorValue * 179;
    document.getElementById(
      "output"
    ).textContent = `Total Motor: ${motorTotal}€`;
    generarResumen();
  });

  generarResumen();
});

function generarResumen() {
  const modelo = document.getElementById("modelo").value;
  const piezasSeleccionadas = obtenerPiezasSeleccionadas();
  const telaDropdown = document.getElementById("tela");
  const tela =
    telaDropdown.options[telaDropdown.selectedIndex]?.text ||
    "Seleccione una tela"; // Obtener el texto seleccionado o "Seleccione una tela" si no hay selección
  const muestra = document.getElementById("selected-option").dataset.nombre;

  const piezasFiltradas = piezasSeleccionadas.filter(
    (pieza) => pieza.id !== "None"
  );

  const precioPiezas = piezasFiltradas.reduce((total, pieza) => {
    const precioPieza = obtenerPrecioPorMaterial(pieza.id, tela);
    console.log(`Precio de ${pieza.id} para tela ${tela}: ${precioPieza}`);
    return total + precioPieza;
  }, 0);

  const motorValue = parseInt(document.getElementById("motor").value, 10) || 0;
  const motorTotal = motorValue * 179;

  const precioTotal = precioPiezas + motorTotal;

  const resumenElement = document.getElementById("resumen");
  resumenElement.innerHTML = `
    <li>Modelo: ${modelo}</li>
    ${
      piezasFiltradas.length > 0
        ? "<li>Piezas seleccionadas:</li><ul>" +
          piezasFiltradas
            .map(
              (pieza) =>
                `<li>${pieza.nombre} - ${obtenerPrecioPorMaterial(
                  pieza.id,
                  tela
                ).toFixed(2)}€</li>`
            )
            .join("") +
          "</ul>"
        : ""
    }
    <li>Serie seleccionada: ${tela}</li>
    <li>Tela seleccionada: ${muestra}</li>
    <li>Precio Motor: ${motorTotal.toFixed(2)}€</li>
    <li>Precio Total: ${precioTotal.toFixed(2)}€</li>
  `;
}

function obtenerPiezasSeleccionadas() {
  const piezasSeleccionadas = [];
  for (let i = 1; i <= 8; i++) {
    const piezaSelect = document.getElementById(`pieza${i}`);

    if (piezaSelect.selectedIndex !== -1) {
      const piezaSeleccionada = {
        id: piezaSelect.value,
        nombre: piezaSelect.options[piezaSelect.selectedIndex].text,
      };
      if (piezaSeleccionada.id !== "None") {
        piezasSeleccionadas.push(piezaSeleccionada);
      }
    }
  }
  return piezasSeleccionadas;
}

function obtenerPrecioPorMaterial(idPieza, tela) {
  const pieza = piezas.find((p) => p.id === idPieza);

  if (pieza) {
    if (pieza.price) {
      const precioMaterial = pieza.price.find((p) => p.material === tela);
      if (precioMaterial) {
        return parseFloat(precioMaterial.precio);
      }
    }
  }
  return 0;
}

// USO DE CHATGPT PARA VE BIEN ROTACION PERO CON LOGICA HA SIDO MEJORADA. ERROR ACTUAL QUE LA SEGUNDA YUTRA NO APARECE BIEN
function mostrarImagenes() {
  const imagenesDiv = document.getElementById("imagenPiezas");
  imagenesDiv.innerHTML = ""; // Limpiar las imágenes anteriores
  let yutraPosition = null;
  let currentY = 0;
  let currentX = 0; // Acumulador de la posición Y para las siguientes imágenes
  let rotateAfterYutra = false; // Indica si se debe rotar la imagen después de YUTRA
  let previousYutraPosition = null; // Guardar la posición de la pieza YUTRA anterior
  for (let i = 1; i <= 8; i++) {
    const piezaSelect = document.getElementById(`pieza${i}`);

    if (piezaSelect.selectedIndex !== -1) {
      const selectedOption = piezaSelect.options[piezaSelect.selectedIndex];
      const imageUrl = selectedOption.dataset.imageUrl;
      const piezaId = selectedOption.value;

      const containerHeight =
        parseInt(selectedOption.dataset.height, 10) || 350; // Valor predeterminado si no se especifica

      if (imageUrl && piezaId !== "None") {
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = selectedOption.textContent;
        imgElement.style.margin = "0px";
        imgElement.style.verticalAlign = "top";
        imgElement.style.position = "absolute";
        imgElement.classList.add("img-config");
        imagenesDiv.appendChild(imgElement);

        if (piezaId === "YUTRA") {
          // Guardar la posición de YUTRA después de que se haya renderizado en el DOM
          const rect = imgElement.getBoundingClientRect();
          yutraPosition = {
            left: rect.left - imagenesDiv.getBoundingClientRect().left,
            top: rect.top - imagenesDiv.getBoundingClientRect().top,
            width: rect.width,
            height: rect.height,
          };
          currentY = yutraPosition.top + yutraPosition.height;
          currentX = yutraPosition.left + yutraPosition.width; // Establecer la posición inicial para las siguientes imágenes
          rotateAfterYutra = true; // Indicar que las siguientes imágenes deben rotarse
        } else if (rotateAfterYutra) {
          // Rotar y posicionar la imagen debajo de la última imagen añadida
          imgElement.style.transform = "rotate(90deg)";
          imgElement.style.position = "absolute"; // Asegurar que la imagen se posiciona de forma absoluta
          imgElement.style.left = `${currentX}px`;
          imgElement.style.top = `${currentY}px`;

          // Actualizar las coordenadas para la siguiente imagen
          const imgRect = imgElement.getBoundingClientRect();
          currentY += imgRect.height;
        } else {
          // Posicionar la imagen normalmente
          imgElement.style.position = "relative";
          imgElement.style.display = "inline-block";
          imgElement.style.left = "0"; // Resetear el left para imágenes normales
          imgElement.style.top = "0"; // Resetear el top para imágenes normales
        }
      }
    }
  }
}

generarResumen();
mostrarImagenes();

// Event listener para el botón "GENERAR PRESUPUESTO"
/* document.getElementById("generateBtn").addEventListener("click", function () {
  const nombreEmpresa = document.getElementById("nombreEmpresa").value;
  const cifEmpresa = document.getElementById("cifEmpresa").value;
  const nombreCliente = document.getElementById("nombreCliente").value;
  const cifCliente = document.getElementById("cifCliente").value;
  const emailCliente = document.getElementById("emailCliente").value;
  const telefonoCliente = document.getElementById("telefonoCliente").value;
  const pais = document.getElementById("pais").value;
  const ciudad = document.getElementById("ciudad").value;
  const codigoPostal = document.getElementById("codigoPostal").value;
  const localidad = document.getElementById("localidad").value;
  const puertaPiso = document.getElementById("puertaPiso").value;
  const modelo = document.getElementById("modelo").value;
  const tela = document.getElementById("tela").value;
  const muestra = document.getElementById("selected-option").dataset.nombre;

  
  if (typeof html2canvas === "function") {
    html2canvas(document.getElementById("imagenPiezas"))
      .then(function (canvas) {
        const imgData = canvas.toDataURL("image/jpeg");
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text(20, 20, `Nombre de empresa: ${nombreEmpresa}`);
        doc.text(20, 30, `CIF/NIF de empresa: ${cifEmpresa}`);
        doc.text(20, 40, `Nombre del cliente: ${nombreCliente}`);
        doc.text(20, 50, `CIF/NIF del cliente: ${cifCliente}`);
        doc.text(20, 60, `Email del cliente: ${emailCliente}`);
        doc.text(20, 70, `Teléfono del cliente: ${telefonoCliente}`);
        doc.text(20, 80, `País: ${pais}`);
        doc.text(20, 90, `Ciudad: ${ciudad}`);
        doc.text(20, 100, `Código Postal: ${codigoPostal}`);
        doc.text(20, 110, `Localidad: ${localidad}`);
        doc.text(20, 120, `Puerta/Piso: ${puertaPiso}`);
        doc.text(20, 130, `Modelo seleccionado: ${modelo}`);
        doc.text(20, 140, `Serie seleccionada: ${tela}`);
        doc.text(20, 150, `Tela seleccionada: ${muestra}`);

        // Add captured image to your PDF
        doc.addImage(imgData, "JPEG", 20, 160, 170, 100);
        
        doc.save("presupuesto.pdf");
      })
      .catch(function (error) {
        console.error("html2canvas error:", error);
      });
  } else {
    console.error("html2canvas is not loaded correctly.");
  }
}); */
