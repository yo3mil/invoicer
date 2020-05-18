 //Export Collections
export const products = [];
export const customers = [];
export const history = [];
// export action functions
export {saveHistory, updateProduct, deleteProduct, saveProduct, updateCustomer, deleteCustomer, saveCustomer, deleteHistory}
//init function
export { getDatabase }
////////////////////////////////////////////////////////////////////////////////////////////////////

const productCollection = db.collection('products');
const customerCollection = db.collection('customers');
const historyCollection = db.collection('history');

function getDatabase() {
    checkForChanges(productCollection, products);
    checkForChanges(customerCollection, customers);
    checkForChanges(historyCollection, history);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//PRODUCT QUERIES
// Saving new product 
const saveProduct = (name, size, price, vat, code, category) => {
    productCollection.add({
        code: code,
        product: name,
        size: size,
        priceNoVat: price,
        vat: vat,
        category: category
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
const updateProduct = (id, newCode, newName, newSize, newPrice, newVat, newCategory) => {
    productCollection.doc(id).update({
        code: newCode,
        product: newName,
        size: newSize,
        priceNoVat: newPrice,
        vat: newVat,
        category: newCategory
    });
}
////////////////////////////////////////////////////////////////////////////////////////////////////
//CUSTOMER QUERIES
// Saving new product 
const saveCustomer = (newName, newContactName, newAddress, newDelivery , newPhone, newEmail) => {
    customerCollection.add({
        name: newName,
        contactName: newContactName,
        address: newAddress,
        deliveryAddress: newDelivery,
        phone: newPhone,
        email: newEmail
    })
}
// Deleting a product
const deleteCustomer = (id) => {
    
    customerCollection.doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
};
// Updating a product 
const updateCustomer = (id, newName, newContactName, newAddress, newDelivery , newPhone, newEmail) => {
    customerCollection.doc(id).update({
        name: newName,
        contactName: newContactName,
        address: newAddress,
        deliveryAddress: newDelivery,
        phone: newPhone,
        email: newEmail
    });
};
////////////////////////////////////////////////////////////////////////////////////////////////////
//HISTORY QUERIES

const saveHistory = (customer, products) => {
    historyCollection.add({
        customer: customer,
        products: products
    })
};
const deleteHistory = (id) => {
    historyCollection.doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
};

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
                if(output === products) {
                    newProduct.quantity = 1;
                }
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
                    for (var i = customers.length - 1; i >= 0; --i) {
                        if (customers[i].name == change.doc.data().name && customers[i].contactName == change.doc.data().contactName) {
                            customers.splice(i,1);
                        }
                    }
                } else if (output === history){
                    for (var i = history.length - 1; i >= 0; --i) {
                        if (history[i].customer.info.orderNumber == change.doc.data().customer.info.orderNumber && history[i].customer.info.orderDate == change.doc.data().customer.info.orderDate) {
                            history.splice(i,1);
                        }
                    }
                }
               
            }
        });
    }, function(error) {
        console.log("Listeners detached, no permmision");
    });

}


