document.addEventListener('DOMContentLoaded', function() {
    const radialMenuToggle = document.getElementById('radial-menu-toggle');
    const radialMenuContainer = document.getElementById('radial-menu-container');

    radialMenuToggle.addEventListener('click', function() {
      radialMenuContainer.classList.toggle('open');
    });
  });