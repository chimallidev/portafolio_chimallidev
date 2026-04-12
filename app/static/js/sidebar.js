export function initSidebar() {
    const sidebar = document.getElementById("sidebar")
    const navbar = document.getElementById("navbar")
    const menuBtn = document.getElementById("menuBtn")

    menuBtn.addEventListener("click", () => {
        const isActive = sidebar.classList.contains("active")

        menuBtn.classList.toggle("active")
        

        if (!isActive) {
            // 1. Animación del botón
            menuBtn.classList.add("active")

            // 2. Ocultar navbar después
            setTimeout(() => {
                navbar.classList.add("hidden")

                // 3. Mostrar sidebar después
                setTimeout(() => {
                    sidebar.classList.add("active")
                    document.body.classList.add("no-scroll")
                }, 300); // duración navbar

            }, 400); // duración animación botón

        } else {
            // Cierre (orden inverso)

            // 1. Ocultar sidebar
            sidebar.classList.remove("active")
            document.body.classList.remove("no-scroll")

            // 2. Mostrar navbar después
            setTimeout(() => {
                navbar.classList.remove("hidden")

                // 3. Reset botón
                setTimeout(() => {
                    menuBtn.classList.remove("active")
                }, 300)

            }, 600)
        }
    })

    return {
        closeSidebar() {
            sidebar.classList.remove("active")
            menuBtn.classList.remove("active")
            document.body.classList.remove("no-scroll")
        },
        hideNavbar() {
            navbar.classList.add("hidden")
        },
        showNavbar() {
            navbar.classList.remove("hidden")
        }
    }
}