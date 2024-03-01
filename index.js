import express, { json } from "express";
import cors from "cors";
import { checkDate } from "./checkDate.js";
import fs from "fs";
import { config } from "dotenv";
config();

const app = express();
app.use(json());
app.disable("x-powered-by");
app.use(cors());
app.options("*", cors());

const SHARED_KEY = process.env.SHARED_KEY;

app.use("/myapi", (req, res, next) => {
  const sharedKey = req.headers["x-shared-key"];
  if (sharedKey !== SHARED_KEY) {
    return res.status(401).json({ error: "Acceso no autorizado" });
  }
  next();
});

app.get("/myapi", (req, res) => {
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

const PORT = 10301;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
