export function initializeFloatingButton() {

    const button =
        document.getElementById(
            "floating-button"
        );

    if (!button) {
        return;
    }

    const scrollThreshold = 50;

    const activeAnimationDuration =
        300;

    const navigationDelay =
        150;

    const releaseAnimationDuration =
        300;

    let isVisible = true;

    let isAnimating = false;

    let lastScrollY =
        window.scrollY;

    let lastTogglePosition =
        window.scrollY;

    const showButton = () => {

        if (isVisible) {
            return;
        }

        button.classList.remove(
            "floating-button--hidden"
        );

        button.classList.add(
            "floating-button--visible"
        );

        isVisible = true;
    };

    const hideButton = () => {

        if (!isVisible) {
            return;
        }

        button.classList.remove(
            "floating-button--visible"
        );

        button.classList.add(
            "floating-button--hidden"
        );

        isVisible = false;
    };

    const handleScroll = () => {

        const currentScrollY =
            window.scrollY;

        if (currentScrollY <= 0) {

            showButton();

            lastScrollY =
                currentScrollY;

            lastTogglePosition =
                currentScrollY;

            return;
        }

        const distance =
            Math.abs(
                currentScrollY -
                lastTogglePosition
            );

        if (
            distance <
            scrollThreshold
        ) {

            lastScrollY =
                currentScrollY;

            return;
        }

        const scrollingUp =
            currentScrollY <
            lastScrollY;

        if (scrollingUp) {

            showButton();

        } else {

            hideButton();

        }

        lastTogglePosition =
            currentScrollY;

        lastScrollY =
            currentScrollY;
    };

    const navigate = () => {

        const href =
            button.getAttribute(
                "href"
            );

        if (!href) {
            return;
        }

        const target =
            button.getAttribute(
                "target"
            );

        if (target === "_blank") {

            window.open(
                href,
                "_blank",
                "noopener,noreferrer"
            );

            return;
        }

        window.location.assign(
            href
        );
    };

    const finishInteraction =
        () => {

            button.classList.remove(
                "floating-button--releasing"
            );

            isAnimating = false;

            navigate();
        };

    const startReleaseAnimation =
        () => {

            button.classList.remove(
                "floating-button--pressed"
            );

            button.classList.add(
                "floating-button--releasing"
            );

            window.setTimeout(
                finishInteraction,
                releaseAnimationDuration
            );
        };

    const handleClick = (
        event
    ) => {

        event.preventDefault();

        if (isAnimating) {
            return;
        }

        isAnimating = true;

        button.classList.add(
            "floating-button--pressed"
        );

        window.setTimeout(
            () => {

                window.setTimeout(
                    startReleaseAnimation,
                    navigationDelay
                );

            },
            activeAnimationDuration
        );
    };

    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );

    button.addEventListener(
        "click",
        handleClick
    );
}