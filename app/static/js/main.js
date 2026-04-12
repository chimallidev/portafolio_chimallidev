import { initNavigation } from "./navigation.js"
import { initNavbar } from "./navbar.js"
import { initSidebar } from "./sidebar.js"

document.addEventListener("DOMContentLoaded", () => {
    const navigation = initNavigation()
    const sidebar = initSidebar()

    initNavbar(navigation)

    document.querySelectorAll(".sidebar a").forEach(link => {
        link.addEventListener("click", () => {
            sidebar.closeSidebar()
            sidebar.hideNavbar()

            setTimeout(() => {
                sidebar.showNavbar()
            }, 500)
        })
    })
})