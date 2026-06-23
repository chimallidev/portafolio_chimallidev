export function initNavbar() {

    const navbar = document.querySelector('.chimalli-navbar');

    if (!navbar) {
        return;
    }

    const START_PERCENT = 0.10;
    const END_PERCENT = 0.30;

    function updateNavbar() {

        const maxScroll =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (maxScroll <= 0) {
            return;
        }

        const scrollRatio =
            window.scrollY / maxScroll;

        if (scrollRatio <= START_PERCENT) {

            navbar.style.backgroundColor =
                'var(--main-color)';

            navbar.style.backdropFilter =
                'blur(0px)';

            navbar.style.webkitBackdropFilter =
                'blur(0px)';

            navbar.style.borderBottom =
                'none';

            return;
        }

        if (scrollRatio >= END_PERCENT) {

            navbar.style.backgroundColor =
                'oklch(0.6179 0.1046 199.77 / 50%)';

            navbar.style.backdropFilter =
                'blur(10px)';

            navbar.style.webkitBackdropFilter =
                'blur(10px)';

            navbar.style.borderBottom =
                '1px solid rgba(255,255,255,0.15)';

            return;
        }

        const progress =
            (scrollRatio - START_PERCENT) /
            (END_PERCENT - START_PERCENT);

        const alpha =
            1 - (progress * 0.5);

        navbar.style.backgroundColor =
            `oklch(0.6179 0.1046 199.77 / ${alpha})`;

        navbar.style.backdropFilter =
            `blur(${10 * progress}px)`;

        navbar.style.webkitBackdropFilter =
            `blur(${10 * progress}px)`;

        navbar.style.borderBottom =
            `1px solid rgba(255,255,255,${0.15 * progress})`;
    }

    updateNavbar();

    window.addEventListener(
        'scroll',
        updateNavbar,
        { passive: true }
    );
}