function copyToClipboard(text) {
    if (
        navigator.clipboard &&
        window.isSecureContext
    ) {
        return navigator.clipboard.writeText(text);
    }

    return new Promise((resolve, reject) => {

        const textArea =
            document.createElement(
                "textarea"
            );

        textArea.value = text;

        textArea.setAttribute(
            "readonly",
            ""
        );

        textArea.style.position =
            "fixed";

        textArea.style.left =
            "-9999px";

        textArea.style.top =
            "-9999px";

        document.body.appendChild(
            textArea
        );

        textArea.focus();
        textArea.select();

        textArea.setSelectionRange(
            0,
            textArea.value.length
        );

        try {

            const successful =
                document.execCommand(
                    "copy"
                );

            document.body.removeChild(
                textArea
            );

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

            document.body.removeChild(
                textArea
            );

            reject(error);
        }
    });
}

export function initCopyButtons() {

    const buttons =
        document.querySelectorAll(
            '[data-id="copy-button"]'
        );

    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            async (event) => {

                event.preventDefault();

                if (
                    button.dataset
                        .copyLocked ===
                    "true"
                ) {
                    return;
                }

                const textToCopy =
                    button.dataset.copy;

                if (!textToCopy) {
                    return;
                }

                const text =
                    button.querySelector(
                        ".chimalli-button__text"
                    );

                const originalText =
                    text?.textContent ??
                    "";

                try {

                    await copyToClipboard(
                        textToCopy
                    );

                    if (text) {

                        text.textContent =
                            "COPIADO";
                    }

                    button.dataset
                        .copyLocked =
                        "true";

                    button.classList.add(
                        "chimalli-button--locked"
                    );

                    button.classList.add(
                        "chimalli-button--waiting"
                    );

                    setTimeout(() => {

                        if (text) {

                            text.textContent =
                                originalText;
                        }

                        delete button.dataset
                            .copyLocked;

                        button.classList.remove(
                            "chimalli-button--locked"
                        );

                        button.classList.remove(
                            "chimalli-button--waiting"
                        );

                    }, 1500);

                } catch (error) {

                    delete button.dataset
                        .copyLocked;

                    button.classList.remove(
                        "chimalli-button--locked"
                    );

                    button.classList.remove(
                        "chimalli-button--waiting"
                    );

                    console.error(
                        "Error al copiar al portapapeles:",
                        error
                    );
                }
            }
        );
    });
}