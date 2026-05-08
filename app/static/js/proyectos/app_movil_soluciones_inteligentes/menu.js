export function initMenu() {
    const btn = document.getElementById("menuBtn")

    btn.addEventListener("click", ()=>{
        const isOpen = document.body.classList.toggle("menu-open")

        btn.setAttribute("aria-expanded", isOpen)
        btn.setAttribute("aria-label",
            isOpen ? "Cerrar menú" : "Abrir menú"
        )
    })
}