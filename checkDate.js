import fs from "fs";
import { consultOpenai } from "./openai.js";

//const fechaActual = "25/1";

export const checkDate = (fechaActual) => {
  fs.readFile("lastAnswer.txt", "utf-8", (err, data) => {
    if (err) throw err;
    let currentDate = data;
    if (currentDate === fechaActual) {
      return;
    } else {
      askOpenai(fechaActual);
    }
  });
};

const askOpenai = async (fechaActual) => {
  let data = await consultOpenai({ stringDate: fechaActual });
  fs.writeFile("lastAnswer.txt", fechaActual, (err) => {
    if (err) throw err;
  });
  fs.writeFile("respuesta.txt", data.message, (err) => {
    if (err) throw err;
  });
};
