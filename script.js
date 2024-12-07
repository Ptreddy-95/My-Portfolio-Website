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

// Highlight active navbar link based on scroll position
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// Floating success message for contact form
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.textContent = "Thank you for reaching out! Your message has been submitted!";
    successMessage.className = 'success-toast';
    document.body.appendChild(successMessage);
    setTimeout(() => successMessage.remove(), 3000);
}

// Contact form validation and user feedback
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const message = document.querySelector('#message').value.trim();

        // Check if any field is empty
        if (!name || !email || !message) {
            alert('Please fill in all fields before submitting the form.');
            return;
        }

        // Basic email validation
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Call a function to show success message
        showSuccessMessage();

        // Clear form inputs
        contactForm.reset(); // This clears all input fields
    });
}


// Select the skills carousel container
const skillsCarouselInner = document.querySelector('.skills-carousel-inner');

// Clone skill cards dynamically to make scrolling seamless
function cloneSkills() {
    const skillCards = Array.from(skillsCarouselInner.children);
    const totalWidth = skillsCarouselInner.scrollWidth;
    const containerWidth = document.querySelector('.skills-carousel').offsetWidth;

    // Duplicate elements until the total width of the container exceeds the viewport width
    let currentWidth = totalWidth;
    while (currentWidth < containerWidth * 2) {
        skillCards.forEach(skill => {
            const clonedSkill = skill.cloneNode(true);
            skillsCarouselInner.appendChild(clonedSkill);
            currentWidth += skill.offsetWidth + 15; // Update width calculation
        });
    }
}

// Initialize infinite scrolling
function startInfiniteScroll() {
    let position = 0; // Start position

    function scroll() {
        position -= 1; // Adjust scroll speed (pixels per frame)
        // Reset position when the entire width has been scrolled
        if (Math.abs(position) >= skillsCarouselInner.scrollWidth / 2) {
            position = 0;
        }
        skillsCarouselInner.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(scroll);
    }

    scroll(); // Start the scroll loop
}

// Set up the skills carousel
function initializeSkillsCarousel() {
    cloneSkills(); // Clone the skill cards for seamless scrolling
    startInfiniteScroll(); // Start scrolling
}

// Call the initialization function once the DOM content is loaded
document.addEventListener('DOMContentLoaded', initializeSkillsCarousel);

document.addEventListener("DOMContentLoaded", () => {
    const skillsContainer = document.querySelector(".skills-carousel-inner");
    const skillCards = document.querySelectorAll(".skill-card");
    const resumeButton = document.querySelector(".resume-button");

    function checkOverlap(card, button) {
        const cardRect = card.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();

        return (
            cardRect.right > buttonRect.left &&
            cardRect.left < buttonRect.right &&
            cardRect.bottom > buttonRect.top &&
            cardRect.top < buttonRect.bottom
        );
    }

    function fadeSkillsIntoResume() {
        skillCards.forEach((card) => {
            if (checkOverlap(card, resumeButton)) {
                card.classList.add("fade-out");
            } else {
                card.classList.remove("fade-out");
            }
        });
    }

    // Continuously check for overlaps as the skills scroll
    setInterval(fadeSkillsIntoResume, 50);
});

const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
  card.addEventListener('click', () => {
    const inner = card.querySelector('.card-inner');
    inner.classList.toggle('flipped');
  });
});

document.querySelectorAll(".certifications-row").forEach((row) => {
    const cloneCards = () => {
      const cards = [...row.children];
      cards.forEach((card) => {
        const clone = card.cloneNode(true);
        row.appendChild(clone);
      });
    };
  
    // Clone cards for seamless infinite scrolling
    cloneCards();
    cloneCards(); // Repeat to ensure smooth loop
  });
  
//Script for Dynamic Navbar and Sidebar
const navbar = document.getElementById('navbar');
const menuIcon = document.querySelector('.menu-icon');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');

// Scroll event for showing/hiding navbar and displaying menu icon
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        navbar.classList.add('scrolled');
        menuIcon.style.display = 'block'; // Show menu icon after scrolling
    } else {
        navbar.classList.remove('scrolled');
        menuIcon.style.display = 'none'; // Hide menu icon when at top
    }
});

// Menu icon click event to open the sidebar
menuIcon.addEventListener('click', () => {
    console.log('Menu icon clicked'); // Check if the event fires
    sidebar.classList.add('open');
});

// Close button click event to close the sidebar
closeBtn.addEventListener('click', () => {
    console.log('Close button clicked'); // Check if the event fires
    sidebar.classList.remove('open');
});

