const downloadBtn = document.querySelector('[data-id="btn_download_cv"]')

downloadBtn.addEventListener("click", ()=>{
    downloadBtn.textContent = "DESCARGANDO..."

    setTimeout(()=>{
        downloadBtn.textContent = "DESCARGAR"
    }, 2000)
})