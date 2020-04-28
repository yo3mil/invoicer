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
            for (var i = products.length - 1; i >= 0; --i) {
                if (products[i].id == change.doc.id ) {
                    // removes old one
                    products.splice(i,1);
                    // and updates with new one plus id
                    let newProduct = change.doc.data();
                    let newProductID = change.doc.id;
                    newProduct.id = newProductID;
                    products.push(newProduct);
                }
            }
            //console.log("Modified product: ", change.doc.data());
        }
        if (change.type === "removed") {
            // update array (remove product that was removed from the database)
            for (var i = products.length - 1; i >= 0; --i) {
                if (products[i].product == change.doc.data().product && products[i].code == change.doc.data().code) {
                    products.splice(i,1);
                }
            }
        }
    });
});

// Saving new product 

export const saveProduct = (name, size, price, vat) => {
    productColection.add({
        code: 'D0005',
        product: name,
        size: size,
        priceNoVat: price,
        vat: vat
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

// Updating a product 

export const updateProduct = (id, newCode, newName, newSize, newPrice, newVat) => {
    productColection.doc(id).update({
        code: newCode,
        product: newName,
        size: newSize,
        priceNoVat: newPrice,
        vat: newVat
    });
    
}


