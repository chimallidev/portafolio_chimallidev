export function initNavigation() {
    let isClickScrolling = false
    let lockNavbar = false
    let duration = 150

    function smoothScrollTo(targetY, duration = duration) {
        const startY = window.scrollY
        const distance = targetY - startY
        let startTime = null

        function animation(currentTime) {
            if (!startTime) startTime = currentTime
            const time = currentTime - startTime

            const progress = Math.min(time / duration, 1)

            // easing (suave tipo app)
            const ease = 1 - Math.pow(1 - progress, 3)

            window.scrollTo(0, startY + distance * ease)

            if (time < duration) {
                requestAnimationFrame(animation)
            }
        }

        requestAnimationFrame(animation)
    }

    const links = document.querySelectorAll(".sidebar a")
    const sections = document.querySelectorAll(
        ".index__portafolio-section"
    )

    function updateActiveSection() {

        if (isClickScrolling) return

        const navbar = document.getElementById("navbar")

        const offset = navbar
            ? navbar.getBoundingClientRect().height + 30
            : 80

        let currentSection = null

        sections.forEach(section => {

            const sectionTop =
                section.getBoundingClientRect().top +
                window.scrollY

            if (window.scrollY + offset >= sectionTop) {
                currentSection = section
            }
        })

        if (!currentSection) return

        const id = currentSection.id

        links.forEach(link => {

            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${id}`
            )
        })
    }

    window.addEventListener(
        "scroll",
        updateActiveSection
    )

    links.forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault()

            const href = this.getAttribute("href")

            if (href === "#") {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })

                return
            }

            const target = document.querySelector(
                this.getAttribute("href")
            )

            if (!target) return

            isClickScrolling = true
            lockNavbar = true

            links.forEach(l =>
                l.classList.remove("active")
            )

            this.classList.add("active")

            document.body.classList.remove(
                "menu-open"
            )

            requestAnimationFrame(() => {

                const navbar =
                    document.getElementById("navbar")

                const offset =
                    navbar.getBoundingClientRect().height + 30

                const targetY =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    offset

                smoothScrollTo(
                    targetY,
                    duration
                )
            })

            setTimeout(() => {

                isClickScrolling = false

                updateActiveSection()

            }, duration)
        })
    })

    return {
        isClickScrolling: () =>
            isClickScrolling,

        isNavbarLocked: () =>
            lockNavbar,

        unlockNavbar: () => {
            lockNavbar = false
        }
    }
}