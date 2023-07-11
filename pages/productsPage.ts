import { Locator, Page, expect } from "@playwright/test";

export default class  ProductsPage{
   
   private pageTitle: Locator;
  private filterInDropDown: Locator;
  private productDescription: Locator;
  private  buttonAddToCartLabsBackpack: Locator;
  private shoppingCartLink: Locator;
  private shoppingCartBadge: Locator;
  
    constructor(page: Page ){
        this.pageTitle = page.locator('[class="title"]')
        this.filterInDropDown = page.locator('[data-test="product_sort_container"]')
        this.productDescription = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        this.buttonAddToCartLabsBackpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        this.shoppingCartLink = page.locator('class=["shopping_cart_link"]')
        this.shoppingCartBadge = page.locator('class=["shopping_cart_badge"]')
    }



public async validedTitle(expectTitle: string) {
    await expect(this.pageTitle).toContainText(expectTitle)

}

public async changeValueInDropDown(expectValue: string){
    await this.filterInDropDown.selectOption(expectValue)
}

public async addingProductToCart(productDescription: string){   
await  (this.productDescription).allTextContents()
await this.buttonAddToCartLabsBackpack.click()
await expect (this.shoppingCartBadge).toBe(1)
}

}