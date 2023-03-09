
const stock = require('./stockX.js')
const nike = require('./nike.js')
const fs = require('fs')

function fileExists(file){
    try{
        fs.accessSync(file, fs.constants.F_OK)
        return true
    }catch(err){
        return false
    }
}


async function main(){
    if(fileExists('nike.json')){
        console.log('Already have')
    }else{
        await nike.getNikeShoes()
    }
    
    
    fs.readFile('./nike.json', (err, data) => {
        if (err){console.log(err)}

        let nikeJson = JSON.parse(data)
        
        //need to fix the checkSneaker script
        stock.checkSneaker(nikeJson[1]).then(function(stockPrice) {
            console.log(stockPrice) 
        }).catch(function(error) {
            console.log(error);
        });
       
    }) 
    
}


main()




/*
let arbitrage = []

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



function isOppurtunity(nikePrice, stockPrice){
    if(Number(nikePrice) >= Number(stockPrice) * 1.3){
        return true
    }else{
        return false
    }
}
*/