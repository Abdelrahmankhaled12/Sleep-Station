import {setData as setData , getData as getData} from "./localStorage.js";


// Get Element
let cartIcon = document.getElementById("cartIcon");
let footerTable = document.querySelectorAll(".footerNone");
let checkOutButton = document.getElementById("checkOut");

// Create Variable Storage Data From Local Storage
let listItems = getData();


// Open Card
cartIcon.addEventListener("click", () => {
    let totalPrice = document.getElementById("totalPrice");
    let total = listItems.map(e => +e.quantity * +e.discount);
    total = total.length === 0 ? 0 : total.reduce((acc, ele) => acc + ele);
    if (total > 0) {
        footerTable.forEach(e => e.classList.remove("tablefooternone"));
        checkOutButton.classList.remove("checkNone");
        footerTable[1].querySelector(".totalPrice").innerHTML = "EGP " + (total + 60);
    } else {
        checkOutButton.classList.add("checkNone");
        footerTable.forEach(e => e.classList.add("tablefooternone"))
    }
    totalPrice.innerHTML = "EGP " + total;
})

// Close Page Cart
document.getElementById("back-btn").addEventListener("click", () => {
    document.getElementById("close-1").click();
})

