let lastScroll = 0

export function initNavbar(navigation){
    const navbar = document.getElementById("navbar")

    window.addEventListener('scroll', () => {

        if(navigation.isNavbarLocked()) return
        if(
            document.body.classList.contains("menu-open") ||
            navigation.isScrolling()
        ) return

        const currentScroll = window.scrollY

        if(currentScroll > lastScroll){
            navbar.classList.add("hidden-scroll")
        } else {
            navbar.classList.remove("hidden-scroll")
        }

        lastScroll = currentScroll
    })
}

export function resetNavbarScroll(){
    lastScroll = window.scrollY
}