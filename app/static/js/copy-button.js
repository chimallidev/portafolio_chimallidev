function copyToClipboard(text) {
    if (
        navigator.clipboard &&
        window.isSecureContext
    ) {
        return navigator.clipboard.writeText(text);
    }

    return new Promise((resolve, reject) => {
        const textArea = document.createElement("textarea");

        textArea.value = text;
        textArea.setAttribute("readonly", "");

        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "-9999px";

        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        // Compatibilidad adicional con Safari iOS
        textArea.setSelectionRange(
            0,
            textArea.value.length
        );

        try {
            const successful =
                document.execCommand("copy");

            document.body.removeChild(textArea);

            if (successful) {
                resolve();
            } else {
                reject(
                    new Error(
                        "No fue posible copiar el texto."
                    )
                );
            }
        } catch (error) {
            document.body.removeChild(textArea);
            reject(error);
        }
    });
}

export function initCopyButtons() {
    const buttons = document.querySelectorAll(
        '[data-id="copy-button"]'
    );

    buttons.forEach((button) => {
        button.addEventListener("click", async (event) => {
            event.preventDefault();

            // Ignorar clics mientras está bloqueado
            if (
                button.dataset.copyLocked ===
                "true"
            ) {
                return;
            }

            const textToCopy =
                button.dataset.copy;

            if (!textToCopy) {
                return;
            }

            const title = button.querySelector(
                ".chimalli-button__title"
            );

            const description =
                button.querySelector(
                    ".chimalli-button__description"
                );

            const iconUse =
                button.querySelector(
                    ".chimalli-button__icon use"
                );

            const originalTitle =
                title?.textContent ?? "";

            const originalDescription =
                description?.textContent ?? "";

            const originalIconHref =
                iconUse?.getAttribute("href") ??
                "";

            try {
                // Bloquear interacción
                button.dataset.copyLocked =
                    "true";

                button.classList.add(
                    "chimalli-button--locked"
                );

                await copyToClipboard(
                    textToCopy
                );

                if (title) {
                    title.textContent =
                        "COPIADO";
                }

                if (description) {
                    description.textContent =
                        "El correo esta en tu portapapeles ahora.";
                }

                if (iconUse) {
                    iconUse.setAttribute(
                        "href",
                        "#icon-clipboard-check"
                    );
                }

                setTimeout(() => {
                    if (title) {
                        title.textContent =
                            originalTitle;
                    }

                    if (description) {
                        description.textContent =
                            originalDescription;
                    }

                    if (iconUse) {
                        iconUse.setAttribute(
                            "href",
                            originalIconHref
                        );
                    }

                    delete button.dataset
                        .copyLocked;

                    button.classList.remove(
                        "chimalli-button--locked"
                    );
                }, 1500);

            } catch (error) {
                delete button.dataset
                    .copyLocked;

                button.classList.remove(
                    "chimalli-button--locked"
                );

                console.error(
                    "Error al copiar al portapapeles:",
                    error
                );
            }
        });
    });
}