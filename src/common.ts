import { render } from "mustache";

export function renderTemplate(content: string) {

    const mainTemplateDomElement = document.getElementById('app-main')
    const rendered = render(
      mainTemplateDomElement!.innerHTML, 
      { 
        header: `
          <header> 
            <div class="header">
              <div class="header-element">
    
                <div class="text-style" id="app-title">
                  <h2>{{ title }}</h2>
                </div>
    
                <div class="text-style">
                  <button 
                    type="button" 
                    class="btn-style" 
                    onclick="changePage"
                  >
                      <i class="fas fa-shopping-basket fa-3x"></i>
                  </button>
                </div>
    
              </div>
            </div>
          </header>
        `,
        footer: `
          <footer>
            <div class="footer">
              <div class="footer-element">
    
                <div class="text-style">
                  Week Sale!
                </div>
    
                <div class="text-style">
                  Einmaliger Rabatt in Höhe von 15%: SALE21
                </div>
    
                <div class="text-style">
                  Einmaliger Gutschein in Höhe von 5,00€: NEWYEAR21
                </div>
    
              </div>
            </div>
          </footer>
        `, 
        content
      }, {
        title: 'Shop'
      }
    )
    
    mainTemplateDomElement!.innerHTML = rendered

}

export function routing(): 'basket' | 'home' {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page')

  switch (page) {
    case 'basket': {
      return 'basket'
    }

    case 'home': {
      return 'home'
    }
  
    default: {
      return 'home'
    }
  }
}

export function getViewHtmlString(page: string) {
  const home = `
    <div class="content-element">
              
        <div class="product-card">
            <img src="img/product-1.jpg">
            <div class="text-style">Schwarzer Hut: 10,00€</div>
            <button type="button" class="btn-add"><i class="fas fa-shopping-cart fa-2x"></i></button>
        </div>

        <div class="product-card">
            <img src="img/product-2.jpg">
            <div class="text-style">Schwarzes T-Shirt: 15,00€</div>
            <button type="button" class="btn-add"><i class="fas fa-shopping-cart fa-2x"></i></button>
        </div>

        <div class="product-card">
            <img src="img/product-3.jpg">
            <div class="text-style">Schwarze Hose: 25,00€</div>
            <button type="button" class="btn-add"><i class="fas fa-shopping-cart fa-2x"></i></button>
        </div>

        <div class="product-card">
            <img src="img/product-4.jpg">
            <div class="text-style">Schwarze Schuhe: 50,00€</div>
            <button type="button" class="btn-add"><i class="fas fa-shopping-cart fa-2x"></i></button>
        </div>

    </div>
  `

  const basket = `
    <div class="body">

      <div class="basket-body-element">
      
          <div class="basket-body-item">
              <div class="basket-body-item-quantity">
                  <select name="amount" id="selectAmount"></select>
              </div>
              <div class="basket-body-item-img">
                  <img src="img/product-1.jpg" height="60px">
              </div>
              <div class="basket-body-item-info">
                  Schwarzer Hut
              </div>
              <div class="basket-body-item-price">
                  10,00€
              </div>
          </div>

          <div class="basket-body-item">
              <div class="basket-body-item-quantity">
                  2x
              </div>
              <div class="basket-body-item-img">
                  <img src="img/product-2.jpg" height="60px">
              </div>
              <div class="basket-body-item-info">
                  Schwarzes T-Shirt
              </div>
              <div class="basket-body-item-price">
                  30,00€
              </div>
          </div>

          <div class="basket-body-item">
              <div class="basket-body-item-quantity">
                  1x
              </div>
              <div class="basket-body-item-img">
                  <img src="img/product-3.jpg" height="60px">
              </div>
              <div class="basket-body-item-info">
                  Schwarze Hose
              </div>
              <div class="basket-body-item-price">
                  25,00€
              </div>
          </div>

          <div class="basket-body-item">
              <div class="basket-body-item-quantity">
                  1x
              </div>
              <div class="basket-body-item-img">
                  <img src="img/product-4.jpg" height="60px">
              </div>
              <div class="basket-body-item-info">
                  Schwarze Schuhe
              </div>
              <div class="basket-body-item-price">
                  50,00€
              </div>
          </div>

          <div class="basket-body-element-footer">

              <div class="basket-body-element-coupon">
                  Gutschein hinzufügen (optional):
                  <input
                      class="input"
                      id="input_Item"
                      type="text"
                      maxlength="50"
                      autofocus="autofocus"
                      placeholder="Rabattcode hier eingeben"
                  />
              </div>

              <div class="basket-body-element-checkout">
                  <div class="basket-body-element-amount">
                      Summe (x Artikel):
                  </div>
                  <div class="basket-body-element-total">
                      115,00€
                  </div>
              </div>

          </div>

      </div>

    </div>
  `

  switch (page) {
    case 'basket': {
      return basket
    }

    case 'home': {
      return home
    }
  
    default: {
      return home
    }
  }
}