export function initSidebar() {
    const sidebar = document.getElementById("sidebar")
    const navbar = document.getElementById("navbar")
    const menuBtn = document.getElementById("menuBtn")

    menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("active")

        navbar.classList.add("hidden")

        setTimeout(() => {
            sidebar.classList.toggle("active")
        }, 300)
    })

    return {
        closeSidebar() {
            sidebar.classList.remove("active")
            menuBtn.classList.remove("active")
        },
        hideNavbar() {
            navbar.classList.add("hidden")
        },
        showNavbar() {
            navbar.classList.remove("hidden")
        }
    }
}