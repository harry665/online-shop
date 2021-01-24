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
    const navigateToHomeButtonElement = window.document.getElementById('navigate-to-home-button')!
    navigateToHomeButtonElement.removeEventListener("click", () => render('#home'))
    navigateToHomeButtonElement.addEventListener("click", () => render('#home')); 
    
    const navigateToBasketButtonElement = window.document.getElementById('navigate-to-basket-button')!
    navigateToBasketButtonElement.removeEventListener("click", () => render('#basket'))
    navigateToBasketButtonElement.addEventListener("click", () => render('#basket'));

    if(page === 'home') {
        // home add products event listeners
        const products = ProductList.make().getProducts()
        for (const product of products) {
            const product1337Element = window.document.getElementById(`add-product-${product.id}`)!
            product1337Element.removeEventListener("click", () => addProductToBasket(product.id))
            product1337Element.addEventListener("click", () => addProductToBasket(product.id)); 
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