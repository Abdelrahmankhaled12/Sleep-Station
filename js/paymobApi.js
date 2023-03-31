import { getData as getDataLocal , setDataLocal as setDataLocal } from "./localStorage.js";

let listItems = getDataLocal();

// Get Elements
let nameI = document.getElementById("nameInput");
let phone = document.getElementById("phoneInput");
let card = document.getElementById("cardInput");
let email = document.getElementById("emailInput");
let address = document.getElementById("addressInput");
let governorates = document.getElementById("selectedGon");

// Storage Values
let nameValue;
let phoneValue;
let cardValue;
let emailValue;
let addressVAlue;
let governoratesValue;

governorates.addEventListener("change", (e) => {
    governoratesValue = e.target.value;
});

// Click Button Check Out
document.getElementById("checkOut").addEventListener("click", () => {
    nameValue = nameI.value;
    phoneValue = phone.value;
    cardValue = card.value;
    emailValue = email.value;
    addressVAlue = address.value;

    if (nameValue.trim()) {
        nameI.classList.add("right")
        nameI.classList.remove("wrong")
    } else {
        nameI.classList.add("wrong")
        nameI.classList.remove("right")
    }

    if (phoneValue.trim()) {
        phone.classList.remove("wrong")
        phone.classList.add("right")
    } else {
        phone.classList.add("wrong")
        phone.classList.remove("right")
    }

    if (emailValue.trim()) {
        email.classList.remove("wrong")
        email.classList.add("right");
    } else {
        email.classList.add("wrong")
        email.classList.remove("right")
    }

    if (addressVAlue.trim()) {
        address.classList.remove("wrong")
        address.classList.add("right");
    } else {
        address.classList.add("wrong")
        address.classList.remove("right")
    }

    if (governoratesValue) {
        governorates.classList.remove("wrong")
        governorates.classList.add("right");
    } else {
        governorates.classList.add("wrong")
        governorates.classList.remove("right")
    }

    if (nameValue.trim() && emailValue.trim() && phoneValue.trim() && addressVAlue.trim() && governoratesValue) {
        document.querySelector(".offcanvasTopButton").click();
    }
})


let option = "option1";


let radio = document.querySelectorAll(".radio");

radio.forEach(ele => {
    ele.addEventListener("change", (event) => {
        option = event.target.value;
    })
})

let frameId;
let integration_id;

document.querySelectorAll("#checkoutFinal").forEach(item => {
    item.addEventListener("click", () => {
        if (option === "option1") {
            integration_id = 2456978;
            frameId = "436037";
            firstStep();
        } else if (option === "option3") {
            integration_id = 2928191;
            frameId = "686450";
            firstStep();
        } else {
            sendEmail();
        }
        listItems = [];
        setDataLocal(listItems)
    })
})



function dataApi() {
    let list = [];
    listItems.forEach(item => {
        let x = {
            name: item.title,
            amount_cents: String(item.discount),
            description: item.title + item.size + item.discount + item.color,
            quantity: String(item.quantity)
        }
        list.push(x);
    })
    return list;
}



// Paymob
const API = 'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TWpRNE16VTJMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkubGZuaWhkenk1OWdiYjhpYnBib20zT2R3WEQ1ZUVQYU9HbkZmOTd3Sjh0YXF0MVlTNGlvZjhEWlJfNVB0eFJVYXRPNWF5ZkdJaWY3d3hHUnAyeml6VFE='        // your api here

async function firstStep() {
    let data = {
        "api_key": API
    }

    let request = await fetch('https://accept.paymob.com/api/auth/tokens', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    let response = await request.json()

    let token = response.token

    secondStep(token)
}

async function secondStep(token) {
    let data = {
        "auth_token": token,
        "delivery_needed": "false",
        "amount_cents": getDataLocal().map(e => +e.quantity * +e.discount).reduce((acc, ele) => acc + ele) + 60 === 60 ? "0" : ((getDataLocal().map(e => +e.quantity * +e.discount).reduce((acc, ele) => acc + ele) + 60) * 100),
        "currency": "EGP",
        "items": dataApi(),
    }

    let request = await fetch('https://accept.paymob.com/api/ecommerce/orders', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    let response = await request.json()

    let id = response.id

    thirdStep(token, id)
}

async function thirdStep(token, id) {
    let data = {
        "auth_token": token,
        "amount_cents": getDataLocal().map(e => +e.quantity * +e.discount).reduce((acc, ele) => acc + ele) + 60 === 60 ? "0" : ((getDataLocal().map(e => +e.quantity * +e.discount).reduce((acc, ele) => acc + ele) + 60) * 100),
        "expiration": 3600,
        "order_id": id,
        "billing_data": {
            "apartment": "803",
            "email": emailValue,
            "floor": "42",
            "first_name": nameValue,
            "street": addressVAlue,
            "building": "8028",
            "phone_number": phoneValue,
            "shipping_method": "PKG",
            "postal_code": "01898",
            "city": governoratesValue,
            "country": "CR",
            "last_name": nameValue,
            "state": "Utah"
        },
        "currency": "EGP",
        "integration_id": integration_id
    }

    let request = await fetch('https://accept.paymob.com/api/acceptance/payment_keys', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    let response = await request.json()

    let TheToken = response.token

    cardPayment(TheToken)
}


async function cardPayment(token) {
    let iframURL = `https://accept.paymob.com/api/acceptance/iframes/${frameId}?payment_token=${token}`
    window.open(iframURL, "_blank")
    window.location.reload();
}


function sendEmail() {

    const emailService = 'service_p977dij';   
    const templateId = 'template_frhuqyu';      
    const userId = 'y4q_CG_FvrgA9wkBT'; 

    const emailContent = {
        subject: `New Order`, 
        message: `
        Email : ${emailValue},
        phone : ${phoneValue},
        address : ${addressVAlue},
        governorates : ${governoratesValue},
        ---------------------------------------------------
        details Order:
        ---------------------------------
        ${listItems.map((item, index) =>
            `
        order ${index + 1} : ${item.title} ,size : ${item.size},price :${item.discount} ,color :${item.color} ,quantity : ${item.quantity} 
        --------------------------------------------------------------------------------------------------------------------
        `).join(" ")}
    `
    }

    emailjs.send(emailService, templateId, emailContent, userId)
        .then((response) => {
            Swal.fire({
                title: 'successfully registered',
                text: 'Well, you will be contacted within 48 hours. If there is no response, please contact us 0101-715-9771 ',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        })
        const myTimeout = setTimeout(reloadWindow, 7000);
        function reloadWindow() {
            window.location.reload()
        }
}



