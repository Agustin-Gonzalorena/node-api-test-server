import express, { json } from "express";
import cors from "cors";
import { checkDate } from "./checkDate.js";
import fs from "fs";
import https from "https";

const app = express();
app.use(json());
app.disable("x-powered-by");
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
app.get("/api", (req, res) => {
  const newDate = new Date();
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const fechaActual = `${day}/${month}`;

  checkDate(fechaActual);
  fs.readFile("respuesta.txt", "utf-8", (err, data) => {
    if (err) throw err;
    res.json({ message: data });
  });
});

const options = {
  key: fs.readFileSync("/etc/ssl/private/apache-selfsigned.key"),
  cert: fs.readFileSync("/etc/ssl/certs/apache-selfsigned.crt"),
};

const server = https.createServer(options, app);

const PORT = 443; // Puerto HTTPS

server.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});

/* const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); */
