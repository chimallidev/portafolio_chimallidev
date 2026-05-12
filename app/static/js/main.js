import { initNavigation } from "./navigation.js"
import { initNavbar } from "./navbar.js"
import { initSidebar } from "./sidebar.js"
import { resetNavbarScroll } from "./navbar.js"

document.addEventListener("DOMContentLoaded", () => {
    const navigation = initNavigation()

    initNavbar(navigation)
    initSidebar()

    document.querySelectorAll(".sidebar a").forEach(link => {
        link.addEventListener("click", () => {
            document.body.classList.remove("menu-open")

            const navbar = document.getElementById("navbar");
            navbar.classList.remove("hidden-scroll");

            resetNavbarScroll()
        })
    })

    window.addEventListener("wheel", () => {
        navigation.unlockNavbar()
    })

    window.addEventListener("touchstart", () => {
        navigation.unlockNavbar()
    })
})