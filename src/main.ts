import { getViewHtmlString, renderTemplate, routing } from "./common";

const route = routing()
const page = getViewHtmlString(route)

changePage(page)

function changePage(page: string) {
  renderTemplate(page)
}

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