// =============================
// FOR YOU — INTERACTIVE GIFT
// =============================

const opening = document.getElementById("opening");
const bouquet = document.getElementById("bouquet");
const openGift = document.getElementById("openGift");
const mainPage = document.getElementById("mainPage");

const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicStatus = document.getElementById("musicStatus");

// =============================
// OPEN GIFT
// =============================

openGift.addEventListener("click", () => {
    // Small zoom before changing pages
    bouquet.classList.add("opening");
    createBurst(window.innerWidth / 2, window.innerHeight / 2, 18);

    // Music starts only after the user's click
    playMusic();

    setTimeout(() => {
        opening.classList.add("closing");

        setTimeout(() => {
            opening.style.display = "none";
            mainPage.classList.remove("hidden");

            requestAnimationFrame(() => {
                mainPage.classList.add("visible");
            });

            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 700);

    }, 650);
});

// =============================
// MUSIC
// =============================

function playMusic() {
    bgMusic.volume = 0.45;

    bgMusic.play()
        .then(() => {
            updateMusicUI(true);
        })
        .catch(() => {
            musicStatus.textContent = "Tap 🎵 to play";
        });
}

function pauseMusic() {
    bgMusic.pause();
    updateMusicUI(false);
}

function updateMusicUI(isPlaying) {
    musicToggle.textContent = isPlaying ? "❚❚" : "▶";
    musicToggle.classList.toggle("playing", isPlaying);
    musicStatus.textContent = isPlaying ? "Playing softly..." : "Paused";
}

musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
});

bgMusic.addEventListener("play", () => updateMusicUI(true));
bgMusic.addEventListener("pause", () => updateMusicUI(false));

// =============================
// OPTIONAL PHOTOS
// =============================

// If photo4/photo5 don't exist, hide them.
// The first three remain as placeholders instead of showing a broken image.
document.querySelectorAll(".photo-card").forEach((card, index) => {
    const img = card.querySelector("img");

    img.addEventListener("error", () => {
        if (card.classList.contains("optional")) {
            card.style.display = "none";
            return; 
        }

        img.removeAttribute("src");
        img.alt = "Add your photo here";
        img.style.background =
            "linear-gradient(135deg, #f7dce7, #ece6f4)";
    });
});

// =============================
// DECORATIONS
// =============================

const decorationLayer = document.getElementById("decorations");

function createFloatingItem() {
    const item = document.createElement("span");
    item.className = "float-item";

    const symbols = ["♡", "♥", "✿", "✧", "·"];
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    item.style.left = Math.random() * 100 + "vw";
    item.style.fontSize = (12 + Math.random() * 14) + "px";
    item.style.animationDuration = (7 + Math.random() * 6) + "s";

    decorationLayer.appendChild(item);

    setTimeout(() => item.remove(), 14000);
}

function createSparkle() {
    const spark = document.createElement("span");
    spark.className = "spark";

    spark.style.left = Math.random() * 100 + "vw";
    spark.style.top = Math.random() * 100 + "vh";
    spark.style.animationDelay = Math.random() * 2 + "s";

    decorationLayer.appendChild(spark);

    setTimeout(() => spark.remove(), 4500);
}

setInterval(createFloatingItem, 1100);
setInterval(createSparkle, 1300);

// =============================
// CLICK BURST
// =============================

document.addEventListener("click", (event) => {
    // Don't overdo it on every click
    if (event.target === openGift || event.target === musicToggle) return;

    if (Math.random() > 0.55) {
        createBurst(event.clientX, event.clientY, 5);
    }
});

function createBurst(x, y, amount = 8) {
    const symbols = ["♡", "✧", "♥"];

    for (let i = 0; i < amount; i++) {
        const item = document.createElement("span");
        item.className = "float-item";
        item.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        item.style.left = x + (Math.random() * 100 - 50) + "px";
        item.style.top = y + (Math.random() * 60 - 30) + "px";
        item.style.bottom = "auto";
        item.style.fontSize = (13 + Math.random() * 10) + "px";
        item.style.animationDuration = (1.5 + Math.random() * 1.5) + "s";

        decorationLayer.appendChild(item);

        setTimeout(() => item.remove(), 3500);
    }
}
