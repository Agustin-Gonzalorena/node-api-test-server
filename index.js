import express, { json } from "express";
import cors from "cors";
import { checkDate } from "./checkDate.js";
import fs from "fs";

const app = express();
app.use(json());
app.disable("x-powered-by");
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
app.get("/api", (req, res) => {
  checkDate();
  fs.readFile("respuesta.txt", "utf-8", (err, data) => {
    if (err) throw err;
    res.json({ message: data });
  });
});

const PORT = 80;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
