let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Cold Brew Coffee',
        image: 'gambar/1.png',
        price: 35000
    },
    {
        id: 2,
        name: 'Iced Caramel Macchiato',
        image: 'gambar/2.png',
        price: 45000
    },
    {
        id: 3,
        name: 'Chocolate Java Mint',
        image: 'gambar/3.png',
        price: 65000
    },
    {
        id: 4,
        name: 'Iced Cinnamon Dolce Latte',
        image: 'gambar/4.png',
        price: 60000
    },
    {
        id: 5,
        name: 'Chai Creme Frappucino',
        image: 'gambar/5.png',
        price: 60000
    },
    {
        id: 6,
        name: 'Java Chip Frappucino',
        image: 'gambar/6.png',
        price: 65000
    },
    {
        id: 7,
        name: 'Iced Chocolate Almond Milk',
        image: 'gambar/7.png',
        price: 50000
    },
    {
        id: 8,
        name: 'Cold Brew Coffee Milk',
        image: 'gambar/8.png',
        price: 50000
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}