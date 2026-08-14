export function initNavigation() {
    let isClickScrolling = false
    let isActiveDelay = false
    let lockNavbar = false

    const duration = 200
    const activeDelay = 1500

    let activeTimeout = null
    let animationId = null

    /*
     * Identifica la navegación actual.
     *
     * Si el usuario hace otro click mientras
     * existe una navegación anterior, la
     * navegación anterior queda invalidada.
     */
    let navigationId = 0

    const links = document.querySelectorAll(
        ".sidebar a"
    )

    const sections = document.querySelectorAll(
        ".index__portafolio-section"
    )

    function clearActiveLinks() {
        links.forEach(link => {
            link.classList.remove("active")
        })
    }

    function cancelActiveDelay() {

        if (activeTimeout !== null) {
            clearTimeout(activeTimeout)
            activeTimeout = null
        }

        isActiveDelay = false
    }

    function cancelAnimation() {

        if (animationId !== null) {
            cancelAnimationFrame(animationId)
            animationId = null
        }
    }

    function cancelCurrentNavigation() {

        /*
         * Invalida callbacks de navegaciones
         * anteriores.
         */
        navigationId++

        cancelAnimation()
        cancelActiveDelay()

        isClickScrolling = false
    }

    function getCurrentSection() {

        const navbar =
            document.getElementById("navbar")

        const offset = navbar
            ? navbar.getBoundingClientRect().height + 40
            : 80

        let currentSection = null

        sections.forEach(section => {

            const sectionTop =
                section.getBoundingClientRect().top +
                window.scrollY

            if (
                window.scrollY + offset >=
                sectionTop
            ) {
                currentSection = section
            }
        })

        return currentSection
    }

    function updateActiveSection() {

        /*
         * SOLO durante la animación automática
         * se permite que el ScrollSpy modifique
         * el sidebar.
         */
        if (!isClickScrolling) return

        const currentSection =
            getCurrentSection()

        if (!currentSection) return

        const id = currentSection.id

        links.forEach(link => {

            link.classList.toggle(
                "active",
                link.getAttribute("href") ===
                `#${id}`
            )
        })
    }

    function smoothScrollTo(
        targetY,
        duration,
        navigationToken,
        onComplete
    ) {
        cancelAnimation()

        const startY = window.scrollY
        const distance = targetY - startY

        let startTime = null

        function animation(currentTime) {

            /*
             * Si comenzó otra navegación,
             * esta animación deja de ejecutarse.
             */
            if (
                navigationToken !==
                navigationId
            ) {
                return
            }

            if (!startTime) {
                startTime = currentTime
            }

            const elapsed =
                currentTime - startTime

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                )

            /*
             * Easing
             */
            const ease =
                1 -
                Math.pow(
                    1 - progress,
                    3
                )

            const currentY =
                startY +
                distance * ease

            /*
             * Movemos la ventana.
             */
            window.scrollTo(
                0,
                currentY
            )

            /*
             * MUY IMPORTANTE:
             *
             * Después de mover el scroll,
             * comprobamos inmediatamente qué
             * sección está atravesando el
             * punto de referencia.
             */
            updateActiveSection()

            if (progress < 1) {

                animationId =
                    requestAnimationFrame(
                        animation
                    )

                return
            }

            animationId = null

            onComplete?.()
        }

        animationId =
            requestAnimationFrame(
                animation
            )
    }

    function handleManualScroll() {

        /*
         * Si el usuario interrumpe la navegación
         * automática, cancelamos TODO.
         */
        if (isClickScrolling) {

            cancelCurrentNavigation()
            clearActiveLinks()

            return
        }

        /*
         * Si el usuario interrumpe durante los
         * 2 segundos posteriores a la navegación,
         * también cancelamos el active.
         */
        if (isActiveDelay) {

            cancelActiveDelay()
            clearActiveLinks()

            return
        }
    }

    /*
     * ------------------------------------------------
     * SCROLL
     * ------------------------------------------------
     *
     * Este listener permanece para mantener
     * sincronización con cambios de scroll.
     *
     * Durante la navegación, updateActiveSection()
     * actualizará el sidebar.
     *
     * Durante scroll manual no hará nada porque
     * isClickScrolling será false.
     */
    window.addEventListener(
        "scroll",
        updateActiveSection
    )

    /*
     * Scroll mediante wheel / trackpad.
     */
    window.addEventListener(
        "wheel",
        handleManualScroll,
        { passive: true }
    )

    /*
     * Scroll mediante touch.
     */
    window.addEventListener(
        "touchstart",
        handleManualScroll,
        { passive: true }
    )

    /*
     * Scroll mediante teclado.
     */
    window.addEventListener(
        "keydown",
        event => {

            const scrollKeys = [
                "ArrowUp",
                "ArrowDown",
                "PageUp",
                "PageDown",
                "Home",
                "End",
                " "
            ]

            if (
                scrollKeys.includes(
                    event.key
                )
            ) {
                handleManualScroll()
            }
        }
    )

    /*
     * ------------------------------------------------
     * SIDEBAR
     * ------------------------------------------------
     */
    links.forEach(link => {

        link.addEventListener(
            "click",
            function (e) {

                e.preventDefault()

                const href =
                    this.getAttribute("href")

                /*
                 * ----------------------------------------
                 * LOGO
                 * ----------------------------------------
                 */
                if (href === "#") {

                    cancelCurrentNavigation()
                    clearActiveLinks()

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })

                    return
                }

                const target =
                    document.querySelector(
                        href
                    )

                if (!target) return

                /*
                 * ----------------------------------------
                 * NUEVA NAVEGACIÓN
                 * ----------------------------------------
                 *
                 * Esto ocurre tanto si:
                 *
                 * - no hay navegación activa
                 * - estamos navegando
                 * - estamos en los 2 segundos de delay
                 *
                 * En todos los casos se cancela
                 * el ciclo anterior y empieza uno nuevo.
                 */
                cancelCurrentNavigation()

                /*
                 * Nuevo identificador de navegación.
                 */
                const currentNavigationId =
                    navigationId

                /*
                 * Nueva navegación.
                 */
                isClickScrolling = true
                isActiveDelay = false
                lockNavbar = true

                /*
                 * Elimina cualquier active anterior.
                 */
                clearActiveLinks()

                /*
                 * Marca inmediatamente la opción
                 * que acaba de seleccionar el usuario.
                 *
                 * Después, en el siguiente frame,
                 * updateActiveSection() comenzará
                 * a representar la sección que
                 * realmente está atravesando.
                 */
                this.classList.add("active")

                document.body.classList.remove(
                    "menu-open"
                )

                requestAnimationFrame(() => {

                    /*
                     * La navegación pudo haber sido
                     * reemplazada por otro click.
                     */
                    if (
                        currentNavigationId !==
                        navigationId
                    ) {
                        return
                    }

                    const navbar =
                        document.getElementById(
                            "navbar"
                        )

                    const offset =
                        navbar
                            ? navbar
                                .getBoundingClientRect()
                                .height + 30
                            : 30

                    const targetY =
                        target
                            .getBoundingClientRect()
                            .top +
                        window.scrollY -
                        offset

                    smoothScrollTo(
                        targetY,
                        duration,
                        currentNavigationId,
                        () => {

                            /*
                             * La animación terminó.
                             */
                            if (
                                currentNavigationId !==
                                navigationId
                            ) {
                                return
                            }

                            /*
                             * Dejamos de actualizar
                             * el active mediante
                             * ScrollSpy.
                             */
                            isClickScrolling = false

                            /*
                             * Garantizamos que la
                             * opción DESTINO sea
                             * la activa.
                             *
                             * Esto es importante
                             * porque puede haber una
                             * diferencia de algunos
                             * píxeles entre el cálculo
                             * del ScrollSpy y el
                             * targetY.
                             */
                            clearActiveLinks()

                            this.classList.add(
                                "active"
                            )

                            /*
                             * Comienza el período
                             * de permanencia de 2 s.
                             */
                            isActiveDelay = true

                            activeTimeout =
                                setTimeout(() => {

                                    /*
                                     * Verificamos que
                                     * siga siendo la
                                     * misma navegación.
                                     */
                                    if (
                                        currentNavigationId !==
                                        navigationId
                                    ) {
                                        return
                                    }

                                    clearActiveLinks()

                                    isActiveDelay =
                                        false

                                    activeTimeout =
                                        null

                                }, activeDelay)
                        }
                    )
                })
            }
        )
    })

    return {
        isClickScrolling: () =>
            isClickScrolling,

        isNavbarLocked: () =>
            lockNavbar,

        unlockNavbar: () => {
            lockNavbar = false
        }
    }
}