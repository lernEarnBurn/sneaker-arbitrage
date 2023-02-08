const puppeteer = require('puppeteer')
const fs = require('fs')


const proxyList = [
    'http://71.255.153.117:80',
    'http://208.70.77.222:1994',
    'http://128.14.27.143:80',
    'http://184.185.105.105:4481',
    'http://66.152.169.73:1994',
    'http://198.148.104.93:1994'
]


const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.70",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:108.0) Gecko/20100101 Firefox/108.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:108.0) Gecko/20100101 Firefox/108.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.61",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.76"
]

const customHeaders = {
    'authority': 'stockx.com',
    'method': 'GET',
    //path : /
    'referer' : 'https://www.google.com/',
    'scheme': 'https',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'max-age=0',
    //'cookie': 'stockx_device_id=2391aff6-ba93-4ca4-acda-8aacff31fa8c; language_code=en; _pxvid=b65e6c27-a3c0-11ed-875c-714c73515755; __pxvid=b852236d-a3c0-11ed-b802-0242ac120003; _ga=GA1.2.1232960068.1675428366; _gcl_au=1.1.316277271.1675428366; ajs_anonymous_id=8c414063-754d-43f5-afb3-255e054efe24; _rdt_uuid=1675428377490.82392945-a5b9-4eb4-978b-829df1a35fa9; __pdst=6157b9dfffee4e819809640c2ae31e7d; rbuid=rbos-b5a45579-259b-42c3-88f6-6163a3c4046c; _pin_unauth=dWlkPU9UQTRNVEpsTW1FdFpqWmhOaTAwWXpKa0xXSmtaV1l0Wm1Vd09XUXdaakEyWWpGaQ; __ssid=ad6c80f4af795f0153f25e499d9dea6; rskxRunCookie=0; rCookie=x96pw8a9bkgrjc5r3am42pldoisyt6; QuantumMetricUserID=09a2c5581189a26774f8c9f1deb9f7e2; _ga=GA1.2.1232960068.1675428366; _gid=GA1.2.1902238137.1675680570; stockx_selected_region=IL; pxcts=3fc6137a-a6db-11ed-b858-557266717974; IR_gbd=stockx.com; stockx_preferred_market_activity=sales; stockx_homepage=sneakers; forterToken=d251424f624146ed80b3169fab05c89a_1675788637117__UDF43_13ck; lastRskxRun=1675788640759; IR_9060=1675788641673%7C0%7C1675788641673%7C%7C; IR_PI=8eb1f3d2-a707-11ed-9537-77e427f7bdd0%7C1675875041673; _uetsid=8c652af0a70711ed85b2cded36dd1fa2; _uetvid=8c655140a70711ed920e21d252985957; _px3=b0b4c83dc0f7a4e7eb0dc6b90933a0613bd692a2dd87430c92d712e91f2b4079:sZ6aBctCI1sKZLIxLZ+6qphKzbZAocPJGHJAlwxbYDJ/iYupUdILDpBWh3eWqmVb8/pcCl+akMDJYoUvJkOlow==:1000:rKt4szsH8le1020OMRZT7/Xxt9sctCP8kQCreCZHCAbn6jV/y9GZs5jWYdT6CogDwdUOSO140i7Ynf7xGmTsGkANOKkuj4NQ38EVNsGguxkpJODNAYfDlUg/MjRmU11LgaH4SJvi/TaEjRomfHCYgZqJMjwwBLjO+x0yoxaQwvtftALVAkZBAgSfF3RIyG0kmOxWK8PCZkVnITvZ+UynFg==; _pxde=bedb6acb42f93362cad6983520ace76abaf2331b3cae8ff2d5166823a1bea548:eyJ0aW1lc3RhbXAiOjE2NzU3OTI3MjA2MjAsImZfa2IiOjB9; _dd_s=; _gat=1; OptanonConsent=isGpcEnabled=0&datestamp=Tue+Feb+07+2023+20%3A02%3A22+GMT%2B0200+(Israel+Standard+Time)&version=202211.2.0&isIABGlobal=false&hosts=&consentId=9f6ddd64-9794-485b-87b8-3358a4a81608&interactionCount=1&landingPath=https%3A%2F%2Fstockx.com%2F&groups=C0001%3A1%2CC0002%3A1%2CC0004%3A1%2CC0005%3A1%2CC0003%3A1',
    'sec-ch-ua': '"Not_A Brand";v="99", "Microsoft Edge";v="109", "Chromium";v="109"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': userAgents[randomInt(0, 10)]
}

async function checkSneaker(){

    //figure out how to get json without wrapping everything in an fs func
    const nikeJson = getNikeJson()


    let arbitrage = []

    //loop this once have proxies ready to go
    const browser = await puppeteer.launch({
        //headless : false,
        defaultViewport : null,
        /*
        args : [
            '--proxy-server=' + chooseProxy() 
        ]
        */
    })
    const page = await browser.newPage()
  
    
    await page.setViewport({
        'width' : 1200, 
        'height' : 800
    })

    const shoe = nikeJson[0]
    console.log(shoe)
    

    await page.setExtraHTTPHeaders(customHeaders)
    await page.goto('https://stockx.com/search?s=' + generateLink(shoe['name']))
    
    await new Promise((resolve) => setTimeout(resolve, randomInt(1250, 2000)))

    const stockPrice = await page.evaluate("document.body.querySelector('.chakra-text.css-9ryi0c').innerText").substring(1)

    console.log(stockPrice)
    await browser.close()

    if(isOppurtunity(shoe['price'], stockPrice)){
        const analysis = {
            'name' : shoe['name'],
            'nike_price' : '$' + shoe['price'],
            'stock_price' : '$' + stockPrice,
            'difference' : '$' + (Number(stockPrice) - Number(shoe['price']))
        }

        arbitrage.push(analysis)
    }

    console.log(arbitrage)
}

function generateLink(string){
    let finalString = ""
    const splitByWord = string.split(" ")
    for(const word of splitByWord){
        finalString = finalString + word + '%20'
    }
    return finalString
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNikeJson(){
    let json
    fs.readFile('./nike.json', (err, data) => {
        if(err) throw err
        json = JSON.parse(data)
        
    }) 
    return json  
}

function isOppurtunity(nikePrice, stockPrice){
    if(Number(nikePrice) >= Number(stockPrice) * 1.3){
        return true
    }else{
        return false
    }
}



//checkSneaker()
console.log(getNikeJson())


