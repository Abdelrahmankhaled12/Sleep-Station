$(".owl-carousel").owlCarousel({
    // autoplay: true,
    rtl: document.querySelector("[lang]").getAttribute("dir") === "rtl" ? true : false,
    smartSpeed: 1000,
    margin: 25,
    loop: true,
    center: true,
    dots: false,
    nav: true,
    responsive: {
        0: {
            items: 1
        },
        576: {
            items: 1
        },
        768: {
            items: 2
        },
        992: {
            items: 3
        }
    }
});

