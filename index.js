
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

    let arbitrage = []
    
    fs.readFile('./nike.json', (err, data) => {
        if (err){console.log(err)}

        let nikeJson = JSON.parse(data)
        
        stock.checkSneaker(nikeJson[107]).then(function(stockPrice) {
            console.log(stockPrice) 
            addShoe(nikeJson[107], stockPrice)
        }).catch(function(error) {
            console.log(error);
        });
       
    }) 

    fs.writeFileSync('deals.json', JSON.stringify(arbitrage)) 
}


function addShoe(shoe, stockPrice){
    if(isOppurtunity(shoe['price'], stockPrice)){
        const analysis = {
            'name' : shoe['name'],
            'nike_price' : '$' + shoe['price'],
            'stock_price' : '$' + stockPrice,
            'difference' : '$' + (Number(stockPrice) - Number(shoe['price']))
        }

        arbitrage.push(analysis)
    }

}

function isOppurtunity(nikePrice, stockPrice){
    if(Number(nikePrice) >= Number(stockPrice) * 1.3){
        return true
    }else{
        return false
    }
}


main()