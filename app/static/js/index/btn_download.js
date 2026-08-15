const downloadBtn = document.querySelector('[data-id="btn_download_cv"]')

downloadBtn.addEventListener("click", ()=>{

    
    if (downloadBtn.dataset.copyLocked === "true") {
        return;
    }

    downloadBtn.dataset.copyLocked = "true";

    downloadBtn.textContent = "Descargando..."

    downloadBtn.classList.add(
        "chimalli-button--locked"
    );

    downloadBtn.classList.add(
        "chimalli-button--waiting"
    );


    setTimeout(()=>{
        downloadBtn.textContent = "Descargar"

        delete downloadBtn.dataset.copyLocked;

        downloadBtn.classList.remove(
            "chimalli-button--locked"
        );

        downloadBtn.classList.remove(
            "chimalli-button--waiting"
        );
    }, 2000)
})