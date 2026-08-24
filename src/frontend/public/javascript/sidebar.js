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
        document.documentElement.classList.remove('sidebar-precollapsed');
        body.classList.toggle('sidebar-collapsed', collapsed);
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

    toggle.addEventListener('click', () => {
        if (mobileQuery.matches) {
            body.classList.toggle('sidebar-open');
            const isOpen = body.classList.contains('sidebar-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
            toggle.setAttribute('title', isOpen ? 'Fechar menu' : 'Abrir menu');
            return;
        }

        setCollapsed(!body.classList.contains('sidebar-collapsed'));
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
            body.classList.remove('sidebar-collapsed');
        } else {
            closeMobileMenu();
            setCollapsed(localStorage.getItem(storageKey) === 'true');
        }
    });
})();
