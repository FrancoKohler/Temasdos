document.addEventListener("DOMContentLoaded", function () {
  // Conjunto para almacenar los nombres de los materiales
  const materialesSet = new Set();

  // Recorrer las piezas para obtener los nombres de los materiales
  piezas.forEach((pieza) => {
    if (pieza.price) {
      pieza.price.forEach((precio) => {
        materialesSet.add(precio.material);
      });
    }
  });

  // Elemento select del dropdown
  const dropdown = document.getElementById("tela");

  // Limpiar el dropdown por si ya tiene opciones
  dropdown.innerHTML = "";

  // Crear y agregar opciones al dropdown
  materialesSet.forEach((material) => {
    const option = document.createElement("option");
    option.value = material;
    option.textContent = material;
    dropdown.appendChild(option);
  });
  generarResumen();
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
        option.dataset.price = JSON.stringify(pieza.price);
        option.dataset.imageUrl = pieza.imageUrl; // Agregar URL de imagen como atributo de datos
        dropdown.appendChild(option);
      });
    }
  }
});

/*SCRIPT PREVISUALIZACION DE IMG*/

/* RESUMEN */
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
  const tela = document.getElementById("tela").value;

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
    <li>Tela seleccionada: ${tela}</li>
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

function mostrarImagenes() {
  const imagenesDiv = document.getElementById("imagenPiezas");
  imagenesDiv.innerHTML = ""; // Limpiar las imágenes anteriores
  let lastPieceId = null;
  let yutraPosition = null; // Variable para guardar la posición de YUTRA
  let nextTop = 0; // Coordenada Y para las siguientes imágenes

  for (let i = 1; i <= 8; i++) {
    const piezaSelect = document.getElementById(`pieza${i}`);

    if (piezaSelect.selectedIndex !== -1) {
      const selectedOption = piezaSelect.options[piezaSelect.selectedIndex];
      const imageUrl = selectedOption.dataset.imageUrl;
      const piezaId = selectedOption.value;
      const containerWidth = selectedOption.dataset.width || "215px"; // Valor predeterminado si no se especifica
      const containerHeight = selectedOption.dataset.height || "350px"; // Valor predeterminado si no se especifica

      if (imageUrl && piezaId !== "None") {
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = selectedOption.textContent;

        imgElement.style.maxWidth = containerWidth;
        imgElement.style.maxHeight = containerHeight;
        imgElement.style.margin = "0px";
        imgElement.style.verticalAlign = "top";
        imgElement.style.position = "absolute";

        if (lastPieceId === "YUTRA" && yutraPosition) {
          // Rotar y posicionar la imagen debajo de YUTRA
          imgElement.style.transform = "rotate(90deg)";
          imgElement.style.left = `${yutraPosition.left}px`;
          imgElement.style.top = `${
            yutraPosition.top + yutraPosition.height
          }px`;
          nextTop = yutraPosition.top + yutraPosition.height; // Actualizar la posición vertical base
        } else if (lastPieceId === "YUTRA") {
          // La primera imagen después de YUTRA
          imgElement.style.transform = "rotate(90deg)";
          imgElement.style.left = `${yutraPosition.left}px`;
          imgElement.style.top = `${nextTop}px`;
          nextTop += parseInt(containerWidth, 10); // Incrementar para la siguiente imagen
        } else {
          imgElement.style.position = "relative";
          imgElement.style.display = "inline-block";
          imgElement.style.left = "0"; // Resetear el left para imágenes normales
          imgElement.style.top = "0"; // Resetear el top para imágenes normales
        }

        imagenesDiv.appendChild(imgElement);

        if (piezaId === "YUTRA") {
          // Guardar la posición de YUTRA
          const rect = imgElement.getBoundingClientRect();
          yutraPosition = {
            left: rect.left - imagenesDiv.getBoundingClientRect().left,
            top: rect.top - imagenesDiv.getBoundingClientRect().top,
            width: rect.width,
            height: rect.height,
          };
        }

        lastPieceId = piezaId;
      }
    }
  }
}

// Asegúrate de que el contenedor "imagenesDiv" tenga position: relative en el CSS

// Llamar al resumen y previsualización de imágenes al cargar la página
generarResumen();
mostrarImagenes();
