(() => {
    const body = document.body;
    const toggle = document.getElementById('sidebar-toggle');
    const backdrop = document.getElementById('sidebar-backdrop');
    const links = document.querySelectorAll('.sidebar-link');
    const mobileQuery = window.matchMedia('(max-width: 767.98px)');
    const storageKey = 'doufer-sidebar-collapsed';

    if (!toggle) {
        return;
    }

    const setCollapsed = (collapsed) => {
        // Toggling the same class on the same element (<html>) that the
        // inline pre-paint script already set makes this a no-op when the
        // state already matches, instead of swapping to a different class
        // on <body> (which was a real DOM mutation that could snap/jump
        // the layout on every page navigation even without an animation).
        document.documentElement.classList.toggle('sidebar-collapsed', collapsed);
        toggle.setAttribute('aria-expanded', String(!collapsed));
        toggle.setAttribute('aria-label', collapsed ? 'Expandir menu' : 'Recolher menu');
        toggle.setAttribute('title', collapsed ? 'Expandir menu' : 'Recolher menu');
        localStorage.setItem(storageKey, String(collapsed));
    };

    const closeMobileMenu = () => {
        body.classList.remove('sidebar-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu');
        toggle.setAttribute('title', 'Abrir menu');
    };

    if (!mobileQuery.matches) {
        setCollapsed(localStorage.getItem(storageKey) === 'true');
    }

    // Enable the sidebar's CSS transitions only after its initial state has
    // been applied, so the load-time sync above never gets animated (which
    // read as the sidebar quickly opening/closing on every page navigation).
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            body.classList.add('sidebar-ready');
        });
    });

    toggle.addEventListener('click', () => {
        if (mobileQuery.matches) {
            body.classList.toggle('sidebar-open');
            const isOpen = body.classList.contains('sidebar-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
            toggle.setAttribute('title', isOpen ? 'Fechar menu' : 'Abrir menu');
            return;
        }

        setCollapsed(!document.documentElement.classList.contains('sidebar-collapsed'));
    });

    backdrop.addEventListener('click', closeMobileMenu);

    links.forEach((link) => {
        if (window.location.pathname.startsWith(link.dataset.route)) {
            link.classList.add('is-active');
            link.setAttribute('aria-current', 'page');
        }

        link.addEventListener('click', closeMobileMenu);
    });

    mobileQuery.addEventListener('change', (event) => {
        if (event.matches) {
            document.documentElement.classList.remove('sidebar-collapsed');
        } else {
            closeMobileMenu();
            setCollapsed(localStorage.getItem(storageKey) === 'true');
        }
    });
})();
