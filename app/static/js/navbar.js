export function initNavbar(navigation){
    const navbar = document.getElementById("navbar")

    let lastScroll = 0

    window.addEventListener("scroll", ()=> {
        const currentScroll = window.scrollY

        if(currentScroll > lastScroll){
            navbar.classList.add("hidden")
        } else {
            navbar.classList.remove("hidden")
        }

        lastScroll = currentScroll

        if(navigation.isClickScrolling()) return
    })
}