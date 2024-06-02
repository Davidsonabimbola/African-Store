const {test, expect} = require('@playwright/test')
const makeSpecificOrders = require('../pages/makeSpecificOrders')
const dataset = JSON.parse(JSON.stringify(require('../utils/Testdata.json')))

test('check order price functionalities', async({page})=>{
    let Total_price = []
    await page.goto('https://debol-storefront.vercel.app/ee/store')
    await page.waitForLoadState()
    const items_order = page.locator('[class="group scale-100 hover:scale-150 transition-all"]')
    const specific_order = items_order.nth(0)
    const orderDetails =specific_order.locator('[class="font-normal font-sans txt-medium text-ui-fg-subtle"]').textContent()
    console.log(await orderDetails) //Cassava/kg
   // await specific_order.click()
    const priceSection = await specific_order.locator('[class="font-normal font-sans txt-medium text-ui-fg-muted"]')
    const price =await priceSection.textContent()
    const amount = await price.split('.') // this split the content at '.'
    const leftOver =await amount[0] // this contains the  whole number number and the currency symbol
    const targetNumber = await leftOver.split('') // this splits the number and the currency
    const number1 = await parseInt (targetNumber[1]) // this converts the target number to an integer
    const number2 = await (amount[1]/100) // this divides the amount[1] by 100 to make it a decimal
    const amount_sumUP = await (number1 + number2)
    Total_price.push(await amount_sumUP)
    console.log(await price) //4.99
    console.log(await number2) //99
    // Total_price.push(await number1)
    // Total_price.push(await number2)
    console.log(await number1) //4
    //console.log(await sum)//499
    console.log(await Total_price)
    
    await priceSection.click()
    expect (await page.locator('[class="font-sans font-medium h2-core text-3xl leading-10 text-ui-fg-base"]')).toBeTruthy()
    const cart_section = page.locator('[class="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12"]')
    await cart_section.getByRole('button',{name: 'Add to cart'}).click()
})


test('placing specific order syntax',{tag: '@smoke'},async({page})=>{
  const MakeSpecific_orders = makeSpecificOrders(page)
  const orderTotal = []
  const product1 = 'Cassava/kg'
  const product2 = 'Cocoyam Powder 40g'
  const product3 = 'Aashirvaad (Whole Wheat Flour) 5kg'
  let Total_price = []
    await page.goto('https://debol-storefront.vercel.app/ee/store')
    //await page.waitForLoadState()
    //MakeSpecific_orders.gotoLoginPage()
    const items_order = page.locator('[class="group scale-100 hover:scale-150 transition-all"]')
    await items_order.filter({has: page.getByText(product2)}).click()
    // await items_order.filter({has: page.getByText(product2)}).click()
    // await items_order.filter({has: page.getByText(product3)}).click()

    const addToCart_section = await page.locator('[class="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12"]')
    
    const addToCart_Button = await addToCart_section.getByRole('button',{name:'Add to cart'})
  //   await page.waitForFunction(
  //     (btn) => !btn.disabled,
  //     {},
  //     addToCart_Button
  // );
  await addToCart_Button.click()
    expect( await page.locator('[class="text-ui-fg-subtle txt-compact-small w-full"]')).toBeTruthy()
    await page.waitForLoadState()
  const cart_box = await page.locator('[class="h-full z-50"]')
  await cart_box.locator('a').hover()
  //await page.waitForLoadState()
  await page.locator('[class="hover:text-ui-fg-base text-base ml-[-1em] md:ml-0 flex items-center gap-1"]').click() // cart div
 // await page.waitForLoadState()
  await page.locator('[class="bg-ui-bg-base hover:bg-ui-bg-base-hover border-ui-border-base transition-fg border-b [&_td:last-child]:pr-6 [&_th:last-child]:pr-6 [&_td:first-child]:pl-6 [&_th:first-child]:pl-6 w-full"]').click()
   const summary = page.locator('[class="flex flex-col gap-y-8 sticky top-12"]')
   await summary.getByRole('button',{name:'Go to checkout'}).click() //checkout button
   //await page.waitForLoadState()
   const customerDetails = await page.locator('[class="grid grid-cols-2 gap-4"]')
   const customerFirst_name = await customerDetails.locator('input').nth(0)
   await customerFirst_name.pressSequentially('Aliyu')
   const customerLast_name = await customerDetails.locator('input').nth(1)
   await customerLast_name.pressSequentially('Garba')
   const customerAddress = customerDetails.locator('input').nth(2)
   await customerAddress.pressSequentially('J sutiste 52, Apartment 101, Tallinn, Estonia')
   const customerPostalcode = customerDetails.locator('input').nth(3)
   await customerPostalcode.pressSequentially('51006')
  
    
})


test('validating account section',{tag:'@first'},async ({page})=>{
   await  page.goto('https://debol-storefront.vercel.app/ee/store')
   const findAccount = await page.locator('[class="hidden small:flex items-center gap-x-6 h-full"]')
  const account = await findAccount.locator('a').nth(1)
  await account.click()
  const email_box = await page.locator('[class="flex relative z-0 w-full txt-compact-medium"]').nth(0)
  await email_box.locator('input').pressSequentially('lolo@yahoo.com')
  const pasword_box = await page.locator('[class="flex relative z-0 w-full txt-compact-medium"]').nth(1)
  const pasword = await pasword_box.locator('input').pressSequentially('12.letmego')
  await page.locator('button[type="submit"]').click() 
})

test('opening an account',{tag:'@account'},async({page})=>{
  await  page.goto('https://debol-storefront.vercel.app/ee/store')
   const findAccount = await page.locator('[class="hidden small:flex items-center gap-x-6 h-full"]')
  const account = await findAccount.locator('a').nth(1)
  await account.click()
  const joinUs_Button = await page.locator('[class="underline"]')
  await joinUs_Button.click()
  const firstName_Field = page.locator('[class="flex relative z-0 w-full txt-compact-medium"]').nth(0)
  await firstName_Field.locator('input').fill('James')
  const lastName_Field = page.locator('[class="flex relative z-0 w-full txt-compact-medium"]').nth(1)
  await lastName_Field.locator('input').fill('Bangbade')
  const email_Field = page.locator('[class="flex relative z-0 w-full txt-compact-medium"]').nth(2)
  await email_Field.locator('input').fill('James_bambam@yahoo.com')
  const password_Field = page.locator('[class="flex relative z-0 w-full txt-compact-medium"]').nth(4)
  await password_Field.locator('input').fill('12345.badboy!')
  await page.locator('button[type="submit"]').click()
  await page.locator('[class="grid grid-cols-1  small:grid-cols-[240px_1fr] py-12"]')
  expect( await page.locator('[class="grid grid-cols-1  small:grid-cols-[240px_1fr] py-12"]')).toBeTruthy()

  const continueDelivery= page.locator('[class="pb-8"]')
  const continueDelivery_button = continueDelivery.getByRole('button',{name:'Continue to delivery'})
  await continueDelivery_button.click()
const TotalSum_Section = page.locator('[class="txt-xlarge-plus"]')
const total_Sum = await TotalSum_Section.textContent()
console.log(await total_Sum)
const amount = await total_Sum.split('.')
    const leftOver =await amount[0] // this contains the  whole number number and the currency symbol
    const targetNumber = await leftOver.split('') // this splits the number and the currency
    const number1 = await parseInt (targetNumber[1]) // this converts the target number to an integer
    const number2 = await (amount[1]/100) // this divides the amount[1] by 100 to make it a decimal

    const giftCard_section = page.locator('[class="w-full bg-white flex flex-col"]')
    const giftcard_button = giftCard_section.getByRole('button',{name:'Add gift card or discount code'})
    giftcard_button.click()



})

test('customer makes an order',{tag:'@second'}, async({page})=>{
  test.setTimeout(150000);
  const freedelivery_requirement = '35'
  const MakeSpecific_orders = makeSpecificOrders(page)
  await MakeSpecific_orders.gotoLoginPage()
  await MakeSpecific_orders.placeOrder(dataset.product)
  await MakeSpecific_orders.selectionAnd_checkout()
  await page.waitForLoadState()
  await MakeSpecific_orders.shippingDetails
  (dataset.first_Name,
    dataset.last_Name, 
    dataset.shipping_Address, 
    dataset.shipping_Postalcode,
     dataset.shiping_City)
  //await MakeSpecific_orders.shippingDetails(Shipping_Firstname,ShippingLastname,ShippingAddress,Shipping_Postalcode,Shippingcity)
  await page.waitForLoadState()
  await MakeSpecific_orders.provideEmail()
  await MakeSpecific_orders.continueDelivery()
  await page.waitForLoadState()
  await MakeSpecific_orders.checkFor_discount(freedelivery_requirement)
  await page.waitForLoadState()
  await MakeSpecific_orders.continueTo_Payment()
  
})


test('multiple orders',{tag:'@third'},async({page})=>{
  test.setTimeout(150000);
  const orderTotal = []
  const products = ['Corn Starch 250G','Cocoyam Powder 40g','Aashirvaad (Whole Wheat Flour) 5kg']
  await page.goto('https://debol-storefront.vercel.app/ee/store')
    const items_order = page.locator('[class="group scale-100 hover:scale-150 transition-all"]')
    for(const product of products){
      const items_orderCount = await items_order.count()
      for (let i =0; i <items_orderCount; i++){
        const specOrder = await items_order.nth(i)
        const orderName = await specOrder.locator('[class="font-normal font-sans txt-medium text-ui-fg-subtle"]').textContent()
        await page.waitForLoadState()
        if (orderName.includes(product)){       
await specOrder.click()
const addToCart_section = await page.locator('[class="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12"]')
await page.waitForLoadState()
const addToCart_Button = await addToCart_section.getByRole('button',{name:'Add to cart'})
await addToCart_Button.click()
const product_container = await page.locator('[class="flex gap-4 ml-[1em] small:ml-0 w-[300px] small:w-auto"]')
const product_menu =await  product_container.locator('a').nth(1)
await product_menu.click()
        }
      }
        }
        
    
})
