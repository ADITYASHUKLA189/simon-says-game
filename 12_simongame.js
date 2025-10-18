let gameseq = [];
let userseq = [];

let started = false;
let level = 0;

let btns = ["green", "yellow", "blue", "red"];

let h2 = document.querySelector("h2");

// Start game on keypress
document.addEventListener("keypress", function () {
    if (started === false) {
        console.log("The game has been started");
        started = true;
        levelup();
    }
});

function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // Corrected: include all 4 buttons (0–3)
    let random = Math.floor(Math.random() * 4);
    let randcolor = btns[random];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    console.log(gameseq);
    btnflash(randbtn);
}

function checkans() {
    let lastIndex = userseq.length - 1;

    if (userseq[lastIndex] === gameseq[lastIndex]) {
        if (userseq.length === gameseq.length) {
            // Corrected: delay levelup properly
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerText = `Game Over:your score${level} Press any key to restart`;
        resetGame();
    }
}

function btnpress() {
    let btn = this;
    btnflash(btn);

    let userColor = btn.getAttribute("id");
    userseq.push(userColor);
    checkans();
}

// Add click event to all buttons
let allbtns = document.querySelectorAll(".innerbox");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function resetGame() {
    started = false;
    level = 0;
    gameseq = [];
    userseq = [];
}
