// Define comic panel sequences
const mainPanels = ["1a.jpg","1b.jpg","1c.jpg", "3a.jpg","3b.jpg", "4a.jpg","4b.jpg", "5a.jpg", "5.PNG"];
const pathA = ["6.jpg", "7.jpg", "8.jpg"];
const pathB = ["62.jpg", "72.jpg"];

let currentPanels = mainPanels;
let currentIndex = 0;
let chosenPath = null;

const imgElement = document.getElementById("comic-panel");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const dialogueOverlay = document.getElementById("dialogue-overlay");

document.addEventListener("DOMContentLoaded", function () {
    const snowContainer = document.querySelector(".snowflakes");

    for (let i = 0; i < 30; i++) { // Adjust number of snowflakes
        let snowflake = document.createElement("div");
        snowflake.classList.add("snowflake");
        snowflake.innerHTML = "❄";
        snowflake.style.left = Math.random() * 100 + "vw"; // Random horizontal position
        snowflake.style.animationDuration = Math.random() * 3 + 2 + "s"; // Different fall speeds
        snowflake.style.fontSize = Math.random() * 20 + 20 + "px"; // Random size
        snowflake.style.animationDelay = Math.random() * 5 + "s"; // Different start times
        snowContainer.appendChild(snowflake);
    }
});

function updatePanel() {
    imgElement.src = `panels/${currentPanels[currentIndex]}`;

    // Disable "Prev" on the first panel
    prevBtn.disabled = (currentIndex === 0);

    // Hide "Next" and show dialogue box at panel 5 (for mainPanels)
    if (currentPanels === mainPanels && currentIndex === 8) {
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

    // Play sound effects based on the chosen path
    if (currentPanels === pathB && currentIndex === pathB.length - 1) {
        // yay sound effect for path b
        if (!soundEffectPlayed) {
            const soundEffect = document.getElementById("sound-effect1");
            if (soundEffect) {
                soundEffect.play().catch(error => console.error("Sound effect playback error:", error));
                soundEffectPlayed = true;
            }
        }
    } else if (currentPanels === pathA && currentIndex === pathA.length - 1) {
        // boo sound effect for Path A
        if (!soundEffectPlayed) {
            const soundEffect = document.getElementById("sound-effect2");
            if (soundEffect) {
                soundEffect.play().catch(error => console.error("Sound effect playback error:", error));
                soundEffectPlayed = true;
            }
        }
    } else {
        // Reset flag 
        soundEffectPlayed = false;
    }
}


function nextPanel() {
    // If on the first panel, background sound plays
    if (currentIndex === 0) {
        const audio = document.getElementById("background-music");
        if (audio) {
            audio.loop = true; 
            audio.play().catch(error => console.error("Audio playback error:", error));
        }
    }
    if (currentIndex < currentPanels.length - 1) {
        currentIndex++;
        updatePanel();
        checkLastSlide();
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

document.addEventListener("DOMContentLoaded", function () {
    //get all buttons
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            // Get the audio 
            const clickSound = document.getElementById("button-click");
            if (clickSound) {
                // Reset the sound if it is already playing
                clickSound.currentTime = 0;
                clickSound.play().catch(error => console.error("Click sound error:", error));
            }
        });
    });
});

function checkLastSlide() {
    if ((currentPanels === pathA && currentIndex === pathA.length - 1) || 
        (currentPanels === pathB && currentIndex === pathB.length - 1)) {
        nextBtn.onclick = returnToHome;
    }
}

function returnToHome() {
    window.location.href = "index.html";
}

