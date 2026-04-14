export function initNavbar(navigation){
    const navbar = document.getElementById("navbar")

    let lastScroll = 0

    window.addEventListener("scroll", ()=> {
        if (navigation.isNavbarLocked()) return
        if (
            document.body.classList.contains("menu-open") || 
            navigation.isClickScrolling()
        ) return

        const currentScroll = window.scrollY

        if(currentScroll > lastScroll){
            navbar.classList.add("hidden-scroll")
        } else {
            navbar.classList.remove("hidden-scroll")
        }

        lastScroll = currentScroll

        if(navigation.isClickScrolling()) return
    })
}

let lastScroll = 0

export function resetNavbarScroll() {
    lastScroll = window.scrollY
}

window.addEventListener("wheel", () => {
    navigation.unlockNavbar();
})

window.addEventListener("touchstart", () => {
    navigation.unlockNavbar();
})