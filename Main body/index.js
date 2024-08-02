const container = document.querySelector("#container");
const colorPicker = document.querySelector("#colorPicker");
const gridSize = document.querySelector("#size");
const resetBtn = document.querySelector("#reset");
const theCanvas = document.querySelector("#sketch");
const ctx = theCanvas.getContext("2d");

let currentColor = "black";
let currentX = 0;
let currentY = 0;
let gridCellSize = theCanvas.width / gridSize.value;

// Change the color of the picker
colorPicker.addEventListener("change", (event) => {
    currentColor = event.target.value;
});

// Drawing on the canvas grid
function drawGrid(size) {
    gridCellSize = theCanvas.width / size;
    ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);

    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            ctx.strokeRect(x * gridCellSize, y * gridCellSize, gridCellSize, gridCellSize);
        }
    }

    // Reset cursor to the top-left corner
    currentX = 0;
    currentY = 0;
    drawCursor();
}

// Function to draw the cursor
function drawCursor() {
    ctx.fillStyle = currentColor;
    ctx.fillRect(currentX * gridCellSize, currentY * gridCellSize, gridCellSize, gridCellSize);
}

// Function to move the cursor and draw
function moveCursor(dx, dy) {
    // Erase the current cursor
    ctx.clearRect(currentX * gridCellSize, currentY * gridCellSize, gridCellSize, gridCellSize);

    // Draw the cell with the selected color
    ctx.fillStyle = currentColor;
    ctx.fillRect(currentX * gridCellSize, currentY * gridCellSize, gridCellSize, gridCellSize);

    // Update cursor position
    currentX = Math.min(Math.max(currentX + dx, 0), gridSize.value - 1);
    currentY = Math.min(Math.max(currentY + dy, 0), gridSize.value - 1);

    // Draw the new cursor
    drawCursor();
}

// Event listener for keydown events
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            moveCursor(0, -1);
            break;
        case "ArrowDown":
            moveCursor(0, 1);
            break;
        case "ArrowLeft":
            moveCursor(-1, 0);
            break;
        case "ArrowRight":
            moveCursor(1, 0);
            break;
    }
});

// Reset button functionality
resetBtn.addEventListener("click", () => {
    drawGrid(parseInt(gridSize.value));
});

// Initial grid setup
drawGrid(parseInt(gridSize.value));

// Redraw the grid when grid size changes
gridSize.addEventListener("change", () => {
    drawGrid(parseInt(gridSize.value));
});
