const express = require("express");
const app = express();
const path = require("path");
const nodemailer = require("nodemailer");
const port = 5503;

// Middleware para parsear JSON y urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la raíz del proyecto
app.use(express.static(path.join(__dirname)));

// Ruta para la página principal (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Ruta para manejar el envío del formulario
app.post("/enviarCorreo", async (req, res) => {
  // Extraer las direcciones de correo electrónico del cuerpo del formulario
  const emailCliente = req.body.emailCliente;
  const emailEmpresa = req.body.emailEmpresa;

  // Configuración del transporte de correo usando nodemailer (ejemplo con servicio SMTP de prueba)
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "usuario-de-prueba@ethereal.email",
      pass: "contraseña-de-prueba",
    },
  });

  try {
    // Enviar correo al cliente
    let infoCliente = await transporter.sendMail({
      from: "kohler1395@gmail.com",
      to: emailCliente,
      subject: "Gracias por contactarnos",
      text: "Este es un mensaje de prueba para el cliente.",
    });

    // Enviar correo a la empresa
    let infoEmpresa = await transporter.sendMail({
      from: "kohler1395@gmail.com",
      to: emailEmpresa,
      subject: "Nuevo contacto desde el formulario",
      text: "Este es un mensaje de prueba para la empresa.",
    });

    console.log("Correo enviado al cliente: " + infoCliente.messageId);
    console.log("Correo enviado a la empresa: " + infoEmpresa.messageId);

    res.send("Correos enviados correctamente.");
  } catch (error) {
    console.error("Error al enviar los correos:", error);
    res.status(500).send("Error al enviar los correos.");
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
