import { render } from "mustache";
import { Page, PageHash, Views } from "./types";

export function routing(pageHash: PageHash): Page {
  const page = pageHash.split('#')[1]

  let newPage: Page = 'home' // fallback to home page
  switch (page) {
    case 'basket': {
      newPage = 'basket'
      break
    }

    case 'home': {
      newPage = 'home'
      break
    }
  }

  window.location.hash = newPage

  return newPage
}

export function renderTemplate(template: string, data: object = {}): string {
  const rendered = render(
    template, 
    data
  )

  return rendered
}

export async function getContentTemplate(page: Page): Promise<string> {
  const home = await fetch('views/home.mustache').then(response => response.text());
  const basket = await fetch('views/basket.mustache').then(response => response.text());

  const views: Views = {
    home,
    basket
  }

  return views[page]
}