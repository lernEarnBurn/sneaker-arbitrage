
const stock = require('./stockX.js')
const nike = require('./nike.js')
const fs = require('fs')


let arbitrage = []

async function main(){
    if(fileExists('nike.json')){
        console.log('Already have')
    }else{
        await nike.getNikeShoes()
    }

   

    if(fileExists('deals.json')){
        fs.unlink('deals.json', (err) => {
            if (err) throw err;
            console.log('File deleted successfully!');
          });
    }
    
    /* Now that i am keeping track of promises I may be able to use
       these to count all  browsers open and control the amount of them */
    let promises = []

    //code to choose how many browsers can open at once
    fs.readFile('./nike.json', (err, data) => {
        if (err){console.log(err)}

        let nikeJson = JSON.parse(data)

        for(let i = 0; i < nikeJson.length; i++){
            promises.push(stock.checkSneaker(nikeJson[i]).then(function(stockPrice) { 
                addShoe(nikeJson[i], stockPrice, arbitrage)
            }).catch(function(error) {
                console.log(error);
            }));
            
        }

        Promise.all(promises).then(() => {
            fs.writeFileSync('deals.json', JSON.stringify(arbitrage))
        })
         
    })
}


function addShoe(shoe, stockPrice, arbitrage){
    if(isOppurtunity(shoe['price'], stockPrice)){
        const analysis = {
            'name' : shoe['name'],
            'nike_price' : '$' + shoe['price'],
            'stock_price' : '$' + stockPrice,
            'difference' : `$${stockPrice - shoe['price']}`
        }

        arbitrage.push(analysis)
    }


}

function isOppurtunity(nikePrice, stockPrice){
    if(Number(nikePrice) >= Number(stockPrice) * 1.36){
        return true
    }else{
        return false
    }
}


function fileExists(file){
    try{
        fs.accessSync(file, fs.constants.F_OKs)
        return true
    }catch(err){
        return false
    }
}


if (require.main === module) {
    main() 
}

