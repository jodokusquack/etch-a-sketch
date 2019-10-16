const container = document.getElementById('container');
const resetButton = document.getElementById('resetButton');
const resizeButton = document.getElementById('resizeButton');
const gradientButton = document.getElementById('gradientButton');
const randomColorButton = document.getElementById('randomColorButton');

function createGrid(size) {
  for (let i = 0; i < (size**2); i++) {
    let div = document.createElement('div');
    // div.innerHTML = i;
    div.classList.add('pixel');
    div.addEventListener('mouseenter', vanish);
    container.appendChild(div);
  }

  let gridRule = `
  #container {
    display: grid;
    grid-template-columns: repeat(${size}, 1fr);
  }`;

  let pixelSize = (560/size)-(2*pixelBorderWidth);

  let pixelRule = `
  .pixel {
    border: ${pixelBorderWidth}px solid seagreen;
    border-radius: 5px;
    height: ${pixelSize}px;
    width: ${pixelSize}px;
    background-color: #26173f;
  }`;

  let style = document.createElement('style');
  document.head.appendChild(style);
  style.sheet.insertRule(gridRule);
  style.sheet.insertRule(pixelRule);

}

function vanish(e) {
  if (e.ctrlKey) {
    return
  } else {
    e.target.style.transition = 'all 0.7s ease-out';
    e.target.style.backgroundColor = 'transparent';
    e.target.style.borderColor = 'transparent';
  }
}

function resetGrid() {
  const pixels = document.querySelectorAll('.pixel');

  pixels.forEach((node) => {
    node.style.transition = `${Math.random() * 2}s`;
    node.classList.remove('hidden');
    node.style.backgroundColor = '#26173f';
    node.style.borderColor = `seagreen`;
    node.style.opacity = 1;
    }
  );
}

function resizeGrid() {
  gridSize = prompt('Please enter a size for the new Grid. (Between 1 and 64)');
  if (gridSize > 64) {
    resizeGrid();
  } else if (gridSize) {
    while(container.firstChild) {
      container.firstChild.remove();
    }

    createGrid(gridSize);
  } else {
    return
  }

  if (randomColorsActivated) {
    RandomColor();
    RandomColor();
  } else if (gradientActivated) {
    Gradient();
    Gradient();
  }
}

function RandomColor() {
  if (gradientActivated) {      // only one mode can be activated at a time
    Gradient();
  }

  const pixels = document.querySelectorAll('.pixel');
  randomColorsActivated = !randomColorsActivated;
  randomColorButton.classList.toggle('activeButton');

  if (randomColorsActivated) {
    pixels.forEach((pixel) => {
      pixel.removeEventListener('mouseenter', vanish);
      pixel.addEventListener('mouseenter', randomColor);
    });
  } else {
    pixels.forEach((pixel) => {
      pixel.removeEventListener('mouseenter', randomColor);
      pixel.addEventListener('mouseenter', vanish);
    });
  }
}

function randomColor(e) {
  if (e.ctrlKey) {
    return
  } else {
    e.target.style.transition = 'all 0.7s ease-out';
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
  gradientActivated = !gradientActivated;
  gradientButton.classList.toggle('activeButton');

  if (gradientActivated) {
    pixels.forEach((pixel) => {
      pixel.removeEventListener('mouseenter', vanish);
      pixel.addEventListener('mouseenter', gradient);
    });
  } else {
    pixels.forEach((pixel) => {
      pixel.removeEventListener('mouseenter', gradient);
      pixel.addEventListener('mouseenter', vanish);
    });
  }
}

function gradient(e) {
  if (e.ctrlKey) {
    return
  } else if (e.target.style.backgroundColor !== 'black') {
    e.target.style.transition = 'none';
    e.target.style.opacity = 0.1;
    e.target.style.backgroundColor = 'black'; 
    e.target.style.borderColor = 'transparent';
  } else {
    e.target.style.transition = 'all 0.7s ease-out';
    e.target.style.opacity = Number(e.target.style.opacity) + 0.1;
  }
}


let gridSize = 16;
let pixelBorderWidth = 1;
let randomColorsActivated = false;
let gradientActivated = false;

resetButton.addEventListener('click', resetGrid);
resizeButton.addEventListener('click', resizeGrid);
randomColorButton.addEventListener('click', RandomColor);
gradientButton.addEventListener('click', Gradient);
createGrid(gridSize);

