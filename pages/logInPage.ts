import { Locator, Page } from "@playwright/test";

export default class  LoginPage{
   //הגרת האלמנטים בדף וסוגם
   private usernameTextField: Locator;
   private passwordtTextField: Locator
   private loginButton: Locator
   
   //ערך האלמנטים בדף לקחת מF12 
    constructor(page: Page ){
        this.usernameTextField = page.locator('[data-test="username"]')
         this.passwordtTextField = page.locator('[data-test="password"]')
        this.loginButton = page.locator('[data-test="login-button"]')
        
    }
//בניית פונקציות עזר לקרוא לפעולות בקובץ הטסטים פונקציית התחברות 

public async logInToApp(username: string, password: string) {
    await this.usernameTextField.fill(username)
    await this.passwordtTextField.type(password,{delay: 100})
    await this.loginButton.click()


}

}