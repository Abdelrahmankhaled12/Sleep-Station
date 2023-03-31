let checkOutButton = document.getElementById("checkOut");
let count = document.getElementById("count");

// Storage Data
let listItems = getDataLocal();

// Get Data From Local Storage
function getDataLocal() {
    const products = JSON.parse(localStorage.getItem("products"));
    return products === null ? [] : products;
}

// Set Data In local Storage
function setDataLocal(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

// Create All Products
function CreateProducts() {
    listItems.forEach((product) => createProduct(product));
}

// Create Product 
function createProduct(product) {
    let body = document.getElementById("body-table");
    // Create Element tr
    let tr = document.createElement("tr");
    // Add Attributes [Id]
    tr.setAttribute("id", product.id);
    // Content Element
    tr.innerHTML = `
    <td>${product.title}, ${product.size}  ${product.color === "none" ? "" : ",color: "+product.color}</td>
    <td><input type="number" id="${product.id}" class="quantityNew" min="1" value="${product.quantity}"></td>
    <td class="priceproduct none" id="priceproduct">${product.discount}</td>
    <td><button id="${product.id}" class="remove">X</button></td>
`
    body.appendChild(tr);
    let footerTable = document.querySelectorAll(".footerNone");


    let quantityNew = document.querySelectorAll(".quantityNew")
    quantityNew.forEach(numberNew => {
        numberNew.addEventListener("change", (e) => {
            listItems.forEach(element => {
                if (element.id === +e.target.getAttribute("id")) {
                    element.quantity = +e.target.value;
                }
            })
            setDataLocal(listItems)
            let totalPrice = document.getElementById("totalPrice");
            let total = listItems.map(e => +e.quantity * +e.discount).reduce((acc, ele) => acc + ele);
            totalPrice.innerHTML = "EGP " + total;
            footerTable[1].querySelector(".totalPrice").innerHTML = "EGP " + (total + 60);
        })
    })

    // In Case Delete Element
    let remove = document.querySelectorAll(".remove");
    remove.forEach(item => {
        item.addEventListener("click", () => {
            listItems = listItems.filter(element => element.id !== +item.getAttribute("id"));
            [...body.children].forEach(element => {
                if (+element.getAttribute("id") === +item.getAttribute("id")) {
                    element.remove();
                }
            })
            setDataLocal(listItems);
            count.innerHTML = listItems.length;
            let totalPrice = document.getElementById("totalPrice");
            if (listItems.length === 0) {
                totalPrice.innerHTML = "EGP " + "0";
                count.innerHTML = "0";
                footerTable.forEach(e => e.classList.add("tablefooternone"))
                checkOutButton.classList.add("checkNone");

            } else {
                let total = listItems.map(e => +e.quantity * +e.discount).reduce((acc, ele) => acc + ele);
                totalPrice.innerHTML = "EGP " + total;
                footerTable[1].querySelector(".totalPrice").innerHTML = "EGP " + (total + 60);
                checkOutButton.classList.remove("checkNone");

            }
        })
    })
}


// Get Data In local Storage
function getData() {
    return listItems;
}

// Set Data In local Storage
function setData(item) {
    listItems.push(item)
}


// Call Function Create Products
CreateProducts();


export {getData , setData  , createProduct , setDataLocal};