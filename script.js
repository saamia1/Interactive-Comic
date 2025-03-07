// Define comic panel sequences
const mainPanels = ["1.PNG", "2.PNG", "3.PNG", "4.PNG", "5.PNG"];
const pathA = ["6.PNG", "7.PNG", "8.PNG"];
const pathB = ["62.PNG", "72.PNG"];

let currentPanels = mainPanels;
let currentIndex = 0;
let chosenPath = null;

const imgElement = document.getElementById("comic-panel");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const dialogueOverlay = document.getElementById("dialogue-overlay");

function updatePanel() {
    imgElement.src = `panels/${currentPanels[currentIndex]}`;

    // Disable "Prev" on the first panel
    prevBtn.disabled = (currentIndex === 0);

    // Hide "Next" and show dialogue box at panel 5
    if (currentPanels === mainPanels && currentIndex === 4) {
        nextBtn.style.display = "none";
        dialogueOverlay.style.display = "block"; // Show dialogue box
    } else {
        nextBtn.style.display = "inline-block";
        dialogueOverlay.style.display = "none"; // Hide dialogue box
    }

    // Ensure "Prev" returns from panel 6/62 to panel 5's dialogue
    if ((currentPanels === pathA || currentPanels === pathB) && currentIndex === 0) {
        prevBtn.onclick = returnToDialogue;
    } else {
        prevBtn.onclick = prevPanel;
    }
}

function nextPanel() {
    if (currentIndex < currentPanels.length - 1) {
        currentIndex++;
        updatePanel();
    }
}

function prevPanel() {
    if (currentIndex > 0) {
        currentIndex--;
        updatePanel();
    }
}

function returnToDialogue() {
    currentPanels = mainPanels;
    currentIndex = 4;
    updatePanel();
}

function choosePath(option) {
    if (option === 'A') {
        currentPanels = pathA;
    } else {
        currentPanels = pathB;
    }
    currentIndex = 0;
    updatePanel();
}
