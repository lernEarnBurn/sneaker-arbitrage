const sneaksApi = require('sneaks-api')

if (require.main === module){
    const sneaks = new sneaksApi();

    sneaks.getProducts("Nike Court Legacy Lift", 3, function(err, products){
        console.log(products)
    })
}