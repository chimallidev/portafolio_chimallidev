import {Slider} from './slider.js'

const sliderE1 = document.getElementById('slider')
const slidesE1 = document.getElementById('slides')
const dotsE1 = document.getElementById('dots')
const prev = document.getElementById('prev')
const next = document.getElementById('next')

const slider = new Slider({
  slidesE1: slidesE1,
  dotsE1: dotsE1,
  duration: 3000
});

//Flechas
prev.addEventListener('click', ()=> slider.prev())
next.addEventListener('click', ()=> slider.next())

//Hover pause
sliderE1.addEventListener('mouseenter', ()=> slider.stop())
sliderE1.addEventListener('mouseleave', ()=> slider.start())

//Swipe
let startX = 0
slidesE1.addEventListener('touchstart', e => startX = e.touches[0].clientX)
slidesE1.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX
    if(diff > 50) slider.next()
    if(diff< -50) slider.prev()
})

//Modal
const modal = document.getElementById('modal')
const modalImg = document.getElementById('modalImg')

//Estado del Modal
let scale = 1
let offsetX = 0
let offsetY = 0
let isDragging = false
let modalStartX = 0 
let modalStartY = 0

//Calcular estado inicial (fit al viewport)
function getInitialScale(img){
    const vw = window.innerWidth
    const vh = window.innerHeight

    const imgWidth = img.naturalWidth
    const imgHeight = img.naturalHeight

    const scaleX = vw / imgWidth
    const scaleY = vh / imgHeight

    const fitScale = Math.min(scaleX, scaleY)

    return Math.min(1, fitScale)
}

//Abrir modal
document.querySelectorAll('.slide img').forEach(img => {
    img.addEventListener('click', () => {
        modal.classList.add('active')

        // limpiar estado SIEMPRE
        resetTransform()

        modalImg.src = img.src

        modalImg.onload = () => {
            scale = getInitialScale(modalImg)
            offsetX = 0
            offsetY = 0
            applyTransform()
        }

        // fallback por si ya estaba en caché
        if (modalImg.complete) {
            scale = getInitialScale(modalImg)
            offsetX = 0
            offsetY = 0
            applyTransform()
        }
    })
})

//Cerrar el modal
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active')
    resetTransform()
  }
})

//Cerrar el modal con la tecla ESC
document.addEventListener('keydown', e => {
    if(e.key === 'Escape') {
        modal.classList.remove('active')
        resetTransform()
    }
})

//Reset modal
function resetTransform(){
    scale = 1
    offsetX = 0
    offsetY = 0
    applyTransform()
}

//Aplicar transform
function applyTransform(){
        modalImg.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`
}

//Zoom con rueda
modalImg.addEventListener('wheel', e => {
    e.preventDefault()

    const zoomSpeed = 0.001
    scale += e.deltaY * -zoomSpeed

    const initialScale = getInitialScale(modalImg)
    scale = Math.min(Math.max(initialScale, scale), 5)

    if(scale < initialScale){
        offsetX = 0
        offsetY = 0
    }

    applyTransform()
}, {passive: false})

//Drag
modalImg.addEventListener('pointerdown', e => {
    isDragging = true
    modalImg.style.cursor = 'grabbing'
    modalImg.style.transition = 'none'

    e.preventDefault()

    //captura el puntero, el elemento se queda con los eventos
    modalImg.setPointerCapture(e.pointerId)

    modalStartX = e.clientX - offsetX
    modalStartY = e.clientY - offsetY
})

window.addEventListener("pointermove", e => {
    if(!isDragging) return

    offsetX = e.clientX - modalStartX
    offsetY = e.clientY - modalStartY

    applyTransform()
})

window.addEventListener("pointerup", (e) => {
    isDragging = false
    modalImg.style.cursor = 'grab'
    modalImg.style.transition = 'transform 0.1s ease-out'

    try {
    modalImg.releasePointerCapture(e.pointerId)
    } catch {}
})

//Cuando el navegador cancela el drag por algun evento adicional (notificaciones, etc)
modalImg.addEventListener('pointercancel', ()=>{
    isDragging = false
    modalImg.style.cursor = 'grab'
    modalImg.style.transition = 'transform 0.1s ease-out'
})

//Doble click -> Zoom rápido
modalImg.addEventListener('dblclick', (e) => {
    const rect = modalImg.getBoundingClientRect()

    //posición del clic dentro de la imagen 
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top

    const prevScale = scale
    const initialScale = getInitialScale(modalImg)

    //Alternar zoom
    scale = scale === initialScale? initialScale * 2.5 : initialScale;

    const scaleFactor = scale / prevScale

    //Ajustar offsets para hacer zoom hacia el punto clickeado
    offsetX = offsetX - (clickX - rect.width / 2) * (scaleFactor - 1)
    offsetY = offsetY - (clickY - rect.height / 2) * (scaleFactor - 1)

    //Si volvemos al inicial -> centrar
    if(scale === initialScale){
        offsetX = 0
        offsetY = 0
    }
    applyTransform() 
})

modalImg.addEventListener('dragstart', (e) => {
  e.preventDefault();
})

//Modal del video

const videoTrigger = document.getElementById('videoTrigger')
const videoModal = document.getElementById('videoModal')
const modalVideo = document.getElementById('modalVideo')

// Abrir modal
const videoId = "dx5On4Y54mA"

videoTrigger.addEventListener('click', () => {
    videoModal.classList.add('active')

    modalVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`
})

// Cerrar modal (click fuera)
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.classList.remove('active')

        //esto detiene el video
        modalVideo.src = ""
    }
})

// ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        videoModal.classList.remove('active')
        modalVideo.src = ""
    }
})