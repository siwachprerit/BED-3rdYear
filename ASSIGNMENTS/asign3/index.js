const box = document.getElementById("colorBox");
const button = document.getElementById("changeColorBtn");

const colors =[
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#F0E68C',
    '#FF69B4',
    '#8A2BE2',
    '#00CED1',
    '#FF4500',
    '#2E8B57',
    '#FFD700',
]

button.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    box.style.backgroundColor = colors[randomIndex];
});

let change = false;
button.addEventListener("click", () => {
    if (change) {
        clearInterval(colorInterval);
        change = false;
        button.textContent = "Start Changing Color";
    } else {
        colorInterval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * colors.length);
            box.style.backgroundColor = colors[randomIndex];
        }, 500);
        change = true;
        button.textContent = "Stop Changing Color";
    }
});