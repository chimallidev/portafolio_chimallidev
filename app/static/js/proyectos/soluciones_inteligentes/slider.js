export class Slider {
    constructor({slidesE1, dotsE1, duration = 3000}) {
        this.slidesE1 = slidesE1
        this.dotsE1 = dotsE1
        this.index = 0

        this.duration = duration
        this.startTime = null
        this.raf = null

        this.createDots()
        this.update()
        this.startTime()
    }

    createDots(){
        for(let i = 0; i < this.total; i++){
            const dot = document.createElement('div')
            dot.classList.add('dot')
            dot.addEventListener('click', () => {
                this.goTo(i)
            })
            this.dotsE1.appendChild(dot)
        }
    }

    update() {
        this.slidesE1.style.transform = 'translateX(-${this.index * 100}%)'

        [...this.dotsE1.children].forEach((dot, i) => {
            dot.classList.toggle('active', i === this.index)
        })
    }

    goTo(i){
        this.index = i
        this.resetTimer()
        this.update()
    }

    next(){
        this.index = (this.index + 1)% this.total
        this.resetTimer()
        this.update()
    }

    prev(){
        this.index = (this.index -1 + this.total)% this.total
        this.resetTimer()
        this.update()
    }

    start() {
        this.startTime = null
        this.loop()
    }

    resetTimer() {
        this.startTime = null;
    }

    loop(){
        //1. Inicializar startTime en el frame correcto
        if(this.startTime === null){
            this.startTime = time
        }

        //2. Calcular tiempo transcurrido
        const elapsed = time - this.startTime

        //3. Normalizar progreso (0 -> 1)
        const progress = Math.min(elapsed / this.duration, 1)

        //4. Actualizar progreso visual del dot activo
        const activeDot = this.dotsE1.children[this.index]
        if(activeDot){
            activeDot.style.background = 'linear-gradient(to right, var(--third-color) ${progress * 100}%, var(--main-color) ${progress * 100}%)'
        }

        //5. Cambio automático de slide
        if(elapsed >= this.duration){
            this.index = (this.index + 1)% this.total

            //reinicio sincronizado con el mismo frame
            this.startTime = time

            this.update()
        }

        //6. Siguiente frame
        this.raf = requestAnimationFrame(this.loop)
    }
}