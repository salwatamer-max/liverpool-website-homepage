document.addEventListener("DOMContentLoaded", function () {
    let lastScrollTop = 0;
    const sidebar = document.querySelector(".sidebar");
    let sidebarDefaultPosition = 0;
    let maxOffset = 200; // Further movement limit
    let movementSpeed = 70; // Increased movement speed per scroll

    window.addEventListener("scroll", function () {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        let scrollDirection = scrollTop > lastScrollTop ? -1 : 1; // Reverse movement

        let moveAmount = scrollDirection * movementSpeed;
        let currentTransform = getComputedStyle(sidebar).transform;

        // Extract the current translateY value
        let match = currentTransform.match(/matrix\(.*,\s*([\d.-]+)\)/);
        let currentY = match ? parseFloat(match[1]) : sidebarDefaultPosition;

        // Calculate new position with boundaries
        let newY = currentY + moveAmount;
        newY = Math.max(-maxOffset, Math.min(newY, maxOffset));

        // Apply instant movement (faster effect)
        sidebar.style.transition = "transform 0.1s ease-out"; // Reduced transition time for speed
        sidebar.style.transform = `translateY(${newY}px)`;

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});

document.addEventListener("scroll", function () {
    let sidebar = document.querySelector(".sidebar");
    let gif = document.querySelector(".floating-gif");

    if (sidebar && gif) {
        let sidebarRect = sidebar.getBoundingClientRect();
        gif.style.transform = `translateX(-50%) translateY(${sidebarRect.top * 0.5}px)`;
    }
});

// Select the header
const header = document.getElementById("header");

// Get the original position of the header
const headerOffset = header.offsetTop;

// Add scroll event listener
window.addEventListener("scroll", function () {
    if (window.scrollY > headerOffset) {
        header.classList.add("fixed"); // Stick to top when scrolling
    } else {
        header.classList.remove("fixed"); // Restore original position
    }
});
