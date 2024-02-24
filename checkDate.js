import fs from "fs";
import { consultOpenai } from "./openai.js";

//const fechaActual = "25/1";

const newDate = new Date();
const day = newDate.getDate();
const month = newDate.getMonth() + 1;
const fechaActual = `${day}/${month}`;

export const checkDate = () => {
  fs.readFile("lastAnswer.txt", "utf-8", (err, data) => {
    if (err) throw err;
    let currentDate = data;
    if (currentDate === fechaActual) {
      return;
    } else {
      askOpenai();
    }
  });
};

const askOpenai = async () => {
  let data = await consultOpenai({ stringDate: fechaActual });
  fs.writeFile("lastAnswer.txt", fechaActual, (err) => {
    if (err) throw err;
  });
  fs.writeFile("respuesta.txt", data.message, (err) => {
    if (err) throw err;
  });
};
