const downloadBtn = document.querySelector(".index__descargar-cv")

downloadBtn.addEventListener("click", ()=>{
    downloadBtn.textContent = "DESCARGANDO..."

    setTimeout(()=>{
        downloadBtn.textContent = "DESCARGAR"
    }, 2000)
})