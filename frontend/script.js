document.getElementById("queryForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const question = document.getElementById("question").value;
    const pdfInput = document.getElementById("pdf").files[0];
  
    const formData = new FormData();
    formData.append("question", question);
  
    if (pdfInput) {
      const pdfPath = URL.createObjectURL(pdfInput);
      formData.append("pdfPath", pdfPath);
    }
  
    const responseDiv = document.getElementById("response");
    responseDiv.innerHTML = "Processing...";
  
    try {
      const response = await fetch("/query", {
        method: "POST",
        body: JSON.stringify({
          question,
          pdfPath: pdfInput ? pdfInput.name : null,
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      const result = await response.json();
  
      if (response.ok) {
        responseDiv.innerHTML = `<p>Answer: ${result.answer}</p>`;
      } else {
        responseDiv.innerHTML = `<p>Error: ${result.error}</p>`;
      }
    } catch (error) {
      responseDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  });
  