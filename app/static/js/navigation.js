export function initNavigation() {
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

            const target = document.querySelector(
                this.getAttribute("href")
            )

            isClickScrolling = true

            links.forEach(l => l.classList.remove("active"))
            this.classList.add("active")

            target.scrollIntoView({behavior: "smooth"})

            setTimeout(()=>{
                isClickScrolling = false
            }, 500)
        })
    })
    return {
        isClickScrolling: ()=> isClickScrolling
    }
}