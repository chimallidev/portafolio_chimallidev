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

        this.startY = 0
        this.currentY = 0
        this.isHorizontalDrag = false

        this.init()
    }

    init(){
        this.update()

        this.btnPrev.addEventListener("mousedown", ()=> {
            this.startContinuousMove(-1)
        })
        this.btnNext.addEventListener("mousedown", ()=> {
            this.startContinuousMove(1)
        })

        this.track.addEventListener("touchstart", (e)=> {
            this.onStart(
                e.touches[0].clientX,
                e.touches[0].clientY
            )
        }, { passive: true })
        this.track.addEventListener("touchmove", (e)=> {
            this.onMove(
                e,
                e.touches[0].clientX,
                e.touches[0].clientY
            )
        }, { passive: false })

        this.track.addEventListener("touchend", ()=> this.onEnd())

        this.track.addEventListener("mousedown", (e)=> this.onStart(e.clientX))
        window.addEventListener("mousemove", (e)=> {
            this.onMove(e, e.clientX, 0)
        })
        window.addEventListener("mouseup", ()=> {
            this.onEnd()
            this.stopContinuousMove()
        })

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

    startContinuousMove(direction){
        this.stopContinuousMove()

        this.move(direction)

        this.moveInterval = setInterval(() => {
            this.move(direction)
        }, 250)
    }

    stopContinuousMove(){
        clearInterval(this.moveInterval)
    }

    update(offset = 0){
        const translate = -(this.index * this.getSlideWidth()) + offset
        this.track.style.transform = `translateX(${translate}px)`
    }

    onStart(x, y){
        this.isDragging = true
        this.startX = x
        this.currentX = x
        this.root.classList.add("carrusel--dragging")

        this.startY = y
        this.currentY = y
        this.isHorizontalDrag = false

        document.body.style.userSelect = "none";
    }

    onMove(e, x, y){
        if(!this.isDragging) return

        this.currentX = x
        this.currentY = y

        const delta = this.currentX - this.startX
        const deltaY = this.currentY - this.startY

        // Detectar dirección dominante
        if(!this.isHorizontalDrag){
            if(Math.abs(deltaX) > Math.abs(deltaY)){
                this.isHorizontalDrag = true
            } else {
                return
            }
        }

        // Bloquear scroll vertical del navegador
        e.preventDefault()

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