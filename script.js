 const cartItemscontainer = document.querySelector('.cart-items-container')
 const total = document.querySelector('.total')
 const cartValue = document.querySelector('.cart-value')

 const closeBtn = document.querySelector('.close-btn')
 const cartPage = document.querySelector('.cart-page')
 const cartBag = document.querySelector('.cart-bag-icon')


 
cartBag.addEventListener('click',() => {
    cartPage.classList.add("open")
 })
 closeBtn.addEventListener('click',() => {
    cartPage.classList.remove("open")
 })



let productData ;
    fetch('data.json').then(res => res.json())
                  .then(data => {
                                 productData = data;
                                return showProduct(data)
                                
                                })
                    .catch(err => console.error(err))
   


function showProduct(data){
    const container = document.querySelector('.product-container')
    for(let pro of data){
        // console.log(i.productName)

        // create a card
        let card = document.createElement("div");
        card.classList.add("item-card",pro.category, "hide");

        card.innerHTML = `
                <img src=${pro.image}  alt=${pro.productName}>
                <div class="item-details">
                     <div class="description">
                         <p class="product-name">${pro.productName}</p>
                         <span>$ ${pro.price}</span>
                     </div>
                     <div class="add-btn">
                         <button class="add-cart-btn" onclick='addToCart(${pro.id})'>Add</button>
                     </div>
                </div>
        `
        container.appendChild(card)
    }
}


function filterProduct(value){
    let btns = document.querySelectorAll(".filter-btns")
    btns.forEach(btn => {
        if(value.toUpperCase() == btn.innerText.toUpperCase()){
            btn.classList.add("active")
        }
        else{
            btn.classList.remove("active")
        }
    })

    let elements = document.querySelectorAll(".item-card")
    // console.log(elements)
    elements.forEach(element => {
        if(value == "all"){
            element.classList.remove("hide")
        }
        else{
            if(element.classList.contains(value)){
                element.classList.remove("hide")
            }
            else{
                element.classList.add("hide")

            }
        }
    })
}


window.onload = () => {
    filterProduct('all')
}


document.getElementById('search-btn').addEventListener('click', () => {
    let searchInput = document.getElementById("search-input").value
    let elements = document.querySelectorAll('.product-name')
    let cards = document.querySelectorAll('.item-card')

    elements.forEach((element,index) => {
        if(element.innerText.includes(searchInput.toUpperCase())){
            cards[index].classList.remove('hide')
        }else{
            cards[index].classList.add('hide')

        }
    })
})




let cart  = JSON.parse(localStorage.getItem("CART")) || [];

updateCart()


function addToCart(id){
    if(cart.some((item) => item.id === id)){
        changeNumberOfUnits('plus', id)
    }
    else{
        const cartitem = productData.find(itm => itm.id === id)
        cart.push({
            ...cartitem,
            numberOfUnits : 1
        })
    }
   updateCart();
}

function updateCart(){
    renderCartItems();
    renderSubTotal();

    localStorage.setItem("CART", JSON.stringify(cart))
}


 
function renderSubTotal(){
    let totalPrice = 0,
    totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits
    })
    total.innerHTML = `Subtotal(${totalItems} items) $${totalPrice.toFixed(2)}`
    cartValue.innerHTML = totalItems

}

function renderCartItems(){
    cartItemscontainer.innerHTML = ""
    cart.map((item) => {
        cartItemscontainer.innerHTML += `
        <div class="cart-items">
            <img src=${item.image} alt="item1">
            <div class="description">
                <p class="item-name">${item.productName}</p>
                <span class="item-price">$${item.price}</span>
            </div>
            <div class="cart-btns-container">
                <div class="bottom-btn">
                    <button onclick="removeItems(${item.id})" >Delete</button>
                </div>
                <div class="top-btns">
                    <button class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</button>
                    <span>${item.numberOfUnits}</span>
                    <button class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</button>
                </div>   
            </div>
        </div>
        `
    })
}

function removeItems(id){
    cart = cart.filter((item) => item.id !== id )
    updateCart()
}

function changeNumberOfUnits(action, id){
    cart = cart.map((item) => {
        let numberOfUnits = item.numberOfUnits

        if(item.id === id){
            if(action === "minus" && numberOfUnits > 1){
                numberOfUnits--;
            }
            else if(action === "plus" && numberOfUnits < item.instock){
                numberOfUnits++;
            }
        }
        return{
            ...item,
            numberOfUnits
        }
    })
    updateCart()
}








//  const products = async() => {
//     try{
//         const res = await fetch('data.json')
//         if(!res.ok){
//             throw new Error("network error response not received")
//         }
//         const jsonConvert= await res.json()
//         // console.log(jsonConvert)  
//         return jsonConvert
//     }
//     catch(err){
//         console.log(err)
//     }
//  }

//  const data = products()
//  console.log(data)




 

// function showProducts(data){
    //     const container = document.querySelector('.product-container')
    //    container.innerHTML = data.map((pro)=> {
    //     // console.log(pro.category)
    //         return `
    //         <div class=${'item-card' , pro.category , "hide"}>
    //         <img src=${pro.image}  alt="item1">
    //         <div class="item-details">
    //             <div class="description">
    //                 <p>${pro.productName}</p>
    //                 <span>$ ${pro.price}</span>
    //             </div>
    //             <div class="add-btn">
    //                 <button>Add</button>
    //             </div>
    //         </div>
    //       </div>
    //         `
       
    
    //     })
    // }
    
    // const getProducts = async () => {
    //     try{
    //     const data =  await products()
    //     showProducts(data)
    //     }
    //     catch(err){
    //         console.error(err)
    //     }
    
    // }
    // getProducts()