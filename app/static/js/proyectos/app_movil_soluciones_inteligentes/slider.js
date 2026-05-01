export default class VarticalSlider {
    constructor(element){
        this.e1 = element
        this.track = element.querySelector('.slider-vertical__track')
        this.items = Array.from(element.querySelectorAll('.slider-vertical__item'))
        this.btnUp = element.querySelector('.slider-vertical__btn--up')
        this.btnDown = element.querySelector('.slider-vertical__btn--down')
        this.currentNumber = element.querySelector('.slider-vertical__current-number')

        this.config = {
            loop: element.dataset.loop === "true",
            speed: parseInt(element.dataset.speed) || 500,
            autoplay: element.dataset.autoplay === "true",
            delay: parseInt(element.dataset.delay) || 3000
        }

        this.total = this.items.length
        this.index = this.config.loop ? 1 : 0
        this.timer = null

        this.init()
    }

    init(){
        this.setSpeed()
        
        if(this.config.loop){
            this.cloneItems()
        }

        this.updateCSS(false)
        this.bindEvents()

        if(this.config.autoplay){
            this.startAutoplay()
        }
    }

    setSpeed(){
        this.track.style.setProperty('--speed', `${this.config.speed}ms`)
    }

    cloneItems(){
        const first = this.items[0].cloneNode(true)
        const last = this.items[this.total - 1].cloneNode(true)

        this.track.appendChild(first)
        this.track.insertBefore(last, this.items[0])
    }

    updateCSS(animate = true){
        if(!animate) this.track.classList.add('is-resetting')

        this.track.style.setProperty('--index', this.index)

        requestAnimationFrame(()=> {
            this.track.classList.remove('is-resetting')
        })
    }

    getRealIndex(){
        if(!this.config.loop) return this.index + 1

        if(this.index === 0) return this.total
        if(this.index === this.total + 1) return 1

        return this.index
    }

    updateCounter(direction){
        this.e1.classList.remove('is-up', 'is-down')
        this.e1.classList.add(direction === 'down' ? 'is-down' : 'is-up')

        setTimeout(()=>{
            this.currentNumber.textContent = this.getRealIndex()
        }, this.config.speed / 2)
    }

    move(direction){
        if(!this.config.loop){
            if(direction === 'down' && this.index >= this.total - 1) return
            if(direction === 'up' && this.index <= 0 ) return
        }

        this.index += direction === 'down' ? 1 : -1
        this.updateCSS(true)
        this.updateCounter(direction)
    }

    handleLoopReset(){
        if(!this.config.loop) return

        if(this.index === this.total + 1){
            this.index = 1
            this.updateCSS(false)
        }

        if(this.index === 0){
            this.index = this.total
            this.updateCSS(false)
        }
    }

    startAutoplay(){
        if (this.timer) clearInterval(this.timer);

        this.timer = setInterval(() => {
            this.move('down');
        }, this.config.delay);
    }

    bindEvents(){
        this.btnDown.addEventListener('click', ()=> this.move('down'))
        this.btnUp.addEventListener('click', ()=> this.move('up'))

        this.track.addEventListener('transitionend', ()=> {
            this.handleLoopReset()
        })

        this.e1.addEventListener('mouseenter', ()=> {
            if(this.timer) clearInterval(this.timer)
        })

        this.e1.addEventListener('mouseleave', ()=> {
            if(this.config.autoplay) this.startAutoplay()
        })
    }
}

export function initSliders(selector = '[data-slider-vertical]') {
    document.querySelectorAll(selector).forEach(el => {
        new VerticalSlider(el)
    })
}