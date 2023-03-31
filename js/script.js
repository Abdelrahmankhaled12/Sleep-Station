import {setData as setData , getData as getData} from "./localStorage.js";

// Play Counter Animation And Scroll Down
let btnn = document.querySelector(".scroll");
let section = document.querySelector(".about");
let y = document.querySelectorAll(".num");
let links = document.querySelectorAll(".nav-link");
let sectionAbout = document.querySelector("#about");
let sectionProducts = document.querySelector("#products");
let sectionContact = document.querySelector("#contact");
let sectionHome = document.querySelector("#home");

let started = !1;
let start = !1;

function startCount(y) {
    let goal = y.dataset.goal;
    let count = setInterval(() => {
        y.textContent++;
        if (y.textContent == goal) {
            clearInterval(count);
        }
    }, 3000 / goal);
}


window.onscroll = function () {
    if (window.scrollY >= section.offsetTop - 500) {
        if (!start) {
            y.forEach((num) => startCount(num));
        }
        start = !0;
    }

    if (window.scrollY >= 400) {
        btnn.style.display = "block";
    } else {
        btnn.style.display = "none";
    }

    btnn.onclick = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    
    if (window.scrollY >= sectionHome.offsetTop  - 500) {
        links.forEach(link=>link.classList.remove("active"));
        links[0].classList.add("active")
    }
    if (window.scrollY >= sectionAbout.offsetTop  - 500) {
        links.forEach(link=>link.classList.remove("active"));
        links[1].classList.add("active")
    }
    if (window.scrollY >= sectionProducts.offsetTop - 500){
        links.forEach(link=>link.classList.remove("active"));
        links[2].classList.add("active")
    }
    if (window.scrollY >= sectionContact.offsetTop - 500){
        links.forEach(link=>link.classList.remove("active"));
        links[3].classList.add("active")
    }

};



// GET Elements
let count = document.getElementById("count");
let formPromoCode = document.getElementById("formPromoCode")

// Create Variable Storage Data From Local Storage
let listItems = getData();

// Default Form Contact
formPromoCode.addEventListener("submit", (e) => {
    e.preventDefault();
})


// Counter Cart
count.innerHTML = listItems.length





