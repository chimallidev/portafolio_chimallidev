class VideoModal {
    constructor(root) {
        this.root = root
        this.modalVideo = root.querySelector("[data-modal-video]")

        this.init()
    }

    init() {
        this.bindEvents()
    }

    bindEvents() {
        this.abrirModal()
        this.cerrarModal()
        this.escKey()
    }

    abrirModal() {
        document.querySelectorAll(".video__thumb").forEach(thumb => {
            thumb.addEventListener("click", (e) => {
                e.stopPropagation()

                const videoId = thumb.dataset.videoId

                this.root.classList.add("active")
                this.modalVideo.src =
                    `https://www.youtube-nocookie.com/embed/${videoId}` +
                    `?autoplay=1` +
                    `&playsinline=1` +
                    `&rel=0` +
                    `&modestbranding=1` +
                    `&fs=1`;

            })
        })
    }

    cerrarModal() {
        this.root.addEventListener("click", (e) => {
            if (e.target === this.root) {
                this.root.classList.remove("active")

                this.modalVideo.src = ""
            }
        })
    }

    escKey() {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.root.classList.remove("active")
                this.modalVideo.src = ""
            }
        })
    }
}

export function initVideoModals() {
    const videoModals = document.querySelectorAll("[data-video-modal]")

    videoModals.forEach(modal => {
        new VideoModal(modal)
    })
}