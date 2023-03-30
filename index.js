
const stock = require('./scripts/stockX.js')
const nike = require('./scripts/nike.js')
const fs = require('fs')


let arbitrage = []

async function main(){
    if(fileExists('./json/nike.json')){
        console.log('Already have')
    }else{
        await nike.getNikeShoes()
    }

   

    if(fileExists('./json/deals.json')){
        fs.unlink('./json/deals.json', (err) => {
            if (err) throw err;
            console.log('File deleted successfully!');
          });
    }
    
    
    let promises = []

    
    fs.readFile('./json/nike.json', (err, data) => {
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
            fs.writeFileSync('./json/deals.json', JSON.stringify(arbitrage))
        })
         
    })
}


function addShoe(shoe, stockPrice, arbitrage){
    if(isOppurtunity(shoe['price'], stockPrice)){
        const analysis = {
            'name' : shoe['name'],
            'nike_price' : '$' + shoe['price'],
            'stock_price' : '$' + stockPrice,
            'difference' : `$${shoe['price'] - stockPrice}`
        }


        //low priority
        //some code at end to organize arbitrage objects in highest to lowest difference
        arbitrage.push(analysis)



    }


}

function isOppurtunity(nikePrice, stockPrice){
    if(Number(stockPrice) - Number(nikePrice) >= 45){
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

