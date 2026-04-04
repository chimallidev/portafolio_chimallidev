const copyBtn = document.getElementById("copyBtn")
const emailText = document.getElementById("emailText")

copyBtn.addEventListener("click", ()=> {
    const email = emailText.textContent.trim()

    navigator.clipboard.writeText(email).then(()=>{
        copyBtn.textContent = "Copiado ✔"

        setTimeout(()=>{
            copyBtn.textContent = "Copiar"
        }, 1500)
    })
})