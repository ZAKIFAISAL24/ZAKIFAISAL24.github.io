let slides = document.querySelectorAll(".slide");
let current = 0;
let isAnimating = false;

// Pengaturan awal saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
    // 1. Ambil tanggal update terakhir otomatis
    let lastModified = new Date(document.lastModified);
    let formattedUpdate = lastModified.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    let updateElem = document.getElementById("updatedDate");
    if (updateElem) {
        updateElem.textContent = formattedUpdate;
    }

    // 2. Logika klik kategori pada slide 3 (Biodata)
    const categories = document.querySelectorAll('.category');
    const answerBox = document.getElementById('answer');

    categories.forEach(cat => {
        cat.addEventListener('click', () => {
            if (answerBox) {
                answerBox.textContent = cat.getAttribute('data-answer');
            }
        });
    });
});

// Efek suara transisi
let flipSound = new Audio("page-flip.mp3");

function showSlide(next) {
    if (isAnimating || next === current) return;
    isAnimating = true;

    // Mainkan suara transisi
    flipSound.currentTime = 0;
    flipSound.play().catch(e => console.log("Audio play dipending browser"));

    let currentSlide = slides[current];
    let nextSlide = slides[next];

    // Animasi transisi slide
    currentSlide.classList.remove("active");
    currentSlide.classList.add("exit");

    nextSlide.classList.add("active");

    setTimeout(() => {
        currentSlide.classList.remove("exit");
        current = next;
        isAnimating = false;
    }, 800); // Harus sinkron dengan durasi di style.css
}

// Navigasi Tombol
document.getElementById("next").addEventListener("click", () => {
    let next = (current + 1) % slides.length;
    showSlide(next);
});

document.getElementById("prev").addEventListener("click", () => {
    let next = (current - 1 + slides.length) % slides.length;
    showSlide(next);
});

// Navigasi Keyboard
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        let next = (current + 1) % slides.length;
        showSlide(next);
    }
    if (e.key === "ArrowLeft") {
        let next = (current - 1 + slides.length) % slides.length;
        showSlide(next);
    }
});

// Jalankan slide pertama
showSlide(current);
