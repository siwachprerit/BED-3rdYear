let p = new Promise((resolve, reject) => {
    resolve("wada pura kiya")
})
//console.log(p);

p.then((data) => {
    console.log(data)
})
.catch((err) => {
    console.log(err)
})



let product =[{
    name: "Samsung Galaxy S23",
    amount: 79999,
    quantity: 10,
},
{
    name: "Apple iPhone 14",
    amount: 99999,
    quantity: 5,
},
{
    name: "OnePlus 11",
    amount: 56999,
    quantity: 8,
},
{
    name: "Google Pixel 7",
    amount: 59999,
    quantity: 0,
}];
function buyProduct(product_Name){
    return new Promise((resolve, reject) => {
        //do some async function
        let isProduct = product.filter((p) => p.name === product_Name)[0];
        if (!isProduct) {
            return reject("Product not available");
        }
        resolve(isProduct.amount);
    });
}

let availableAmount = 100000;
function deductAmount(amount,cb){
    if(availableAmount < amount){
        return cb("Insufficient balance",null);
    }
    else{
        availableAmount -= amount;
        cb(null,"amount deducted");

    }

}

buyProduct("OnePlus 11").then((amount) => {
    console.log(amount)
})
.catch((err) => {
    console.log(err);
})