export default class Section {
  constructor(
    data, htmlSelector) {
    this.items = data.items
    this.htmlSelector = htmlSelector
    this.renderer = data.renderer
    this.renderer(data.initialCards, this.htmlSelector)
  }

  addItem(item) {
    
    document.querySelector(this.htmlSelector).prepend(item)
  }
}
