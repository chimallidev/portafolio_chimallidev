export function initSidebar() {
    const sidebar = document.getElementById("sidebar")
    const navbar = document.getElementById("navbar")
    const menuBtn = document.getElementById("menuBtn")

    menuBtn.addEventListener("click", () => {
        const isActive = sidebar.classList.contains("active");

        menuBtn.classList.toggle("active")

        if (!isActive) {
            // 🔹 Abrir
            navbar.classList.add("hidden");

            setTimeout(() => {
                sidebar.classList.add("active");
                document.body.classList.add("no-scroll");
            }, 300);

        } else {
            // 🔹 Cerrar
            sidebar.classList.remove("active");
            document.body.classList.remove("no-scroll"); 

            setTimeout(() => {
                navbar.classList.remove("hidden");
            }, 300);
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