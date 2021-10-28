import React, {useState, useEffect} from "react";
// Firebase
import getFirebase from "../firebase/configFirebase";

//MUI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import { Divider } from "@mui/material";

export default function InventoryCards(props){
    
    const [inventario, setInventario] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const firebase = getFirebase();
    const db = firebase.firestore();
    const tiendasCollection = db.collection('Tiendas');


    useEffect(() => {

        const fetchData = async() => {
            let inv = [];
            try {
                const snapshot = tiendasCollection.where('client_id', '==', props.userData.uid).get()
                .then(docs => {
                    docs.forEach(doc => {
                        console.log(doc.id, '=>', doc.data());
                        const data = doc.data();
                        data.inventory.forEach(entry => {
                            console.log(entry)
                            const product = entry.product.get()
                            .then(medicamentos => {
                                console.log(medicamentos.data())
                                setInventario( inventario => [...inventario, {
                                    "product": medicamentos.data(),
                                    "quantity": entry.quantity
                                  }]);
                            })
                        })
                      });
                })

                //setInventario(inv)
                setLoading(false);
        
              } catch(err) {
                console.error(err);
            }

        };

        fetchData();

    }, []);

    console.log(inventario)

    return(
        <>
        {loading ? (<p>Loading...</p>) : 
        (
        <Box sx={{ display: 'flex',  flexWrap: 'wrap', justifyContent: 'center'}}>
        {inventario.map(entry => (
            <Card key={entry.product.Name} sx={{maxWidth: 325, margin: 1.5}}>
                <CardMedia
                    component="img"
                    image={entry.product.Img}
                    height="200"
                    sx={{objectFit: 'contain'}}
                />
                <Divider />
                <CardContent sx={{background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'}}>
                    <Typography gutterBottom variant="h5" component="div">
                    {entry.product.Name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Cantidad: {entry.quantity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Precio Base: {entry.product.Price}.00 MXN
                    </Typography>
                </CardContent>
            </Card>
        ))}
        </Box>)}
        
        </>
    )
}