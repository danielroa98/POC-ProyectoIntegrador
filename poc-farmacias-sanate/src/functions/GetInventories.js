// Custom Components
import getFirebase from "../firebase/configFirebase";

const firebase = getFirebase();
const db = firebase.firestore();
const tiendasCollection = db.collection('Tiendas');

const getInventory = async (userData) => {
    
    let inv = [];

    try {
        const snapshot = await tiendasCollection.where('client_id', '==', userData.uid).get()
        .then(docs => {
            docs.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                const data = doc.data();
                data.inventory.forEach(async entry => {
                    console.log(entry)
                    const product = await entry.product.get()
                    .then(medicamentos => {
                        console.log(medicamentos.data())
                        inv.push({
                            product: medicamentos.data(),
                            quantity: entry.quantity
                          });
                    })
                })
    
                console.log(inv)
                return inv;
    
              });
        })
        

        

      } catch (error) {
        console.log(error)
      }
      
}

export default getInventory;