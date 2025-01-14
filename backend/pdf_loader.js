const { readFileSync } = require("fs");
const { Document } = require("langchain/document");
const { PDFLoader: LangPDFLoader } = require("langchain/document_loaders/fs/pdf");

class PDFLoader {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getText() {
    const loader = new LangPDFLoader(this.filePath);
    const docs = await loader.load();
    return docs.map((doc) => doc.pageContent).join("\n");
  }
}

module.exports = { PDFLoader };
