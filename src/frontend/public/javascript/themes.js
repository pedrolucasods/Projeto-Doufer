(() => {
    const modal = document.getElementById('theme-modal');
    const openButton = document.getElementById('theme-button');
    const closeButton = document.getElementById('theme-modal-close');
    const options = document.querySelectorAll('[data-theme-choice]');
    const themeKey = 'doufer-theme';
    const validThemes = ['azul', 'escuro', 'claro', 'verde', 'rosa', 'vermelho', 'ciano'];

    if (!modal || !openButton || !closeButton) {
        return;
    }

    const applyTheme = (theme) => {
        const selectedTheme = validThemes.includes(theme) ? theme : 'azul';
        document.documentElement.dataset.theme = selectedTheme;
        localStorage.setItem(themeKey, selectedTheme);

        options.forEach((option) => {
            const isSelected = option.dataset.themeChoice === selectedTheme;
            option.classList.toggle('is-selected', isSelected);
            option.setAttribute('aria-pressed', String(isSelected));
        });
    };

    const closeModal = () => {
        modal.hidden = true;
        openButton.focus();
    };

    openButton.addEventListener('click', () => {
        modal.hidden = false;
        options[0]?.focus();
    });

    closeButton.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.hidden) {
            closeModal();
        }
    });

    options.forEach((option) => {
        option.addEventListener('click', () => {
            applyTheme(option.dataset.themeChoice);
            closeModal();
        });
    });

    applyTheme(localStorage.getItem(themeKey) || 'azul');
})();
