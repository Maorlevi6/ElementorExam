import { test, expect } from '@playwright/test';
import LoginPage from '../pages/logInPage';
import ProductsPage from '../pages/productsPage';
import { getComparator } from 'playwright-core/lib/utils';


test.describe('tests describes', () => {


    let loginPage: LoginPage;
    let productsPage: ProductsPage;


    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productsPage = new ProductsPage(page)

        await page.goto('https://www.saucedemo.com/');
    })
   
    test('positive login', async ({ page }) => {
        await loginPage.logInToApp('standard_user', 'secret_sauce')
        await productsPage.validedTitle('Products')
    })

    test('negative login', async ({ page }) => {
        await loginPage.logInToApp('standard_user', 'failLogIn')
        await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service')
    })

    test('add to cart and check the checkout e2e test shopping', async ({ page }) => {
        await loginPage.logInToApp('standard_user', 'secret_sauce')
        await productsPage.validedTitle('Products')
        await page.locator('[class="inventory_item_description"]', { hasText: 'Sauce Labs Backpack' }).locator('button').click();
        const cartIcon = page.locator('class=["shopping_cart_badge"]')
        await cartIcon.scrollIntoViewIfNeeded
        await expect(cartIcon).toHaveText('1')
        await expect(page.locator('.title')).toContainText('Checkout: Your Information')
        await page.locator('#first-name').type('maori')
        await page.locator('#last-name').type('levi')
        await page.locator('#postal-code').type('123456')
        await page.locator('continue').click()
        await expect(page.locator('.title')).toContainText('Checkout: Overview')
        await page.locator('#finish').click
        await expect(page.locator('.title')).toContainText('Checkout: Complete!')
        await expect(page.locator('.complete-header')).toContainText('Thank you for your order!')
    })


    test('Test Sorting By DropDown', async ({ page }) => {
        await loginPage.logInToApp('standard_user', 'secret_sauce')
        await productsPage.validedTitle('Products')
        await productsPage.changeValueInDropDown('za')
        await productsPage.changeValueInDropDown('az')
        await productsPage.changeValueInDropDown('hilo')
        await productsPage.changeValueInDropDown('lohi')        
    })

    
    test('visual testing of list of items', async ({ page }) => {
        await loginPage.logInToApp('standard_user', 'secret_sauce')
        await productsPage.validedTitle('Products')
        await productsPage.changeValueInDropDown('za')
        await expect(page).toHaveScreenshot()
        await productsPage.changeValueInDropDown('az')
        await expect(page).toHaveScreenshot()
        await productsPage.changeValueInDropDown('hilo')
        await expect(page).toHaveScreenshot()
        await productsPage.changeValueInDropDown('lohi')
        // await productsPage.changeValueInDropDown('hilo') this option will triger and error to visual testing 
        await expect(page).toHaveScreenshot()
    })



})