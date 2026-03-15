let slides = document.querySelectorAll(".slide");
let current = 0;
let isAnimating = false;
let flipSound = new Audio("page-flip.mp3");

document.addEventListener("DOMContentLoaded", () => {
    // Tanggal Update
    let updateElem = document.getElementById("updatedDate");
    if (updateElem) {
        updateElem.textContent = new Date().toLocaleDateString("id-ID", {
            day: "numeric", month: "long", year: "numeric"
        });
    }

    // Kategori
    const categories = document.querySelectorAll('.category');
    const answerBox = document.getElementById('answer');
    categories.forEach(cat => {
        cat.addEventListener('click', () => {
            answerBox.style.opacity = 0;
            setTimeout(() => {
                answerBox.textContent = cat.getAttribute('data-answer');
                answerBox.style.opacity = 1;
            }, 200);
        });
    });
});

function showSlide(next) {
    if (isAnimating || next === current) return;
    isAnimating = true;

    flipSound.currentTime = 0;
    flipSound.play().catch(() => {});

    slides[current].classList.remove("active");
    slides[current].classList.add("exit");

    slides[next].classList.add("active");

    setTimeout(() => {
        slides[current].classList.remove("exit");
        current = next;
        isAnimating = false;
    }, 800);
}

document.getElementById("next").onclick = () => showSlide((current + 1) % slides.length);
document.getElementById("prev").onclick = () => showSlide((current - 1 + slides.length) % slides.length);

// Navigasi Keyboard
document.onkeydown = (e) => {
    if (e.key === "ArrowRight") document.getElementById("next").click();
    if (e.key === "ArrowLeft") document.getElementById("prev").click();
};

// Cek Orientasi
function checkOri() {
    document.getElementById("rotate-warning").style.display = 
        window.innerHeight > window.innerWidth ? "flex" : "none";
}
window.onresize = checkOri;
checkOri();
