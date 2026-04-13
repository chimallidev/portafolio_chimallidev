export function initNavigation() {

    function smoothScrollTo(targetY, duration = 600) {
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
    const sections = document.querySelectorAll(".index__portafolio-section")

    let isClickScrolling = false

    const obeserver = new IntersectionObserver((entries)=>{
        if(isClickScrolling) return

        entries.forEach(entry => {
            if(entry.isIntersecting){
                const id = entry.target.id

                links.forEach(link => {
                    link.classList.remove("active")

                    if(link.getAttribute("href") === `#${id}`){
                        link.classList.add("active")
                    }
                })
            }
        })
    },{
        threshold: 0.5,
        rootMargin: "-80px 0px 0px 0px"
    })

    sections.forEach(section => obeserver.observe(section))

    links.forEach(link => {
        link.addEventListener("click", function (e){
            e.preventDefault()

            console.log("scrolling...")

            const href = this.getAttribute("href");

            if (href === "#") {
                window.scrollTo({ top: 0, behavior: "smooth" })
                return
            }

            const target = document.querySelector(
                this.getAttribute("href")
            )

            isClickScrolling = true

            links.forEach(l => l.classList.remove("active"))
            this.classList.add("active")

            document.body.classList.remove("menu-open");

            requestAnimationFrame(() => {

                const navbar = document.getElementById("navbar")

                const offset = navbar.getBoundingClientRect().height + 30

                const targetY =
                target.getBoundingClientRect().top +
                window.scrollY -
                offset

                smoothScrollTo(targetY, 700)
            })

            setTimeout(()=>{
                isClickScrolling = false
            }, 500)
        })
    })
    return {
        isClickScrolling: ()=> isClickScrolling
    }
}