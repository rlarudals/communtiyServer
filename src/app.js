import express, { response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import firestore from "./firebase";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(morgan(`dev`));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.post("/api/writeBoard", async (req, res) => {
  const {
    body: {
      params: { inputData },
    },
  } = req;

  console.log(inputData);

  const D = new Date();

  let year = D.getFullYear();
  let month = D.getMonth() + 1;
  let date = D.getDate();

  month = month < 10 ? "0" + month : month;
  date = date < 10 ? "0" + date : date;

  console.log(year);
  console.log(month);
  console.log(date);

  const resultDate = year + "." + month + "." + date;

  let resultCode = 0;

  try {
    const fsRef = firestore.collection("Boards");

    await fsRef.add({
      author: inputData.author,
      description: inputData.description,
      hit: parseInt(0),
      isDelete: Boolean(false),
      registDate: resultDate,
      title: inputData.title,
      type: inputData.type,
    });
    resultCode = 1;
  } catch (e) {
    console.log(e);
  }

  // 0 : false / 1 : true
  return res.json(resultCode);
});

app.post("/api/getFreeboardData", async (req, res) => {
  try {
    let sendData = [];

    await firestore
      .collection("Boards")
      .where("type", "==", "free")
      .where("isDelete", "==", false)
      .get()
      .then((response) =>
        response.forEach((doc) => {
          sendData.push({
            refKey: doc.id,
            title: doc.data().title,
            author: doc.data().author,
            registDate: doc.data().registDate,
            hit: doc.data().hit,
          });
        })
      );

    return res.json(sendData);
  } catch (e) {
    console.log(e);
    return [];
  }
});

app.post("/api/getDocsboardData", async (req, res) => {
  try {
    let sendData = [];

    await firestore
      .collection("Boards")
      .where("type", "==", "docs")
      .where("isDelete", "==", false)
      .get()
      .then((response) =>
        response.forEach((doc) => {
          sendData.push({
            refKey: doc.id,
            title: doc.data().title,
            author: doc.data().author,
            registDate: doc.data().registDate,
            hit: doc.data().hit,
          });
        })
      );
    return res.json(sendData);
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log(`Server start http://localhost:${PORT}`);
});
