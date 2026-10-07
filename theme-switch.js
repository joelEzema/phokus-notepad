document.addEventListener('DOMContentLoaded', () => {
    const themeradios = document.querySelectorAll('input[name="theme-choice"]');
    const htmlElement = document.documentElement;

    const currentTheme = htmlElement.getAttribute('data-theme') || 'default';
    const activeRadio = document.querySelector(`input[name="theme-choice"][value="${currentTheme}"]`);
    if (activeRadio) {
        activeRadio.checked = true;
    }

    themeradios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            if (event.target.checked) {
                const selectedTheme = event.target.value;
                htmlElement.setAttribute('data-theme', selectedTheme);
                localStorage.setItem('user-theme', selectedTheme);
            }
        });
    })
})