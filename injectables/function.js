document.addEventListener('click', (event) => {
  console.log(event)
  // Create animation element
  const animationElement = document.createElement('div');
  animationElement.className = 'click-animation';

  // Set initial position based on click coordinates
  const clickX = event.clientX;
  const clickY = event.clientY;
  animationElement.style.top = clickY + 'px';
  animationElement.style.left = clickX + 'px';
  animationElement.style.width = 0 + 'px'
  animationElement.style.height = 0 + 'px'
  animationElement.style.opacity = 1;
  animationElement.style.zIndex = 9999999

  // Append animation element to the body
  document.body.appendChild(animationElement);
  setTimeout(() => {
    // Start the animation
    animationElement.style.opacity = 0;
    animationElement.style.width = '50px';
    animationElement.style.height = '50px';
    animationElement.style.top = clickY - 25 + 'px';
  	animationElement.style.left = clickX -25 + 'px';
	}, 1);
  
  setTimeout(() => {
    const animationElement = document.getElementByClassName('click-animation');
    if (animationElement) {
      animationElement.remove();
    }
	}, 2000);
});
