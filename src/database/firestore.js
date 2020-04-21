
const products = [];


function createProducts() {
    db.collection('products').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
         products.push(doc.data()) 
        })
    })
}
createProducts();

export default products;