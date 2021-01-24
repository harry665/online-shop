import { getViewHtmlString, renderTemplate, routing } from "./common";

const mainTemplateDomElement = document.getElementById('app-main')!.innerHTML

const page = window.location.hash || '#home'

changePage(page)

function changePage(page: string) {
  const route = routing(page)
  const viewHtmlString = getViewHtmlString(route)

  // reset template
  document.getElementById('app-main')!.innerHTML = mainTemplateDomElement
  

  renderTemplate(viewHtmlString)
}

// window.onhashchange = function () {
//   console.log('CALL' + ':' + window.location.hash);
  
//   const page = window.location.hash || 'home'
//   changePage(page)
// }

window.document.getElementById('navigate-to-basket-button')!.addEventListener("click", () => {
  changePage('#basket')
});

window.document.getElementById('navigate-to-home-button')!.addEventListener("click", () => {
  changePage('#home')
}); 

// import { Basket } from "./models/basket"
// import { Product } from "./models/prodcut"

// const basket = Basket.make()

// const product1 = new Product('1337', "hat", 5.00)
// const product2 = new Product('1338', "tshirt", 10.00)

// basket.addProduct(product1)
// basket.addProduct(product2)

// console.log(basket.getProducts());

// DropDown Amount
// const selectAmount = document.getElementById("selectAmount");
// let contents;

// for (let i = 0; i <= 10; i++) {
//   contents += "<option>" + i + "</option>";
// }

// selectAmount.innerHTML = contents;