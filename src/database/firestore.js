import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase
export const db = firebase.initializeApp({
    apiKey: "AIzaSyAUhex5r079Zvcb9aVb8yXSKpxUgexoNoc",
    authDomain: "orientalmart-a0ffd.firebaseapp.com",
    databaseURL: "https://orientalmart-a0ffd.firebaseio.com",
    projectId: "orientalmart-a0ffd",
    storageBucket: "orientalmart-a0ffd.appspot.com",
    messagingSenderId: "785374799937",
    appId: "1:785374799937:web:84ea0759969e11c420bec0"
}).firestore();


// export action functions
export {saveHistory, updateProduct, deleteProduct, saveProduct, updateCustomer, deleteCustomer, saveCustomer, deleteHistory}

////////////////////////////////////////////////////////////////////////////////////////////////////
//use test , test1 for testing


export const productCollection = db.collection('test');
export const customerCollection = db.collection('test2');
export const historyCollection = db.collection('history');
export const auth = firebase.auth();


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


