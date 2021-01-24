import { render } from "mustache";

export function routing(pageHash: string): 'home' | 'basket' {
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

      {{ #products }}
        <div class="product-card">
          <img src="img/{{ id }}.jpg">
          <div class="text-style">
          {{ name }}: {{ price }}
          </div>
          <button id="add-product-{{ id }}" type="button" class="btn-add">
            <i class="fas fa-shopping-cart fa-2x"></i>
          </button>
        </div>
      {{ /products }}

    </div>
  `

  const basket = `
    <div class="body">

      <div class="basket-body-element">

        {{ #items }}
          <div class="basket-body-item">
            <div class="basket-body-item-quantity">
              {{ quantity }}
            </div>
            <div class="basket-body-item-img">
              <img src="img/{{ id }}.jpg" height="60px">
            </div>
            <div class="basket-body-item-info">
              {{ name }}
            </div>
            <div class="basket-body-item-price">
              {{ totalPrice }}  €
            </div>
          </div>
        {{ /items }}
    
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
              {{ totalPrice }} €
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