export function initNavigation() {
    let isClickScrolling = false
    let lockNavbar = false

    function smoothScrollTo(targetY, duration = 700) {
        const startY = window.scrollY
        const distance = targetY - startY
        let startTime = null

        function animation(currentTime) {
            if (!startTime) startTime = currentTime
            const time = currentTime - startTime

            const progress = Math.min(time / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3)

            window.scrollTo(0, startY + distance * ease)

            if (time < duration) {
                requestAnimationFrame(animation)
            }
        }
        requestAnimationFrame(animation)
    }

    const links = document.querySelectorAll(".nav_bar__opciones a")

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault()

            const target = document.querySelector(
                this.getAttribute("href")
            )

            isClickScrolling = true
            lockNavbar = true

            document.body.classList.remove("menu-open")

            requestAnimationFrame(() => {
                const navbar = document.getElementById("navbar")
                const offset = navbar.offsetHeight + 20

                const targetY =
                    target.getBoundingClientRect().top +
                    window.scrollY - offset

                smoothScrollTo(targetY, 700)
            })
            setTimeout(() => {
                isClickScrolling = false
            }, 700)
        })
    })
    return {
        isClickScrolling: () => isClickScrolling,
        isNavbarLocked: () => lockNavbar,
        unlockNavbar: () => { lockNavbar = false }
    }
}