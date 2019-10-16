const container = document.getElementById('container');
const resetButton = document.getElementById('resetButton');
const resizeButton = document.getElementById('resizeButton');
const gradientButton = document.getElementById('gradientButton');
const randomColorButton = document.getElementById('randomColorButton');

function createGrid(size) {
  for (let i = 0; i < (size**2); i++) {
    let div = document.createElement('div');
    div.classList.add('pixel');                               // Give every little div the class .pixel
    div.addEventListener('mouseover', vanish);               // attach the default EventListener
    container.appendChild(div);                               // Append Elements to container
  }

  let gridRule = `
  #container {
    display: grid;
    grid-template-columns: repeat(${size}, 1fr);
  }`;   // Defines a CSS rule for the container which gets applied via JS.

  let pixelSize = (560/size)-(2*pixelBorderWidth);      // 560 is the total width of container in this case

  let pixelRule = `
  .pixel {
    border: ${pixelBorderWidth}px solid seagreen;
    border-radius: 5px;
    height: ${pixelSize}px;
    width: ${pixelSize}px;
    background-color: #26173f;
  }`;   // Analogous to before this is the CSS rule for the individual pixels, to be able to modifiy sizes from the script.

  let style = document.createElement('style');      // Add CSS rules
  document.head.appendChild(style);
  style.sheet.insertRule(gridRule);
  style.sheet.insertRule(pixelRule);

}

function vanish(e) {
  if (e.ctrlKey) {
    return
  } else {
    e.target.style.transition = 'all 0.7s ease-out';        // Constant Fade-out effect
    e.target.style.backgroundColor = 'transparent';
    e.target.style.borderColor = 'transparent';
  }
}

function resetGrid() {
  const pixels = document.querySelectorAll('.pixel');

  pixels.forEach((node) => {
    node.style.transition = `${Math.random() * 2}s`;        // To make the pixels reappear randomly
    node.style.backgroundColor = '#26173f';
    node.style.borderColor = `seagreen`;
    node.style.opacity = 1;
    }
  );
}

function resizeGrid() {
  gridSize = prompt('Please enter a size for the new Grid. (Between 1 and 64)');
  if (gridSize > 1000) {
    resizeGrid();
  } else if (gridSize && (typeof Number(gridSize) === 'number')) {
    while(container.firstChild) {                           // Remove old divs and redraw the grid only if a number lower than 65 was entered
      container.firstChild.remove();
    }
    createGrid(gridSize);
  } else {                                                  // So you can cancel the Resizing
    console.log(typeof gridSize)
    return
  }

  if (randomColorsActivated) {                              // To reactivate randomColor Mode if it was activated
    RandomColor();
    RandomColor();
  } else if (gradientActivated) {                           // To reactivate gradient Mode if it was activated
    Gradient();
    Gradient();
  }
}

function RandomColor() {
  if (gradientActivated) {                                  // Only one mode can be activated at a time
    Gradient();
  }

  const pixels = document.querySelectorAll('.pixel');
  randomColorsActivated = !randomColorsActivated;           // Toggle randomColor Mode 
  randomColorButton.classList.toggle('activeButton');       // Toggle randomColorButton 

  if (randomColorsActivated) {                              // If it got activated attach the randomColor event listener and remove old one
    pixels.forEach((pixel) => {
      pixel.removeEventListener('mouseover', vanish);
      pixel.addEventListener('mouseover', randomColor);
    });
  } else {                                                  // If it got deactivated do the reverse
    pixels.forEach((pixel) => {
      pixel.removeEventListener('mouseover', randomColor);
      pixel.addEventListener('mouseover', vanish);
    });
  }
}

function randomColor(e) {   // This is the actual function that gets applied on RandomColor Mode
  if (e.ctrlKey) {          // Deactivate 'Drawing' when holding Ctrl
    return
  } else {
    e.target.style.transition = 'all 0.7s ease-out';    // Apply constant transition after it was randomised by a reset
    e.target.style.opacity = 1;
    e.target.style.backgroundColor = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`;
    e.target.style.borderColor = 'transparent';
  }
}

function Gradient() {
  if (randomColorsActivated) {    // only one mode can be activated at a time
    RandomColor();
  }

  const pixels = document.querySelectorAll('.pixel');
  gradientActivated = !gradientActivated;                   // Toggle Gradient Mode 
  gradientButton.classList.toggle('activeButton');          // Toggle GradientButton

  if (gradientActivated) {
    pixels.forEach((pixel) => {
      pixel.removeEventListener('mouseover', vanish);
      pixel.addEventListener('mouseover', gradient);
    });
  } else {
    pixels.forEach((pixel) => {
      pixel.removeEventListener('mouseover', gradient);
      pixel.addEventListener('mouseover', vanish);
    });
  }
}

function gradient(e) {  // This is the actual function that gets applied in GradientMode
  if (e.ctrlKey) {      // Hold Ctrl to stop 'drawing'
    return
  } else if (e.target.style.backgroundColor !== 'black') {    // The first time you draw, make background 'Black' but opacity really low, so it looks white
    e.target.style.transition = 'none';
    e.target.style.opacity = 0.1;
    e.target.style.backgroundColor = 'black'; 
    e.target.style.borderColor = 'transparent';
  } else {
    e.target.style.transition = 'all 0.7s ease-out';          // To have a constant transition after it got randomised by a Reset
    e.target.style.opacity = Number(e.target.style.opacity) + 0.1;    // Darken the Pixel by 10%
  }
}

// Initial values
let gridSize = 16;
let pixelBorderWidth = 1;
let randomColorsActivated = false;
let gradientActivated = false;

// Apply Event Handlers for the buttons
resetButton.addEventListener('click', resetGrid);
resizeButton.addEventListener('click', resizeGrid);
randomColorButton.addEventListener('click', RandomColor);
gradientButton.addEventListener('click', Gradient);

// Initialize Grid when loading page
createGrid(gridSize);

