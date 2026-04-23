var swiper = new Swiper(".mySwiper", {
    loop:true,  
    navigation: {
        nextEl: "#next",
        prevEl: "#prev",
      },
    });


    const carticon =document.querySelector('.cart-icon')
    const carttab = document.querySelector('.cart-tab')
const closebtn = document.querySelector('.close-btn')
const cardList = document.querySelector('.card-list')
const cartlist = document.querySelector('.cart-list')
const carttotal = document.querySelector('.cart-total')
const cartvalue = document.querySelector('.cart-value')

    carticon.addEventListener('click', (e) => {
        e.preventDefault()
    carttab.classList.add('cart-tab-active')
    })
    
closebtn.addEventListener('click', (e) => {
    e.preventDefault();
carttab.classList.remove('cart-tab-active')
})

let productList = [];
let cartproduct = []
const updatetotals = () => {
let totalprice = 0
 let totalquantity = 0
    document.querySelectorAll('.item').forEach(item =>{
    const quantity = parseInt(item.querySelector('.quantity-value').textContent)
        const price = parseFloat(item.querySelector('.item-total').textContent.replace('$',''))
totalprice += price;
totalquantity += quantity
});
carttotal.textContent = `$${totalprice.toFixed(2)}`
cartvalue.textContent = totalquantity

}

const showcards = () => {
productList.forEach(product => {
    const ordercard = document.createElement('div');
    ordercard.classList.add('order-card');
    ordercard.innerHTML = `
      <div class="card-image">
        <img src="${product.image}">
      </div>
<h4>${product.name}</h4>
<h4 class="price">${product.price}</h4>
<button class="btn card-btn ">Add To Cart</button>
`
cardList.appendChild(ordercard);
const cardBtn = ordercard.querySelector('.card-btn');
cardBtn.addEventListener('click', (e) => {
    e.preventDefault()
addTocart(product)
}
)
})
}

const addTocart = (product) => {

const existingproduct = cartproduct.find(item => item.id === product.id);
if (existingproduct) {
    alert('Item already in your cart!');
    return;
}
cartproduct.push(product)

let quantity = 1
let price =parseFloat(product.price.replace('$',''))
const cartitem = document.createElement('div');
cartitem.classList.add('item')
cartitem.innerHTML = `
<div class="item-image">
                            <img src="${product.image}" alt="">
                        </div>
                        <div class ="detail">
                            <h4>
                                ${product.name}
                            </h4>
                            <h4 class="item-total">
                                ${product.price}
                            </h4>
                        </div>
                        <div class="flex quantitiy-div">
                            <a href="" class="quantity-btn minus">
                                <i class="fa-solid fa-minus"></i>
                            </a>
                            <h4 class="quantity-value">1</h4>
                            <a href="" class="quantity-btn plus">
                                <i class="fa-solid fa-plus"></i>
                            </a>
                        </div>
`;
cartlist.appendChild(cartitem);
updatetotals();

const itemtotal = cartitem.querySelector('.item-total');
const plusbtn = cartitem.querySelector('.plus');
const quantityvalue = cartitem.querySelector('.quantity-value');
plusbtn.addEventListener('click', (e) => {
    e.preventDefault()
quantity++
quantityvalue.textContent = quantity;
itemtotal.textContent = `$ ${(price * quantity).toFixed(2)}`
updatetotals();
})

const minusbtn = cartitem.querySelector('.minus');

minusbtn.addEventListener('click', (e) => {
e.preventDefault();
if (quantity > 1) {
quantity--;
quantityvalue.textContent = quantity;
itemtotal.textContent = `$ ${(price * quantity).toFixed(2)}`
updatetotals()
}   
else{
    cartitem.classList.add('slide-out')
    setTimeout(() => {
    cartitem.remove();
cartproduct = cartproduct.filter(item => item.id !== product.id);
updatetotals()
}, 300);
}
})
};


const initapp = () => {
    fetch('products.json').then
    (Response => Response.json()).then
        (data => {
                productList = data;
showcards()                
            })
}
initapp()