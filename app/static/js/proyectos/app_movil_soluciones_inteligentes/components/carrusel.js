class Carrusel{
    constructor(root){
        this.root = root

        this.name = root.dataset.carrusel || "default"

        this.track = root.querySelector(".carrusel__track")
        this.slides = Array.from(root.querySelectorAll(".carrusel__slide"))

        this.btnPrev = root.querySelector(".carrusel__btn--left")
        this.btnNext = root.querySelector(".carrusel__btn--right")

        this.index = 0

        this.startX = 0
        this.currentX = 0
        this.isDragging = false
        this.hasDragged = false

        this.init()
    }

    init(){
        this.update()

        this.btnPrev.addEventListener("click", ()=> this.move(-1))
        this.btnNext.addEventListener("click", ()=> this.move(1))

        this.track.addEventListener("touchstart", (e)=> this.onStart(e.touches[0].clientX))
        this.track.addEventListener("touchmove", (e)=> this.onMove(e.touches[0].clientX))
        this.track.addEventListener("touchend", ()=> this.onEnd())

        this.track.addEventListener("mousedown", (e)=> this.onStart(e.clientX))
        window.addEventListener("mousemove", (e)=> this.onMove(e.clientX))
        window.addEventListener("mouseup", ()=> this.onEnd())

        this.track.addEventListener("click", (e) => {
            if(this.hasDragged){
                e.preventDefault()
                e.stopPropagation()
            }
        }, true)
    }

    getSlideWidth(){
        const style = window.getComputedStyle(this.track)
        const gap = parseInt(style.gap || 0)
        return this.slides[0].offsetWidth + gap
    }

    getVisiblesSlides(){
        const slideWidth = this.slides[0].offsetWidth
        const viewportWidth = this.root.querySelector(".carrusel__viewport").offsetWidth

        return Math.round(viewportWidth / slideWidth)
    }

    move(direction){
        const visible = this.getVisiblesSlides()
        const maxIndex = this.slides.length - visible
        this.index = Math.max(0, Math.min(this.index + direction, maxIndex))
        this.update()
    }

    update(offset = 0){
        const translate = -(this.index * this.getSlideWidth()) + offset
        this.track.style.transform = `translateX(${translate}px)`
    }

    onStart(x){
        this.isDragging = true
        this.startX = x
        this.currentX = x
        this.root.classList.add("carrusel--dragging")

        document.body.style.userSelect = "none";
    }

    onMove(x){
        if(!this.isDragging) return

        this.currentX = x
        const delta = this.currentX - this.startX

        // Movimiento real
        if(Math.abs(delta) > 5){
            this.hasDragged = true
        }

        this.update(delta)
    }

    onEnd(){
        if(!this.isDragging) return

        const delta = this.currentX - this.startX

        if(Math.abs(delta) > 50){
            this.move(delta < 0 ? 1 : -1)
        } else {
            this.update()
        }

        this.isDragging = false
        this.root.classList.remove("carrusel--dragging");
        document.body.style.userSelect = "";

        requestAnimationFrame(() => {
            this.hasDragged = false
        })
    }
}

export function initCarruseles(){
    const carruseles = document.querySelectorAll("[data-carrusel]")
    carruseles.forEach(element => {
        new Carrusel(element)
    })
}