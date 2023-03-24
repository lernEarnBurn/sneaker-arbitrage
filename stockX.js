const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

const { chromium } = require('playwright')





const proxyList = [
    'http://71.255.153.117:80',
    'http://208.70.77.222:1994',
    'http://128.14.27.143:80',
    'http://184.185.105.105:4481',
    'http://66.152.169.73:1994',
    'http://198.148.104.93:1994'
]

const referers = [
    'https://www.google.com/',
    'https://www.bing.com/',
    'https://www.facebook.com/',
    'https://www.twitter.com/',
    'https://www.instagram.com/',
    'https://www.reddit.com/r/Sneakers/',
    'https://www.yahoo.com/',
    'https://www.amazon.com/',
    'https://www.ebay.com/',
    'https://www.cnn.com/',
    'https://www.sneakernews.com/',
    'https://www.highsnobiety.com/tag/stockx/',
    'https://hypebeast.com/tags/stockxX',
    'https://solecollector.com/news/tags/stockx',
    'https://www.complex.com/tags/stockx',
    'https://www.footwearnews.com/tag/stockx/',
    'https://www.businessinsider.com/',
    'https://www.vogue.com/fashion/',
    'https://www.cnet.com/search/'
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
    'referer' : referers[randomInt(0, 18)],
    'scheme': 'https',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'max-age=0',
    'cookie': `stockx_device_id=${uuidv4()}; language_code=en; _pxvid=${uuidv4()}; __pxvid=${uuidv4()}; _ga=GA1.2.1232960068.1675428366; _gcl_au=1.1.316277271.1675428366; ajs_anonymous_id=8c414063-754d-43f5-afb3-255e054efe24; _rdt_uuid=1675428377490.82392945-a5b9-4eb4-978b-829df1a35fa9; __pdst=6157b9dfffee4e819809640c2ae31e7d; rbuid=${uuidv4()}; _pin_unauth=dWlkPU9UQTRNVEpsTW1FdFpqWmhOaTAwWXpKa0xXSmtaV1l0Wm1Vd09XUXdaakEyWWpGaQ; __ssid=ad6c80f4af795f0153f25e499d9dea6; rskxRunCookie=0; rCookie=x96pw8a9bkgrjc5r3am42pldoisyt6; QuantumMetricUserID=${uuidv4()}; _ga=GA1.2.1232960068.1675428366; _gid=GA1.2.1902238137.1675680570; stockx_selected_region=IL; pxcts=3fc6137a-a6db-11ed-b858-557266717974; IR_gbd=stockx.com; stockx_preferred_market_activity=sales; stockx_homepage=sneakers; forterToken=d251424f624146ed80b3169fab05c89a_1675788637117__UDF43_13ck; lastRskxRun=1675788640759; IR_9060=1675788641673%7C0%7C1675788641673%7C%7C; IR_PI=8eb1f3d2-a707-11ed-9537-77e427f7bdd0%7C1675875041673; _uetsid=${uuidv4()}; _uetvid=${uuidv4()}; _px3=b0b4c83dc0f7a4e7eb0dc6b90933a0613bd692a2dd87430c92d712e91f2b4079:sZ6aBctCI1sKZLIxLZ+6qphKzbZAocPJGHJAlwxbYDJ/iYupUdILDpBWh3eWqmVb8/pcCl+akMDJYoUvJkOlow==:1000:rKt4szsH8le1020OMRZT7/Xxt9sctCP8kQCreCZHCAbn6jV/y9GZs5jWYdT6CogDwdUOSO140i7Ynf7xGmTsGkANOKkuj4NQ38EVNsGguxkpJODNAYfDlUg/MjRmU11LgaH4SJvi/TaEjRomfHCYgZqJMjwwBLjO+x0yoxaQwvtftALVAkZBAgSfF3RIyG0kmOxWK8PCZkVnITvZ+UynFg==; _pxde=bedb6acb42f93362cad6983520ace76abaf2331b3cae8ff2d5166823a1bea548:eyJ0aW1lc3RhbXAiOjE2NzU3OTI3MjA2MjAsImZfa2IiOjB9; _dd_s=; _gat=1; OptanonConsent=isGpcEnabled=0&datestamp=Tue+Feb+07+2023+20%3A02%3A22+GMT%2B0200+(Israel+Standard+Time)&version=202211.2.0&isIABGlobal=false&hosts=&consentId=9f6ddd64-9794-485b-87b8-3358a4a81608&interactionCount=1&landingPath=https%3A%2F%2Fstockx.com%2F&groups=C0001%3A1%2CC0002%3A1%2CC0004%3A1%2CC0005%3A1%2CC0003%3A1`,
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


async function checkSneaker(shoe){

    const browser = await chromium.launch({ headless: false });  
    const page = await browser.newPage();
    
    await page.goto('https://stockx.com/search?s=' + generateLink(shoe['name']), { headers: customHeaders });

    const priceElem = await page.$('.chakra-text.css-nsvdd9');
    const price = await priceElem.textContent()
   
    await browser.close();    

    return price.substring(1)
}



function generateLink(string){
    let finalString = ""
    const splitByWord = string.split(" ")
    for(const word of splitByWord){
        finalString = finalString + word + '-'
    }
    return finalString.substring(0, finalString.length - 1)
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


module.exports = {
    checkSneaker : checkSneaker,
    generateLink : generateLink,
    randomInt : randomInt
}

if (require.main === module) {
    checkSneaker({"name":"Nike Pegasus Trail 3","price":"109.97"})
}







