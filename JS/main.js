
const tabs = document.querySelectorAll(".search__tab");
const panels = document.querySelectorAll(".search__panel");


// ==============================
// Tabs
// ==============================

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        tabs.forEach(tab => {
            tab.classList.remove("active");
            tab.setAttribute("aria-selected", "false");
        });

        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");


        panels.forEach(panel => {
            panel.classList.remove("active");
        });


        const panelId = tab.getAttribute("aria-controls");
        const panel = document.getElementById(panelId);

        panel.classList.add("active");

    });

});



// ==============================
// Reusable Slider
// ==============================

const sliders = document.querySelectorAll(".slider");


sliders.forEach(slider => {

    let isDown = false;
    let startX;
    let scrollLeft;


    // ==========================
    // Mouse Drag
    // ==========================

    slider.addEventListener("mousedown", (e) => {

        isDown = true;

        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;

    });


    slider.addEventListener("mouseleave", () => {

        isDown = false;

    });


    slider.addEventListener("mouseup", () => {

        isDown = false;

    });


    slider.addEventListener("mousemove", (e) => {

        if (!isDown) return;

        e.preventDefault();

        const x = e.pageX - slider.offsetLeft;

        const walk = (x - startX) * 1.5;

        slider.scrollLeft = scrollLeft - walk;

    });



    // ==========================
    // Mouse Wheel
    // ==========================

    slider.addEventListener("wheel", (e) => {

        if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) {
            return;
        }

        e.preventDefault();

        slider.scrollBy({
            left: e.deltaY,
            behavior: "smooth"
        });

    }, { passive: false });



    // ==========================
    // Auto Slide
    // ==========================

    setInterval(() => {

        const card = slider.querySelector(".slider__card");

        if (!card) return;


        const gap = parseFloat(
            getComputedStyle(slider).gap
        ) || 0;


        const scrollAmount = card.offsetWidth + gap;


        const maxScroll =
            slider.scrollWidth - slider.clientWidth;


        const isAtEnd =
            Math.abs(slider.scrollLeft) >= maxScroll - 5;


        if (isAtEnd) {

            slider.scrollTo({
                left: 0,
                behavior: "smooth"
            });

        } else {

            slider.scrollBy({
                left: -scrollAmount,
                behavior: "smooth"
            });

        }

    }, 3000);

});

