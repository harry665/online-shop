import { render } from "mustache";

export function routing(pageHash: string): 'basket' | 'home' {
  const page = pageHash.split('#')[1]
  window.location.hash = page

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

export function renderTemplate(template: string, data: object = {}): string {
  const rendered = render(
    template, 
    data
  )

  return rendered
}

export function getViewHtmlString(page: 'home' | 'basket'): string {
  const home = `
    <div class="content-element">
              
        <div class="product-card">
          <img src="img/product-1.jpg">
          <div class="text-style">Schwarzer Hut: 10,00€</div>
          <button id="add-product-1337" type="button" class="btn-add">
            <i class="fas fa-shopping-cart fa-2x"></i>
          </button>
        </div>

        <div class="product-card">
          <img src="img/product-2.jpg">
          <div class="text-style">Schwarzes T-Shirt: 15,00€</div>
          <button id="add-product-1338" type="button" class="btn-add">
            <i class="fas fa-shopping-cart fa-2x"></i>
          </button>
        </div>

        <div class="product-card">
          <img src="img/product-3.jpg">
          <div class="text-style">Schwarze Hose: 25,00€</div>
          <button id="add-product-1339" type="button" class="btn-add">
            <i class="fas fa-shopping-cart fa-2x"></i>
          </button>
        </div>

        <div class="product-card">
          <img src="img/product-4.jpg">
          <div class="text-style">Schwarze Schuhe: 50,00€</div>
          <button id="add-product-1340" type="button" class="btn-add">
            <i class="fas fa-shopping-cart fa-2x"></i>
          </button>
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

  const templates: { home: string, basket: string} = {
    home,
    basket
  }

  return templates[page]
}