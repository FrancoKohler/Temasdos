document.addEventListener("DOMContentLoaded", function () {
  /* SE LE COMANDA QUE COJA DEL IRL DATA.JSON*/
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

/*SCRIPT PARA POPULATE DE PIEZAS*/
document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.getElementById("pieza");

  piezas.forEach((pieza) => {
    const option = document.createElement("option");
    option.value = pieza.id;
    option.textContent = `${pieza.title} - Precio: ${pieza.price} €`;
    option.dataset.price = pieza.price;
    dropdown.appendChild(option);
  });
});
/*SCRIPT QUE COGE LA INFO Y LA RESUMEN*/
document.addEventListener("DOMContentLoaded", function () {
  /*FUNCION PARA EL RESUMEN*/
  const updateResumen = () => {
    /*VACIA LA LINEA EXISTENTE*/
    resumenList.innerHTML = "";

    /*COGE LOS VALORES*/
    const modelo = modeloSelect.options[modeloSelect.selectedIndex].text;
    const tela = telaSelect.options[telaSelect.selectedIndex]?.text || "";
    const piezas = piezaSelects.map(
      (select) => select.options[select.selectedIndex].text
    );

    /*CREA ITEMS*/
    const modeloItem = document.createElement("li");
    modeloItem.textContent = `Modelo: ${modelo}`;
    resumenList.appendChild(modeloItem);

    const telaItem = document.createElement("li");
    telaItem.textContent = `Tela: ${tela}`;
    resumenList.appendChild(telaItem);

    piezas.forEach((pieza, index) => {
      const piezaItem = document.createElement("li");
      piezaItem.textContent = `Pieza ${index + 1}: ${pieza}`;
      resumenList.appendChild(piezaItem);
    });
  };

  const modeloSelect = document.getElementById("modelo");
  const telaSelect = document.getElementById("tela");
  const piezaSelects = [
    document.getElementById("pieza"),
    document.getElementById("pieza2"),
    document.getElementById("pieza3"),
  ];
  const resumenList = document.querySelector(".ul-config");

  modeloSelect.addEventListener("change", updateResumen);
  piezaSelects.forEach((select) =>
    select.addEventListener("change", updateResumen)
  );
});

function generatePDF() {
  // Obtener datos del formulario
  const nombre = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  // Utilizar jsPDF para crear un nuevo documento PDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Agregar contenido al PDF
  doc.text("Información del Usuario", 10, 10);
  doc.text(`Nombre: ${nombre}`, 10, 20);
  doc.text(`Email: ${email}`, 10, 30);

  // Guardar el PDF con un nombre específico
  doc.save("informacion_usuario.pdf");
}
