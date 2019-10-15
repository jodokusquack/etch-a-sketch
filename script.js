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

  let pixelBorderWidth = 1;
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
    e.target.classList.add('hidden');
  }
}

function resetGrid() {
  const pixels = document.querySelectorAll('.pixel');

  pixels.forEach((node) => {
    node.style.transition = `${Math.random() * 2}s`;
    node.classList.remove('hidden');
    }
  );
}

function resizeGrid() {
  let newSize = prompt('Please enter a size for the new Grid. (Between 1 and 64)');
  if (newSize > 64) {
    resizeGrid();
  } else if (newSize) {
    while(container.firstChild) {
      container.firstChild.remove();
    }

    createGrid(newSize);
  } else {
    return
  }
}

function randomColors() {
  
}


resetButton.addEventListener('click', resetGrid);
resizeButton.addEventListener('click', resizeGrid);
createGrid(16);

