const puppeteer = require('puppeteer')
const fs = require('fs')


//feature to add men and womans to json as well as category to help discern similar listings
async function getNikeShoes(){
    console.log('starting...')

    let shoes = [[], []]

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.nike.com/w/shoes-5e1x6znik1zy7ok')

    let resultsString = await page.evaluate("document.body.querySelector('.subheading__result-count').innerText")
    results = resultsString.slice(0, resultsString.indexOf(' '))
    console.log(results)

    const originalHeight = await page.evaluate("document.body.scrollHeight")
    let prevPrevHeight

    //await new Promise((resolve) => setTimeout(resolve, 2000))
    while(Number(results) >= shoes[0].length){
        shoes = [[], []]
        shoes = await page.evaluate(() => {
            const names = Array.from(document.querySelectorAll('.product-card__title'))
            const prices = Array.from(document.querySelectorAll('.product-price.is--current-price'))
            return [names.map((name) => name.innerText), prices.map((price) => price.innerText.slice(1))]
        })
        console.log('scrolling...')
        previousHeight = await page.evaluate("document.body.scrollHeight")

        if(originalHeight != previousHeight){
            await page.evaluate(`window.scrollBy(0, ${previousHeight} - ${prevPrevHeight})`)
        }else{
            await page.evaluate(`window.scrollBy(0, document.body.scrollHeight - 1400)`)
        }
        
        prevPrevHeight = previousHeight
        await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    
    console.log('removing irrelevant listings...')
    for(let x = 0; x < shoes[0].length; x++){
        if(shoes[0][x] == 'Nike Gift Card' || shoes[0][x] == 'Nike Digital Gift Card'){
            shoes[0].splice(x, 1)
        }
    }
   
   
    console.log('writing json...')

    let jsonArray = []
    for(let i = 0; i < shoes[0].length; i++){
        let shoe = {}
        shoe.name = checkName(shoes[0][i])
        shoe.price = shoes[1][i]
        jsonArray.push(shoe)
    }
    
    fs.writeFileSync('nike.json', JSON.stringify(jsonArray))
    //number of price and name too high and not equal
    await browser.close()
}

//shortens long names with collab while keeping the integrity of the listing intact
function checkName(string) {
    if (string.includes(' x ')) {
      const parts = string.split(' x ');
      return parts[0] + ' ' + parts[1].split(' ')[0];
    } else {
      return string;
    }
  }

module.exports = {
    getNikeShoes: getNikeShoes
}

if (require.main === module) {
    getNikeShoes()
}

