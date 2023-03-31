// Create Array Storage Data
let dataReview = [
    {
        "icon": `<i class="fa-solid fa-m"></i>`,
        "name": "محمد احمد",
        "date": "مارس 9,2023",
        "desc": "أفضل الوسائد"
    },
    {
        "icon": `<i class="fa-solid fa-m"></i>`,
        "name": "منى سيد",
        "date": "مارس 5,2023",
        "desc": "أفضل الوسائد على الإطلاق"
    },
    {
        "icon": `<i class="fa-solid fa-a"></i>`,
        "name": "علي احمد",
        "date": "مارس 1,2023",
        "desc": "Durable"
    },
    {
        "icon": `<i class="fa-solid fa-a"></i>`,
        "name": "أسماء سيد",
        "date": "فبراير  26,2023",
        "desc": "مريح جدا"
    },
    {
        "icon": `<i class="fa-solid fa-k"></i>`,
        "name": "خالد محمد",
        "date": "فبراير 12,2023",
        "desc": "beautiful"
    },
    {
        "icon": `<i class="fa-solid fa-s"></i>`,
        "name": "سيد عبد الرحمن",
        "date": "فبراير 1,2023",
        "desc": "منتجات ذات جودة عالية"
    },
    {
        "icon": `<i class="fa-solid fa-a"></i>`,
        "name": "علي احمد",
        "date": "يناير 29,2023",
        "desc": "Best Pillows"
    },
    {
        "icon": `<i class="fa-solid fa-r"></i>`,
        "name": "رقيه عمرو",
        "date": "يناير 23,2023",
        "desc": "أفضل الوسائد"
    },
    {
        "icon": `<i class="fa-solid fa-f"></i>`,
        "name": "فارس احمد",
        "date": "يناير 22,2023",
        "desc": "amazing"
    },
    {
        "icon": `<i class="fa-solid fa-y"></i>`,
        "name": "يوسف سيد",
        "date": "يناير 21,2023",
        "desc": "مريح جدا"
    },
    {
        "icon": `<i class="fa-solid fa-a"></i>`,
        "name": "عبد الرحمن خالد",
        "date": "يناير 12,2023",
        "desc": "Very comfy"
    },
    {
        "icon": `<i class="fa-solid fa-a"></i>`,
        "name": "علي احمد",
        "date": "يناير 1,2023",
        "desc": "Durable"
    },
    {
        "icon": `<i class="fa-solid fa-m"></i>`,
        "name": "محمد",
        "date": "ديسمبر  10,2022",
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