import { getContentTemplate, renderTemplate, routing } from "./common";
import { Basket } from "./models/basket/index";
import { ProductList } from "./models/product-list";
import { Page, PageHash } from "./types";

export async function render(pageHash?: PageHash) {
    const page: any = pageHash || window.location.hash
    const route = routing(page)

    /**
     * partial templates
     */
    const mainTemplate = await fetch('views/components/main.mustache').then(response => response.text());
    const headerTemplate = await fetch('views/components/header.mustache').then(response => response.text());
    const footerTemplate = await fetch('views/components/footer.mustache').then(response => response.text());
    const contentTemplate = await getContentTemplate(route)
    
    /**
     * rendered templates
     */
    
    // header
    const headerRender = renderTemplate(headerTemplate, {
        title: route,
        basket: Basket.make().getBasketCount()
    })
  
    // content
    let data = {}
    if(route === 'home') {
        data = {
            products: ProductList.make().getProducts(),
            formatPrice: function() {
                return (val: number, render: any) => {                    
                    return `${parseFloat(render(val)).toFixed(2).replace('.', ',')} €`
                }
            }
        }
    } else if(route === 'basket') {
        data = {
            items: Basket.make().getBasket().items,
            totalPrice: Basket.make().getBasket().totalPrice,
            basketCount: Basket.make().getBasketCount(),
            usedDiscountCode: Basket.make().discountCode ? `Gutschein "${Basket.make().discountCode}" eingelöst!` : undefined,
            formatPrice: function() {
                return (val: number, render: any) => {                 
                    return `${parseFloat(render(val)).toFixed(2).replace('.', ',')} €`
                }
            }
        }
    }
    
    const contentRender = renderTemplate(contentTemplate, data)
  
    // footer
    const footerRender = renderTemplate(footerTemplate)
  
    /**
     * main template
     */
    const mainRender = renderTemplate(mainTemplate, {
        header: headerRender,
        content: contentRender,
        footer: footerRender
    })
  
    document.getElementById('app-main')!.innerHTML = mainRender
  
    handleEventListener(route)
}

function handleEventListener(page: Page): void {
    // navigation event listeners
    const navigateToHomeButtonElement = window.document.getElementById('navigate-to-home-button')! as HTMLButtonElement
    navigateToHomeButtonElement.removeEventListener("click", () => render('#home'))
    navigateToHomeButtonElement.addEventListener("click", () => render('#home')); 
    
    const navigateToBasketButtonElement = window.document.getElementById('navigate-to-basket-button')! as HTMLButtonElement
    navigateToBasketButtonElement.removeEventListener("click", () => render('#basket'))
    navigateToBasketButtonElement.addEventListener("click", () => render('#basket'));

    if(page === 'home') {
        // add products to basket
        const products = ProductList.make().getProducts()
        for (const product of products) {
            const product1337Element = window.document.getElementById(`add-product-${product.id}`)! as HTMLButtonElement
            product1337Element.removeEventListener("click", () => addProductToBasket(product.id))
            product1337Element.addEventListener("click", () => addProductToBasket(product.id)); 
        }
    }

    if(page === 'basket') {
        // add discount to basket        
        const discountButtonElement = window.document.getElementById('discount-button')! as HTMLButtonElement
        discountButtonElement.removeEventListener("click", () => addDiscountCode())
        discountButtonElement.addEventListener("click", () => addDiscountCode())

        const products = ProductList.make().getProducts()
        for (const product of products) {
            // update quantity in basket
            const updateQuantityInputElement = window.document.getElementById('quantity-input')! as HTMLInputElement
            if(updateQuantityInputElement) {
                updateQuantityInputElement.removeEventListener("keypress", (event) => {
                    if (event.key === 'Enter') {
                        updateQuantity(product.id)
                    }
                })
                updateQuantityInputElement.addEventListener("keypress", (event) => {
                    if (event.key === 'Enter') {
                        updateQuantity(product.id)
                    }
                })
            }

            // increase item quantity in basket
            const increaseQuantityElement = window.document.getElementById(`quantity-increase-button-${product.id}`)! as HTMLButtonElement
            if(increaseQuantityElement) {
                increaseQuantityElement.removeEventListener("click", () => increaseQuantity(product.id))
                increaseQuantityElement.addEventListener("click", () => increaseQuantity(product.id))
            }

            // decrease item quantity in basket
            const decreaseQuantityElement = window.document.getElementById(`quantity-decrease-button-${product.id}`)! as HTMLButtonElement
            if(decreaseQuantityElement){
                decreaseQuantityElement.removeEventListener("click", () => decreaseQuantity(product.id))
                decreaseQuantityElement.addEventListener("click", () => decreaseQuantity(product.id))
            }

            // remove item from basket
            const removeProductElement = window.document.getElementById(`remove-product-button-${product.id}`)! as HTMLButtonElement
            if(removeProductElement) {
                removeProductElement.removeEventListener("click", () => removeProduct(product.id))
                removeProductElement.addEventListener("click", () => removeProduct(product.id))
            }
        }
    }
            
}

function addProductToBasket(productId: string): void {
    const products = ProductList.make()
    const basket = Basket.make()

    const product = products.getProduct(productId)

    basket.addProduct(product.id)

    render()
}

function addDiscountCode(): void {
    const updateQuantityInputElement = window.document.getElementById('discount-input')! as HTMLInputElement
            
    Basket.make().addDiscountCode(updateQuantityInputElement.value)

    render()
}

function updateQuantity(productId: string): void {
    const quantityInputElement = window.document.getElementById('quantity-input')! as HTMLInputElement

    const quantityInputValueAsNumber = Number.parseInt(quantityInputElement.value)
    if(quantityInputValueAsNumber === NaN) {
        return
    }
    
    Basket.make().updateQuantity(productId, quantityInputValueAsNumber)

    render()
}

function increaseQuantity(productId: string): void {
    Basket.make().increaseQuantity(productId)

    render()
}

function decreaseQuantity(productId: string): void {
    Basket.make().decreaseQuantity(productId)

    render()
}

function removeProduct(productId: string): void {
    Basket.make().removeProduct(productId)

    render()
}