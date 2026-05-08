import { initNavigation } from "./navigation.js";
import { initNavbar, resetNavbarScroll } from "./nav_bar.js";
import { initMenu } from "./menu.js";

document.addEventListener("DOMContentLoaded", ()=> {
    const navigation = initNavigation()

    initMenu()
    initNavbar(navigation)

    document.querySelectorAll(".nav_bar__opciones a").forEach(link => {
        link.addEventListener("click", ()=>{
            document.body.classList.remove("menu-open")

            const nav_bar = document.getElementById("navbar")
            nav_bar.classList.remove("hidden-scroll")

            resetNavbarScroll()
        })
    })
})