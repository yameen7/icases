const products = [{ id: 1, name: 'P', brand: 'adidas', img: 'https://m.media-amazon.com/images/I/71VQxLV+h4L._AC_UL320_.jpg', price: 2500 },
{ id: 2, name: 'A', brand: 'adidas', img: 'https://m.media-amazon.com/images/I/41OnPqQs7jL._AC_UL320_.jpg', price: 4500 },
{ id: 3, name: 'Z', brand: 'adidas', img: 'https://m.media-amazon.com/images/I/515EOROiOuL._AC_UL320_.jpg', price: 8500 },
{ id: 4, name: 'P', brand: 'nike', img: 'https://m.media-amazon.com/images/I/71t+gAhSjRL._AC_UL320_.jpg', price: 8500 },
{ id: 5, name: 'B', brand: 'nike', img: 'https://m.media-amazon.com/images/I/51aIZ39J-GL._AC_UL320_.jpg', price: 9500 },
{ id: 6, name: 'L', brand: 'nike', img: 'https://m.media-amazon.com/images/I/51FvhPa2dhL._AC_UL320_.jpg', price: 11500 },
{ id: 7, name: 'R', brand: 'puma', img: 'https://m.media-amazon.com/images/I/518bLtYspKL._AC_UL320_.jpg', price: 10500 },
{ id: 8, name: 'C', brand: 'puma', img: 'https://m.media-amazon.com/images/I/81G09nYZVIL._AC_UL320_.jpg', price: 8500 },
{ id: 9, name: 'T', brand: 'puma', img: 'https://m.media-amazon.com/images/I/61uj2S1vOPL._AC_UL320_.jpg', price: 2500 },
];

cart = [];
let tmp_p = products;
let productlist = document.getElementById('product-list');
let cartlist = document.getElementById('cart-product');
let cartTotal = document.getElementById('total');
let cartCount = document.getElementById('count');


function rendercart(){
    let amount = 0;
    cartlist.innerHTML='';
    cart.map((val) => {
        amount+=val.price;
        cartlist.innerHTML += carthtml(val);
    })
    cartTotal.innerHTML='Rs '+amount;
    cartCount.innerHTML=cart.length;
}

function carthtml(val) {
    return `<div class="product">
    <div>
        <img src="${val.img}">
    </div>
    <div class="prd-txt">
        <p>${val.name}</p><br>
        <p>${val.brand}</p><br>
        <span>RS: ${val.price}</span>
    </div>
</div>
<hr>`
}

function render() {
    productlist.innerHTML = '';
    tmp_p.map((val) => {
        productlist.innerHTML += innerhtml(val);
    })
}

function innerhtml(val) {
    return `<li>
    <div class="product-img">
        <img src='${val.img}' >
    </div>
    <hr>
    <h4>${val.name}</h4>
    <h4>${val.brand}</h4>
    <h4>${val.price}</h4>
    <button id=${val.id} onclick="addtocart(${val.id})">Add to Cart</button>
</li>`
}

function addtocart(id) {
    console.log(id);
    document.getElementById(id).disabled=true;
    const cart_p = tmp_p.filter((items) => items.id === id);
    cart = [...cart, ...cart_p]
    console.log(cart);
    rendercart();
}

function filter() {
    let filter = document.querySelectorAll('input[name="brand"]:checked');
    if (filter.length == 0) {
        tmp_p = products
        srt('name');
        render();
    }
    else {
        tmp_p = [];
        for (let i = 0; i < filter.length; i++) {
            let tmp = products.filter((item) => item.brand === filter[i].value);
            tmp_p = [...tmp_p, ...tmp];
            srt('name');
            document.getElementById('short').value = 'A-Z'
            render();
        }
    }
}

function shortProducts() {
    let s_val = document.getElementById('short').value;
    if (s_val == 'A-Z') {
        srt('name');
    }
    if (s_val == 'Z-A') {
        srt_desc('name');
    }
    if (s_val == 'low-high') {
        srt('price');
    }
    if (s_val == 'high-low') {
        srt_desc('price')
    }
}

function srt(s_val) {
    tmp_p = tmp_p.sort((a, b) => a[s_val] < b[s_val] ? -1 : 1);
    render();
}

function srt_desc(s_val) {
    tmp_p = tmp_p.sort((a, b) => a[s_val] > b[s_val] ? -1 : 1);
    render();
}

function setcokie() {
    const d = new Date();
    d.setTime(d.getTime() + (20 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = 'popup' + "=" + 'true' + ";" + expires;
    document.getElementById('pop-up').classList.add('pop-hide');
}

window.onload = () => {
    srt('name');
    render()
    // let pop = document.cookie.indexOf('popup');
    // if (pop==-1) {
    //     document.getElementById('pop-up').classList.remove('pop-hide')
    // }
};