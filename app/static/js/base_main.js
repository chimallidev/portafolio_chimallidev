import { initNavbar } from './nav_bar.js';
import { initializeFloatingButton } from "./floating_button.js";

document.addEventListener(
    'DOMContentLoaded',
    () => {
        initNavbar()
        initializeFloatingButton()

    }
);