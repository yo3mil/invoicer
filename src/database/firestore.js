//Export Collections
export const products = [];
export const customers = [];
// export functions
export {updateProduct, deleteProduct, saveProduct, updateCustomer, deleteCustomer, saveCustomer}

////////////////////////////////////////////////////////////////////////////////////////////////////

const productCollection = db.collection('test');
const customerCollection = db.collection('customers');

//checkForChanges(productCollection, products);
checkForChanges(customerCollection, customers);
////////////////////////////////////////////////////////////////////////////////////////////////////
//PRODUCT QUERIES
// Saving new product 
const saveProduct = (name, size, price, vat) => {
    productCollection.add({
        code: 'D0005',
        product: name,
        size: size,
        priceNoVat: price,
        vat: vat
    })
}
// Deleting a product
const deleteProduct = (id) => {
    
    productCollection.doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
};
// Updating a product 
const updateProduct = (id, newCode, newName, newSize, newPrice, newVat) => {
    productCollection.doc(id).update({
        code: newCode,
        product: newName,
        size: newSize,
        priceNoVat: newPrice,
        vat: newVat
    });
}
////////////////////////////////////////////////////////////////////////////////////////////////////
//CUSTOMER QUERIES
// Saving new product 
const saveCustomer = (name, size, price, vat) => {
    productCollection.add({
        code: 'D0005',
        product: name,
        size: size,
        priceNoVat: price,
        vat: vat
    })
}
// Deleting a product
const deleteCustomer = (id) => {
    
    productCollection.doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
};
// Updating a product 
const updateCustomer = (id, newCode, newName, newSize, newPrice, newVat) => {
    productCollection.doc(id).update({
        code: newCode,
        product: newName,
        size: newSize,
        priceNoVat: newPrice,
        vat: newVat
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
//Function that looks for changes in db and uppdates arrays acordingly 

function checkForChanges(input, output) {
    input.onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
                //passes ID as a field and pushes every object into an array.
                let newProduct = change.doc.data();
                let newProductID = change.doc.id;
                newProduct.id = newProductID;
                output.push(newProduct);
                
                //console.log("added product: ", change.doc.data());
            }
            if (change.type === "modified") {
                for (var i = output.length - 1; i >= 0; --i) {
                    if (output[i].id == change.doc.id ) {
                        // removes old one
                        output.splice(i,1);
                        // and updates with new one plus id
                        let newProduct = change.doc.data();
                        let newProductID = change.doc.id;
                        newProduct.id = newProductID;
                        output.push(newProduct);
                    }
                }
                //console.log("Modified product: ", change.doc.data());
            }
            if (change.type === "removed") {
                // update array (remove product that was removed from the database)
                if(output === products){
                    for (var i = products.length - 1; i >= 0; --i) {
                        if (products[i].product == change.doc.data().product && products[i].code == change.doc.data().code) {
                            products.splice(i,1);
                        }
                    }
                    //console.log('removed from the array')
                } else if (output === customers){
                    for (var i = products.length - 1; i >= 0; --i) {
                        if (products[i].product == change.doc.data().product && products[i].code == change.doc.data().code) {
                            products.splice(i,1);
                        }
                    }
                }
               
            }
        });
    });
}


