export class Slider {
    constructor({slidesE1, dotsE1, duration = 3000}) {
        this.slidesE1 = slidesE1
        this.dotsE1 = dotsE1
        this.index = 0

        this.duration = duration
        this.startTime = null
        this.raf = null

        this.total = slidesE1.children.length;

        this.createDots()
        this.update()
        this.start()
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
        this.slidesE1.style.transform = `translateX(-${this.index * 100}%)`;

        [...this.dotsE1.children].forEach((dot, i) => {
            dot.classList.toggle('active', i === this.index)
        })
    }

    goTo(i){
        this.index = i
        this.resetTimer()
        this.update()

        //Forzar sincronización inmediata
        this.loop(performance.now())
    }

    next(){
        this.index = (this.index + 1)% this.total
        this.resetTimer()
        this.update()

        //Forzar sincronización inmediata
        this.loop(performance.now())
    }

    prev(){
        this.index = (this.index -1 + this.total)% this.total
        this.resetTimer()
        this.update()

        //Forzar sincronización inmediata
        this.loop(performance.now())
    }

    start() {
        this.startTime = null
        this.raf = requestAnimationFrame(this.loop);
    }

    resetTimer() {
        this.startTime = null;

        // limpiar progreso inmediatamente
        [...this.dotsE1.children].forEach(dot => {
        dot.style.background = '';
        });
    }

    stop() {
        cancelAnimationFrame(this.raf)
    }

    loop = (time) =>{
        //1. Inicializar startTime en el frame correcto
        if(this.startTime === null){
            this.startTime = time
        }

        //2. Calcular tiempo transcurrido
        const elapsed = time - this.startTime

        //3. Normalizar progreso (0 -> 1)
        const progress = Math.min(elapsed / this.duration, 1);

        //4. LIMPIAR TODOS LOS DOTS
        [...this.dotsE1.children].forEach(dot => {
            dot.style.background = ''; // reset visual
        })

        //5. Actualizar progreso visual del dot activo
        const activeDot = this.dotsE1.children[this.index]
        if(activeDot){
            activeDot.style.background = `linear-gradient(to right, var(--third-color) ${progress * 100}%, var(--main-color) ${progress * 100}%)`
        }

        //6. Cambio automático de slide
        if(elapsed >= this.duration){
            this.index = (this.index + 1)% this.total

            //reinicio sincronizado con el mismo frame
            this.startTime = time

            this.update()
        }

        //7. Siguiente frame
        this.raf = requestAnimationFrame(this.loop)
    }
}