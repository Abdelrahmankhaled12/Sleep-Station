import { setData as setData, getData as getData , createProduct , setDataLocal} from "./localStorage.js";

// Scroll Down
let btnn = document.querySelector(".scroll");
window.onscroll = function () {
    if (window.scrollY >= 400) {
        btnn.style.display = "block";
    } else {
        btnn.style.display = "none";
    }
    btnn.onclick = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
};

// GET Elements
let products = document.getElementById("products");
let detailsContainer = document.getElementById("details-container");
let sliderContainerParent = document.getElementById("slider-container-parent");
let count = document.getElementById("count");
let cartIcon = document.getElementById("cartIcon");
let checkOutButton = document.getElementById("checkOut");
let footerTable = document.querySelectorAll(".footerNone");

// Storage Data
let listItems = getData();

// Create Counter
let counter = listItems.length;

// Counter Cart
count.innerHTML = counter;

// Call Data From File Json
let dataProducts = await fetch("json/dataArabic.json").then(
    (result) => result.json()
).then(
    (data) => {
        return data;
    }
);

// Add all Products 
function addProductsAll() {
    dataProducts.forEach((product) => {
        addProduct(product);
        let btnDetails = document.querySelectorAll("#btn-details");
        btnDetails.forEach(button => {
            button.addEventListener("click", showDetails)
        })
        let cards = document.querySelectorAll("#card");
        cards.forEach(card => {
            card.addEventListener("click", clickCard);
        })
        // Add To Card
        let addCard = document.querySelectorAll("#addCard");
        addCard.forEach(element => {
            element.addEventListener("click", addCartOut)
        })

        // Filter Products
        let typeProducts = document.querySelectorAll(".typesProduct");
        typeProducts.forEach(element => {
            element.addEventListener("click", (item) => {
                if (!element.classList.contains("active")) {
                    [...products.children].forEach(e => e.remove())
                    let id = element.getAttribute("id");
                    if (id === "all") {
                        addProductsAll();
                    } else if (id === "Bean-Bags" || id === "Mattresses") {
                        let img = document.createElement("img");
                        img.src = "images/coming-soon.jpg"
                        img.setAttribute("class", "img-size img-fluid sooon")
                        products.appendChild(img)
                    }
                    else {
                        dataProducts.forEach(product => {
                            if (product.category === id) {
                                addProduct(product)
                                let btnDetails = document.querySelectorAll("#btn-details");
                                btnDetails.forEach(button => {
                                    button.addEventListener("click", showDetails)
                                })
                                let cards = document.querySelectorAll("#card");
                                cards.forEach(card => {
                                    card.addEventListener("click", clickCard);
                                })
                                // Add To Card
                                let addCard = document.querySelectorAll("#addCard");
                                addCard.forEach(element => {
                                    element.addEventListener("click", addCartOut)
                                })
                            }
                        })
                    }
                    typeProducts.forEach(e => e.classList.remove("active"))
                    element.classList.add("active");
                }
            })
        })
    })
}


// Add Product
function addProduct(product) {
    // create div
    let div = document.createElement("div");
    // Add class
    div.setAttribute('class', "col-lg-4 col-md-6 col-sm-12")
    div.setAttribute('category', product.category)
    div.setAttribute('data-id', product.id)
    //Add inner html
    div.innerHTML = `
                    <div class="box">
                        <div class="card overflow-hidden">
                            <div class="image overflow-hidden" id="card" data-id="${product.id}">
                                <img src=${product.imageDetalias[0]} class="card-img-top">
                            </div>
                            <div class="card-body">
                                <div class="title mb-4 d-flex justify-content-between align-items-center">
                                    <h5>${product.productTitle}</h5>
                                    <p class="price d-flex"><span>${product.discount[0]}</span><span class="me-1">ج.م</span></p>
                                </div>
                                <div class="buttons d-flex justify-content-start align-items-center">
                                    <button type="button"  id="btn-details" data-id="${product.id}" class="btn btn-primary buttonStyle ms-2"
                                        data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
                                                                                            تفاصيل
                                    </button>
                                    <button type="button" id="addCard" data-id="${product.id}" class="btn  btn-primary buttonStyle"> 
                                                            اضف الي العربة
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
        `
    products.appendChild(div);
}

// Show Details
function showDetails() {
    let buttonId = +this.getAttribute("data-id");
    dataProducts.forEach(product => {
        if (+product.id === buttonId) {
            sliderContainerParent.innerHTML += `
                    <div class="slider-container" id="slider-container">
                    ${product.imageDetalias.map(img => `<img src=${img} >`).join(" ")}
                    </div>
                    <div class="slider-controls">
                    <span id="indicators" class="indicators">
                    </span>
                    </div>
                    `
            detailsContainer.innerHTML += `
                    <button class="buttonStyleBack" id="back-btnn"><i class="fa-solid fa-arrow-left"></i>   العودة الي جميع المنتجات
                        </button>
                    <h2 class="mt-5">${product.productTitle}</h2>
                    <p class="price" id="discountP">ج.م ${product.discount[0]} <del id="priceDel">ج.م ${product.price[0]}</del></p>
                    <div class="description">${product.description}</div>
                    <div class="form">
                        <div class="row">
                            <div class="col-lg-6 col-md-12">
                                <div class="qty">
                                    <label for="">كمية</label>
                                    <input type="number" min="1" id="quantity" value="1">
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-12">
                                <div class="select">
                                    <label for="">حجم</label>
                                    <select class="form-select" id="selected" aria-label="Default select example">
                                        ${product.size.map((sizetype, index) => `<option value="${index}">${sizetype}</option>
                                        `).join(" ")}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="color mt-2 d-flex">
                        <span>لون:</span>
                        <span id="chooseColor">${product.color === true ? product.colorArabic[0] : "ابيض" }</span>
                        </div>
                        ${product.color === true ? 
                        `<ul class="mt-2 colors d-flex align-items-center">
                        ${product.colorTypes.map((colorType, index) => ` <li ${index === 0 ? `class="active"`:""} id="${colorType}" data-colorAr="${product.colorArabic[index]}"></li>
                                        `).join(" ")}
                        </ul>`   
                        : ""}
                    </div>
                    <button class="buttonStyle add-card mt-5" id="addCardd">اضف الي العربة <i class="fa-solid fa-cart-shopping"></i></button>
                    <div class="icon">
                    <img src="images/icon.avif" class="img-size img-fluid">
                    </div>
                    `
            // Add Slider
            slider();
            // Close Page
            let btnClose = document.getElementById("btn-close");
            let btnBack = document.getElementById("back-btnn");
            btnClose.addEventListener("click", () => {
                detailsContainer.innerHTML = "";
                sliderContainerParent.innerHTML = "";
            })

            btnBack.addEventListener("click", () => {
                btnClose.click();
            })

            // Change Price 
            let quantity = document.getElementById("quantity");
            quantity.addEventListener("change", (number) => {
                if (number.target.value > 0) {
                    document.getElementById("discountP").innerHTML = "EGP " + (+number.target.value * product.discount[0]) + `<del id="priceDel">EGP ${+number.target.value * product.price[0]}</del>`;
                }
            })

            let selected = document.getElementById("selected");
            selected.addEventListener("change", (select) => {
                document.getElementById("discountP").innerHTML = "EGP " + (+quantity.value * product.discount[+selected.value]) + `<del id="priceDel">EGP ${+quantity.value * product.price[+selected.value]}</del>`;
            })

            // Choose Colors
            let itemsColor = document.querySelectorAll("ul.colors li");
            let colorChoose = "ابيض"; // Defualt Color
            itemsColor.forEach(itemColor=>{
                itemColor.addEventListener("click",()=>{
                    itemsColor.forEach(item=>item.classList.remove("active"));
                    itemColor.classList.add("active");
                    document.getElementById("chooseColor").innerHTML = itemColor.getAttribute("data-colorAr");
                    colorChoose = itemColor.id;
                })
            })

            // Add To Card
            let addCardd = document.getElementById("addCardd");
            addCardd.addEventListener("click", () => {
                addToCard(product.productTitle, product.size[+selected.value], product.discount[+selected.value], +quantity.value,colorChoose)
            })
        }
    })
}

// ADD To Cart
function addToCard(title, size, discount, quantity , color = "none") {
    let id = listItems.length === 0 ? 0 : listItems[listItems.length - 1].id + 1;
    // Create Object Task Store Text and Place
    const newPrduct = { title, size, discount, quantity, id , color};
    // Call Function Create Task
    createProduct(newPrduct);
    // Add Object In Array CardsData
    listItems = getData();
    listItems.push(newPrduct);
    // Add Object In Local Storage
    setDataLocal(listItems);
    count.innerHTML = listItems.length ;
}

// Click Card
function clickCard() {
    let btnDetails = document.querySelectorAll("#btn-details");
    btnDetails.forEach(button => {
        if (+this.getAttribute("data-id") === +button.getAttribute("data-id")) {
            button.click();
        }
    })
}

// Add ELement Out Without Open Datelis
function addCartOut() {
    let item = dataProducts.filter(e => +e.id === +this.getAttribute("data-id"))
    addToCard(item[0].productTitle, item[0].size[0], item[0].discount[0], 1 , "white")
}



addProductsAll();



// Slider 
function slider() {
    // Get slider items
    let sliderImages = Array.from(document.querySelectorAll(".slider-container img"));

    // Get Number of Slides
    let slidesCount = sliderImages.length;

    // Set Current slide 
    let currentSlide = 1;

    // Create the Main Ul Element
    let PaginationElement = document.createElement("ul");

    // Set ID on Create Ul Element 
    PaginationElement.setAttribute("id", "pagination-ul");

    // Create List Items Based On Slides Count
    for (let i = 1; i <= slidesCount; i++) {
        // Create The LI
        let PaginationItem = document.createElement("li");

        // Set Custom Attribute
        PaginationItem.setAttribute("data-index", i);

        // Append items to the Main Ul list
        PaginationElement.appendChild(PaginationItem)
    }
    // Add the cteated Ul Element to the Page
    document.getElementById("indicators").appendChild(PaginationElement);

    // Get The New Created Ul
    let PaginationUl = document.getElementById("pagination-ul");

    // Loop Through All Bullets Items
    for (let i = 0; i < PaginationUl.children.length; i++) {
        Array.from(PaginationUl.children)[i].onclick = function () {
            currentSlide = this.getAttribute("data-index");
            theChecker();
        }
    }

    // Next slide Function

    function nextSlide() {
        currentSlide++;
    }

    // previous slide Function

    function prevSlide() {
        currentSlide--;
        theChecker();
    }
    // Create the Checker Function
    function theChecker() {
        // Remove All Active Classes
        removeAllActive();

        // Set Active Class On Current Slide
        sliderImages[currentSlide - 1].classList.add("active");

        // Set Active Class on Current Pagination item
        PaginationUl.children[currentSlide - 1].classList.add("active");
    }

    // Remove All Active Classes From Images and Pagination Bullets
    function removeAllActive() {

        // loop Through images
        sliderImages.forEach((img) => img.classList.remove("active"));

        // loop Through Pagination Bullets
        Array.from(PaginationUl.children).forEach((item) => item.classList.remove("active"));
    }

    // Trigger The Checker Function
    theChecker();
}
