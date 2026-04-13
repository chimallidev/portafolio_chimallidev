export function initSidebar() {
    const menuBtn = document.getElementById("menuBtn")
    const closeBtn = document.getElementById("closeSidebarBtn")

    menuBtn.addEventListener("click", () => {
        document.body.classList.toggle("menu-open")
    })

    closeBtn.addEventListener("click", () => {
        document.body.classList.remove("menu-open")
    })

    return {
        closeSidebar() {
            document.body.classList.remove("menu-open")
        }
    }
}