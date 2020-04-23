
export const products = [];


function createProducts() {
    db.collection('test').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
         products.push(doc.data()) 
        })
    })
}
createProducts();

// saving data to firestore 

export const saveProduct = function(name, size, price) {
    db.collection('test').add({
        code: 'D0005',
        product: name,
        size: size,
        priceNoVat: price,
        vat: "0"
    })
}



// dummy data
// const products = [
//     {
//         category:"Drinks - Soft Drinks",
//         code:"D000001",
//         product:"Calpis Water (Bottle)",
//         size:"24 x 500ml",
//         priceNoVat:"25",
//         vat:"5",
//         priceVat:"30",
//         updated:"08/01/2019"
//     },
//     {
//         category:"Drinks - Soft Drinks",
//         code:"D000001",
//         product:"Calpis Water (Bottle)",
//         size:"24 x 500ml",
//         priceNoVat:"25",
//         vat:"5",
//         priceVat:"30",
//         updated:"08/01/2019"
//     },
//     {
//         category:"Drinks - Soft Drinks",
//         code:"D000001",
//         product:"Calpis Water (Bottle)",
//         size:"24 x 500ml",
//         priceNoVat:"25",
//         vat:"5",
//         priceVat:"30",
//         updated:"08/01/2019"
//     },
//     {
//         category:"Drinks - Soft Drinks",
//         code:"D000001",
//         product:"Calpis Water (Bottle)",
//         size:"24 x 500ml",
//         priceNoVat:"25",
//         vat:"5",
//         priceVat:"30",
//         updated:"08/01/2019"
//     },
//     {
//         category:"Drinks - Soft Drinks",
//         code:"D000001",
//         product:"Calpis Water (Bottle)",
//         size:"24 x 500ml",
//         priceNoVat:"25",
//         vat:"5",
//         priceVat:"30",
//         updated:"08/01/2019"
//     },
//     {
//         category:"Drinks - Soft Drinks",
//         code:"D000001",
//         product:"Calpis Water (Bottle)",
//         size:"24 x 500ml",
//         priceNoVat:"25",
//         vat:"5",
//         priceVat:"30",
//         updated:"08/01/2019"
//     },
//     {
//         category:"Drinks - Soft Drinks",
//         code:"D000001",
//         product:"Calpis Water (Bottle)",
//         size:"24 x 500ml",
//         priceNoVat:"25",
//         vat:"5",
//         priceVat:"30",
//         updated:"08/01/2019"
//     }
// ]


