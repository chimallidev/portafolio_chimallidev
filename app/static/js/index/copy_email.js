const buttons = document.querySelectorAll(".copyBtn")
const emailText = document.querySelector(".emailText")

buttons.forEach(btn => {
    btn.addEventListener("click", ()=> {
        const text = btn.dataset.copy

        navigator.clipboard.writeText(text).then(()=>{
            btn.textContent = "Copiado ✔"

            setTimeout(()=>{
            btn.textContent = "Copiar"
            }, 1500)
    })
})
})
