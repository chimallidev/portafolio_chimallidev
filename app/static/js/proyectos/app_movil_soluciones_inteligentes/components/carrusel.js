class Carrusel{
    constructor(root){
        this.root = root

        this.name = root.dataset.carrusel || "default"

        this.track = root.querySelector(".carrusel__track")
        this.slides = Array.from(root.querySelectorAll(".carrusel__slide"))

        this.btnPrev = root.querySelector(".carrusel__btn--right")
        this.btnNext = root.querySelector(".carrusel__btn--righ")

        this.index = 0

        this.startX = 0
        this.currentX = 0
        this.isDragging = false

        this.init()
    }

    init(){
        this.update()

        this.btnPrev.addEventListener("click", ()=> this.move(-1))
        this.btnNext.addEventListener("click", ()=> this.move(1))

        this.track.addEventListener("touchstart", (e)=> this.onStart(e.touches[0].clientX))
        this.track.addEventListener("touchmove", (e)=> this.onMove(e.toouches[0].clientX))
        this.track.addEventListener("touchend", ()=> this.onEnd())

        this.track.addEventListener("mousedown", (e)=> this.onStart(e.clientX))
        window.addEventListener("mousemove", (e)=> this.onMove(e.clientX))
        window.addEventListener("mouseup", ()=> this.onEnd())
    }

    getSlideWidth(){
        const gap = 16
        return this.slides[0].offsetWidth + gap
    }

    move(direction){
        const maxIndex = this.slides.length - 1
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
        this.root.classList.add("carrusel--dragging")

        document.body.style.userSelect = "none";
    }

    onMove(x){
        if(!this.isDragging) return

        this.currentX = x
        const delta = this.currentX - this.startX
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
        this.root.classList.remove("carousel--dragging");
        document.body.style.userSelect = "";
    }
}

export function initCarrusel(){
    const carruseles = document.querySelectorAll("[data-carrusel]")

    carruseles.forEach(element => {
        new Carrusel(element)
    })
}