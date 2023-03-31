// Create Array Storage Data
let dataReview = [
    {
        "icon": `<i class="fa-solid fa-m"></i>`,
        "name": "Mohamed Ahmed",
        "date": "Mar 9,2023",
        "desc": "Best Pillows"
    },
    {
        "icon": `<i class="fa-solid fa-m"></i>`,
        "name": "Mona sayed",
        "date": "Mar 5,2023",
        "desc": "Best pillows ever"
    },
    {
        "icon": `<i class="fa-solid fa-a"></i>`,
        "name": "Ali Ahmed",
        "date": "Mar 1,2023",
        "desc": "Durable"
    },
    {
        "icon": `<i class="fa-solid fa-a"></i>`,
        "name": "Asmaa Sayed",
        "date": "Feb 26,2023",
        "desc": "Very comfy"
    },
    {
        "icon": `<i class="fa-solid fa-k"></i>`,
        "name": "Khaled Mohamed",
        "date": "Feb 12,2023",
        "desc": "beautiful"
    },
    {
        "icon": `<i class="fa-solid fa-s"></i>`,
        "name": "Sayed Abdelrahman",
        "date": "Feb 1,2023",
        "desc": "High quality products"
    },
    {
        "icon": `<i class="fa-solid fa-a"></i>`,
        "name": "ALi Ahmed",
        "date": "Jun 29,2023",
        "desc": "Best Pillows"
    },
    {
        "icon": `<i class="fa-solid fa-r"></i>`,
        "name": "Rokia Amr",
        "date": "Jun 23,2023",
        "desc": "Best Pillows"
    },
    {
        "icon": `<i class="fa-solid fa-f"></i>`,
        "name": "Fares Ahmed",
        "date": "Jun 22,2023",
        "desc": "amazing"
    },
    {
        "icon": `<i class="fa-solid fa-y"></i>`,
        "name": "Yosef Sayed",
        "date": "Jun 21,2023",
        "desc": "High quality products"
    },
    {
        "icon": `<i class="fa-solid fa-a"></i>`,
        "name": "Abdelrahman khaled",
        "date": "Jun 12,2023",
        "desc": "Very comfy"
    },
    {
        "icon": `<i class="fa-solid fa-a"></i>`,
        "name": "ALi Ahmed",
        "date": "Jun 1,2023",
        "desc": "Durable"
    },
    {
        "icon": `<i class="fa-solid fa-m"></i>`,
        "name": "Mohmahmed",
        "date": "Dec 10,2022",
        "desc": "Best"
    }
]

// Add Reviews
function reviewLoop() {
    dataReview.forEach(review => reviews(review));
}

// Add Review In Dom
function reviews(review) {
    let reviews = document.getElementById("reviews");

    let div = document.createElement("div");

    div.setAttribute("class", "box-review p-4");

    div.innerHTML = `
    <div class="title mb-3 d-flex justify-content-between align-items-center">
        <div class="name d-flex">
        ${review.icon}
            <p>${review.name}</p>
        </div>
        <span class="data">${review.date}</span>
    </div>
    <div class="body">
        <ul>
            <li><i class="fa-solid fa-star"></i></li>
            <li><i class="fa-solid fa-star"></i></li>
            <li><i class="fa-solid fa-star"></i></li>
            <li><i class="fa-solid fa-star"></i></li>
            <li><i class="fa-solid fa-star"></i></li>
        </ul>
        <p>${review.desc}</p>
    </div>
`
    reviews.appendChild(div)
}

// Call Function Review Loop for Add Reviews in Dom 
reviewLoop();