// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Typing Effect
let typedText = document.querySelector(".typed-text");
let words = ["an Electronics Engineer.", "a Software Developer.", "a Lifelong Learner."];
let wordIndex = 0;
let charIndex = 0;
function type() {
    if (charIndex < words[wordIndex].length) {
        typedText.textContent += words[wordIndex][charIndex];
        charIndex++;
        setTimeout(type, 200);
    } else {
        setTimeout(erase, 1000);
    }
}
function erase() {
    if (charIndex > 0) {
        typedText.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 100);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    }
}
document.addEventListener("DOMContentLoaded", type);

// Contact form validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const message = document.querySelector('#message').value;

        // Basic form validation
        if (!name || !email || !message) {
            e.preventDefault();
            alert('Please fill in all fields before submitting the form.');
        }
    });
}



