import { getViewHtmlString, renderTemplate, routing } from "./common";
import { Basket } from "./models/basket";
import { ProductList } from "./models/product-list";

export async function renderer() {
    const mainTemplate = await fetch('views/components/main.mustache').then(response => response.text());
    
    const page: any = window.location.hash || '#home'

    await changePage(page)

    async function changePage(page: '#home' | '#basket') {
        const route = routing(page)
        const viewHtmlString = await getViewHtmlString(route)

        const headerTemplate = await fetch('views/components/header.mustache').then(response => response.text());
        const footerTemplate = await fetch('views/components/footer.mustache').then(response => response.text());

        const headerRender = renderTemplate(headerTemplate, {
            title: route,
            basket: Basket.make().getBasketCount()
        })        

        const data = route === 'basket' ? {
            items: Basket.make().getBasket().items,
            totalPrice: Basket.make().getBasket().totalPrice
        } : {
            products: ProductList.make().getProducts()
        }
        const contentRender = renderTemplate(viewHtmlString, data)

        const footerRender = renderTemplate(footerTemplate)

        // main template
        const mainRender = renderTemplate(mainTemplate, {
            header: headerRender,
            content: contentRender,
            footer: footerRender
        })

        document.getElementById('app-main')!.innerHTML = mainRender

        handleEventListener(route)
    }

    function handleEventListener(page: 'home' | 'basket') {
        const navigateToHomeButtonElement = window.document.getElementById('navigate-to-home-button')!
        const navigateToBasketButtonElement = window.document.getElementById('navigate-to-basket-button')!

        // remove event listener
        navigateToHomeButtonElement.removeEventListener("click", () => changePage('#home'))
        navigateToBasketButtonElement.removeEventListener("click", () => changePage('#basket'))

        // add event listener
        navigateToHomeButtonElement.addEventListener("click", () => changePage('#home')); 
        navigateToBasketButtonElement.addEventListener("click", () => changePage('#basket'));

        if(page === 'home') {
            const products = ProductList.make().getProducts()

            for (const product of products) {
                const product1337Element = window.document.getElementById(`add-product-${product.id}`)!
                product1337Element.removeEventListener("click", () => addProductToBasked(product.id))
                product1337Element.addEventListener("click", () => addProductToBasked(product.id)); 
            }
        }
    }
}

function addProductToBasked(productId: string) {
    const products = ProductList.make()
    const basket = Basket.make()

    const productHat = products.getProduct(productId)

    basket.addProduct(productHat.id)

    renderer()
}