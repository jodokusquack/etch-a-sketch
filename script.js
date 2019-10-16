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
    div.addEventListener('mouseover', vanish)
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
}

function randomColors() {
  const pixels = document.querySelectorAll('.pixel');

  pixels.forEach((pixel) => {
    pixel.removeEventListener('mouseover', vanish);
    pixel.addEventListener('mouseover', randomColor);
  })

  function randomColor(e) {
    if (e.ctrlKey) {
      return
    } else {
      e.target.style.backgroundColor = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`;
      e.target.style.borderColor = 'transparent';
    }
    
  }
}


let gridSize = 16;
let pixelBorderWidth = 1;

resetButton.addEventListener('click', resetGrid);
resizeButton.addEventListener('click', resizeGrid);
randomColorButton.addEventListener('click', randomColors);
createGrid(gridSize);

