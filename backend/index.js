require("dotenv").config();
console.log(process.env);
const express = require("express");
const bodyParser = require("body-parser");
const { OpenAI } = require("@langchain/openai");
const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static("frontend"));

const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });

app.post("/query", async (req, res) => {
  const { question, pdfPath } = req.body;
  const npnwPdfPath = "assets/npnw.pdf";
  console.log("context", req.body);
  console.log("npnwPdfPath", npnwPdfPath);

  try {
    let context = "";
    const pdfLoader = new PDFLoader(npnwPdfPath);
    context = await pdfLoader.load();
    console.log("context", context[0]);

    // if (pdfPath) {
    //   const pdfLoader = new PDFLoader(npnwPdfPath);
    //   context = await pdfLoader.load();
    // }

    // const response = await model.call({
    //   prompt: `${context}\n\nQ: ${question}\nA:`,
    // });

    // res.json({ answer: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
