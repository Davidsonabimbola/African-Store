const { expect } = require("@playwright/test")
const specificOrders = (page)=>({
    async gotoLoginPage(){
        await page.goto('https://debol-storefront.vercel.app/ee/store')
    },
    async placeOrder(product){
        const items_order = page.locator('[class="group scale-100 hover:scale-150 transition-all"]')
    await items_order.filter({has: page.getByText(product)}).click()
    // await items_order.filter({has: page.getByText(product2)}).click()
    // await items_order.filter({has: page.getByText(product3)}).click()
    const addToCart_section = await page.locator('[class="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12"]')
    const addToCart_Button = await addToCart_section.getByRole('button',{name:'Add to cart'})
  await addToCart_Button.click()
    expect( await page.locator('[class="text-ui-fg-subtle txt-compact-small w-full"]')).toBeTruthy()
    },

    async selectionAnd_checkout(){
        const cart_box = await page.locator('[class="h-full z-50"]')
  await cart_box.locator('a').hover()
  await page.locator('[class="hover:text-ui-fg-base text-base ml-[-1em] md:ml-0 flex items-center gap-1"]').click() // cart div
  await page.waitForLoadState()
  await page.locator('[class="bg-ui-bg-base hover:bg-ui-bg-base-hover border-ui-border-base transition-fg border-b [&_td:last-child]:pr-6 [&_th:last-child]:pr-6 [&_td:first-child]:pl-6 [&_th:first-child]:pl-6 w-full"]').click()
   const summary = page.locator('[class="flex flex-col gap-y-8 sticky top-12"]')
   await summary.getByRole('button',{name:'Go to checkout'}).click() //checkout button
    },

    async shippingDetails(Shipping_Firstname, ShippingLastname,ShippingAddress,Shipping_Postalcode, Shippingcity ){
        const customerDetails = await page.locator('[class="grid grid-cols-2 gap-4"]')
   const customerFirst_name = await customerDetails.locator('input').nth(0)
   //await customerFirst_name.waitForLoadState()
   await customerFirst_name.pressSequentially(Shipping_Firstname)
   const customerLast_name = await customerDetails.locator('input').nth(1)
   await customerLast_name.pressSequentially(ShippingLastname)
   const customerAddress = customerDetails.locator('input').nth(2)
   await customerAddress.pressSequentially(ShippingAddress)
   const customerPostalcode = customerDetails.locator('input').nth(4)
   await customerPostalcode.pressSequentially(Shipping_Postalcode)
   const customerCity = customerDetails.locator('input').nth(5)
   await customerCity.pressSequentially(Shippingcity)

    },

    async provideEmail(){
        const customerEmail_box = await page.locator('[class="flex relative z-0 w-full txt-compact-medium"]').nth(7)
        const customer_Email = await customerEmail_box.locator('input')
        await page.waitForLoadState()
        await customer_Email.pressSequentially('lasgidi@yahoo.com')
    },

    async continueDelivery(){
        const continueDelivery= page.locator('[class="pb-8"]')
        const continueDelivery_button = continueDelivery.getByRole('button',{name:'Continue to delivery'})
        await continueDelivery_button.click()
    },

    async checkFor_discount(freedelivery_requirement){
        const TotalSum_Section = page.locator('[class="txt-xlarge-plus"]')
const total_Sum = await TotalSum_Section.textContent()
console.log(await total_Sum)
const Discount = parseInt(freedelivery_requirement)
const amount = await total_Sum.split('.')
    const leftOver =await amount[0] // this contains the  whole number number and the currency symbol
    const targetNumber = await leftOver.split('') // this splits the number and the currency
    const number1 = await parseInt (targetNumber[1]) // this converts the target number to an integer
    const number2 = await (amount[1]/100) // this divides the amount[1] by 100 to make it a decimal
    const amount_sumUP = await (number1 + number2)
    console.log(await amount_sumUP)
    if (amount_sumUP < Discount){
console.log(`Customer ${total_Sum} does not qualify for free delivery`)
const deliveryValue = `${targetNumber[0]}0.00`
console.log(`${targetNumber[0]}`+'0.00')
console.log(await deliveryValue)
expect(page.locator('[class="justify-self-end text-ui-fg-base"]'))=== deliveryValue
    }
    else{
        console.log(`Customer ${total_Sum} qualifies for free delivery`)
    }
    },

    // async applyGift_card(){
    //     const giftCard_section = await page.locator('[class="w-full bg-white flex flex-col"]')
    // const giftcard_button = await giftCard_section.getByRole('button',{name:'Add gift card or discount code'})
    // await giftcard_button.click()
    // },

    async continueTo_Payment(){
        await page.getByRole('radio',{name:'Debols Delivery'}).click() //select and click the radio button for delivery by debol
       await  page.waitForLoadState()
        await page.getByRole('button',{name: 'Continue to payment'}).click() //select and click on the continue payment button
    
       
    },

})
module.exports = specificOrders