const stockBtn = document.querySelector('#show')
const inStock = document.querySelector('#instock')
const cart = document.querySelector('#cart') 
const stockcontainer = document.querySelector('#stockcontainer')
const chooseHeader = document.querySelector('#chooseheader')
const cartdiv = document.querySelector('#cartdiv')
const chooseItem = document.querySelector('#chooseitem')
const removeBtn = document.querySelector('#removebtn')

let stonk = []
let choices = []
let realCart =[]


const inStockItems = (stock) => {
    let items = document.createElement("div")
    items.innerHTML =  `
        <div class="instock-items">
        <h3>${stock.name}</h3>
        <h5>Price: $${stock.price}</h5>
        <img class = "albumImg" src='${stock.imgAddress}' alt='${stock.name}'/>
        <img class = "tapeImg" src='${stock.casAddress}' alt='${stock.name}'/>
        <img class = "tapeImgTwo" src='${stock.casTwoAddress}' alt='${stock.name}'/>
        <br>
        <button class="cartbtn" onclick = "chooseCartItem(${stock.id})">Add to cart</button>
        </div>
    `
    return items
}

const inCartItems = (stock) => {
    let cartItems = document.createElement("div")
    cartItems.innerHTML =  `
        <div class="cart-items">
        <h6>${stock.name}</h6>
        <h7>Price: $${stock.price}</h7>
        <br>
        <img class = "tapeImg3" src='${stock.casAddress}' alt='${stock.name}'/>
        <br>
        <button class="removebtn" onclick = "removeCartItem(${stock.id})">Remove From Cart</button>
        </div>
    `
    console.log(cartItems)
    return cartItems
}


const getAndRenderStock = () => {

    axios.get('http://localhost:3000/api/stock')
    .then(({data}) => {
        chooseHeader.innerHTML = ''
        choices=data
        data.forEach(stonk => {
            let stockHtml = inStockItems(stonk)
            chooseHeader.appendChild(stockHtml)
        })
        
    })
        
}


const renderChoices = () => {
    cartdiv.innerHTML = ''
    realCart.forEach(stonk => {
        let stockHtml = inCartItems(stonk)
        cartdiv.appendChild(stockHtml)
    })
}

const chooseCartItem = (id) => {
    let index = choices.findIndex(stock => stock.id === id)
    realCart.push(choices[index])
    choices.splice(index, 1)
    renderChoices()
    }

     

    const removeCartItem = () => {
        choices = []
        stonk = []
        realCart = []
        renderChoices() 
    }
    
  


stockBtn.addEventListener('click', getAndRenderStock)
