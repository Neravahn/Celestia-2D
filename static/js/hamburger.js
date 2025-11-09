window.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const element_panel = document.getElementById('element_panel');

    hamburger.addEventListener('click', () => {
        element_panel.classList.toggle('hidden')
    });
});