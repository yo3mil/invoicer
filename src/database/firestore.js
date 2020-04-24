////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
//PRODUCT QUERIES
export const products = [];



const productColection = db.collection('test');



//fetching all and looking for product data changes 

productColection.onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
            //passes ID as a field and pushes every object into an array.
            let newProduct = change.doc.data();
            let newProductID = change.doc.id;
            newProduct.id = newProductID;
            products.push(newProduct);
            //console.log(products);
        }
        if (change.type === "modified") {
            // update array
            //console.log("Modified product: ", change.doc.data());
        }
        if (change.type === "removed") {
            // update array
            //console.log("Removed product: ", change.doc.data());
        }
    });
});

// saving new product to  

export const saveProduct = (name, size, price) => {
    productColection.add({
        code: 'D0005',
        product: name,
        size: size,
        priceNoVat: price,
        vat: "0"
    })
}

// Deleting a product

export const deleteProduct = (id) => {
    
    productColection.doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
};



