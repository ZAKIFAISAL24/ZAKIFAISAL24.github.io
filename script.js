let slides = document.querySelectorAll(".slide");
let current = 0;
let isAnimating = false;

document.addEventListener("DOMContentLoaded", function () {
    // Ambil tanggal update terakhir otomatis
    let lastModified = new Date(document.lastModified);

    // Format ke bahasa Indonesia
    let formattedUpdate = lastModified.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    // Masukkan ke HTML
    document.getElementById("updatedDate").textContent = formattedUpdate;
});


document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll('.category');
    const answerBox = document.getElementById('answer');

    categories.forEach(cat => {
        cat.addEventListener('click', () => {
            answerBox.textContent = cat.getAttribute('data-answer');
        });
    });
});


// Suara kertas
let flipSound = new Audio("page-flip.mp3");

function showSlide(next) {
    if (isAnimating || next === current) return;
    isAnimating = true;

    // Mainkan suara kertas
    flipSound.currentTime = 0;
    flipSound.play();

    let currentSlide = slides[current];
    let nextSlide = slides[next];

    // Animasi keluar
    currentSlide.classList.remove("active");
    currentSlide.classList.add("exit");

    // Masukin slide baru
    nextSlide.classList.add("active");

    setTimeout(() => {
        currentSlide.classList.remove("exit");
        current = next;
        isAnimating = false;
    }, 800); // sama dengan durasi CSS
}

document.getElementById("next").addEventListener("click", () => {
    let next = (current + 1) % slides.length;
    showSlide(next);
});

document.getElementById("prev").addEventListener("click", () => {
    let next = (current - 1 + slides.length) % slides.length;
    showSlide(next);
});

// Navigasi pakai keyboard
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



showSlide(current);



