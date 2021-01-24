import { Basket } from "./models/basket";
import { renderer } from "./renderer";

const basket = Basket.make()
basket.addProduct('1337')
basket.addProduct('1338')
basket.addProduct('1339')
basket.addProduct('1340')

renderer()

// DropDown Amount
// const selectAmount = document.getElementById("selectAmount");
// let contents;

// for (let i = 0; i <= 10; i++) {
//   contents += "<option>" + i + "</option>";
// }

// selectAmount.innerHTML = contents;