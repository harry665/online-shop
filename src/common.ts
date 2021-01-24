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

export async function getViewHtmlString(page: 'home' | 'basket'): Promise<string> {
  const home = await fetch('views/home.mustache').then(response => response.text());

  const basket = await fetch('views/basket.mustache').then(response => response.text());

  const templates: { home: string, basket: string} = {
    home,
    basket
  }

  return templates[page]
}