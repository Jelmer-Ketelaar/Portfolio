function calculateAge(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age -= 1;
    }

    return age;
}

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const menu = document.querySelector(".menu");
    const menuToggle = document.querySelector(".menu-toggle");
    const menuIcon = menuToggle ? menuToggle.querySelector("i") : null;
    const scrollButton = document.querySelector(".scroll-up-btn");
    const age = document.getElementById("age");
    const currentYear = document.getElementById("current-year");

    function setScrollState() {
        const isScrolled = window.scrollY > 24;

        if (navbar) {
            navbar.classList.toggle("sticky", isScrolled);
        }

        if (scrollButton) {
            scrollButton.classList.toggle("show", window.scrollY > 520);
        }
    }

    function closeMenu() {
        if (!menu || !menuToggle) {
            return;
        }

        menu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");

        if (navbar) {
            navbar.classList.remove("menu-open");
        }

        if (menuIcon) {
            menuIcon.classList.add("fa-bars");
            menuIcon.classList.remove("fa-times");
        }
    }

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", function () {
            const isOpen = menu.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", String(isOpen));

            if (navbar) {
                navbar.classList.toggle("menu-open", isOpen);
            }

            if (menuIcon) {
                menuIcon.classList.toggle("fa-bars", !isOpen);
                menuIcon.classList.toggle("fa-times", isOpen);
            }
        });

        menu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });
    }

    if (scrollButton) {
        scrollButton.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    if (age) {
        age.textContent = String(calculateAge("2001-05-09"));
    }

    if (currentYear) {
        currentYear.textContent = String(new Date().getFullYear());
    }

    setScrollState();
    window.addEventListener("scroll", setScrollState, {passive: true});
});
