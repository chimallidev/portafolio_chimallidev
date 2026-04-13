export function initSidebar() {
    const menuBtn = document.getElementById("menuBtn")

    menuBtn.addEventListener("click", () => {
        document.body.classList.toggle("menu-open")
    })

    return {
        closeSidebar() {
            document.body.classList.remove("menu-open")
        }
    }
}