window.onmousemove = e => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

  const dot = document.createElement('div');
  dot.className = "dot";
  dot.style.left = `${mouseX}px`;
  dot.style.top = `${mouseY}px`;
  document.body.appendChild(dot);
}
