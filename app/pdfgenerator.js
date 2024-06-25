import express from "express";
import indexRoutes from "./routes/pdfgenerator.js";
const app = express();

app.use(indexRoutes);

app.listen(3000, () => {
  console.log("server on port 3000");
});
