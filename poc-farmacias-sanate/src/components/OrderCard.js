import * as React from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Typography
} from '@mui/material';

import getFirebase from '../firebase/configFirebase';

export default function OrderCard(params) {

    const firebase = getFirebase();
    const [ordersInfo, setOrdersInfo] = React.useState([]);
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        let clientOrders = [];

        const fetchData = async () => {


            try {
                const db = firebase.firestore();
                const orderCollection = db.collection('Orders');
                let orderSnapshot;

                if (params.userData.admin) {
                    console.log('I am an admin');
                    // Obtain data only when the current user is the store
                    orderSnapshot = orderCollection.where('tienda_id', '==', params.userData.uid).get()
                        .then(docs => {
                            docs.forEach(doc => {

                                console.log(doc.id, '=>', doc.data());
                                const orderData = doc.data();
                                console.log(orderData);

                                orderData.products.forEach(entry => {
                                    const product = entry.product.get()
                                        .then(medicamentos => {
                                            // console.log(medicamentos.data());

                                            setOrdersInfo(ordersInfo => [
                                                ...ordersInfo,
                                                orderData,
                                                /* {
                                                    "product": medicamentos.data(),
                                                    "quantity": entry.quantity
                                                } */]);

                                            console.log(ordersInfo);
                                        })
                                })
                            });
                        })
                } else if (!params.userData.admin) {
                    console.log('I am a client: ', params.userData.uid, ' <- that is my ID');
                    // Obtain data only when the current user is a client
                    orderSnapshot = orderCollection.where('client_id', '==', params.userData.uid).get()
                        .then(snapshot => {
                            snapshot.docs.forEach(order => {
                                let currentOrderID = order.id;
                                let ordObj = { ...order.data(), ['id']: currentOrderID };

                                clientOrders.push(ordObj);
                                clientOrders.push(order.data());
                            })

                        })

                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <Box style={{ justifyContent: 'center', alignContent: 'center' }}>
            {console.log(ordersInfo)}
            {loading ? (
                <Typography align='center' gutterBottom variant='subtitle1' >
                    Loading...
                </Typography>) : (
                <>
                    {params.userData.admin ? (
                        <>
                            {ordersInfo.map(e =>
                                <>
                                    <Card
                                        raised={true}
                                        style={{
                                            width: '1000px',
                                            alignContent: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <CardContent >
                                            {/* {console.log(e)} */}
                                            <Typography variant='h5'>
                                                Id de orden: <i>{e.id}</i>
                                            </Typography>
                                            <Grid container spacing={2}>
                                                <Grid item xs='auto'>
                                                    <Typography>ID del cliente: {e.client_id}</Typography>
                                                </Grid>
                                                <Grid item xs='auto'>
                                                    <Typography>ID de la tienda: {e.tienda_id}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={3}>
                                                <Grid item xs='auto'>
                                                    <Typography>Costo total: $ {e.cost}</Typography>
                                                </Grid>
                                                <Grid item xs='auto'>
                                                    <Typography>Forma de pago: {e.paymentType}</Typography>
                                                </Grid>
                                                <Grid item xs='auto'>
                                                    <Typography>Status: {e.status}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid>
                                                <Grid item xs='auto'>
                                                    <Typography>Productos: {e.products.product}</Typography>
                                                </Grid>
                                                <Grid item xs='auto'>
                                                    <Typography>Cantidad: {e.products.quantity}</Typography>
                                                </Grid>
                                                {/* {console.log(e.products[0])} */}
                                            </Grid>
                                            <Grid item alignItems='flex-end'>
                                                <Button>
                                                    Test
                                                </Button>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                    <br />
                                </>
                            )}
                        </>
                    ) : (
                        // TODO - implementar esta seccion.
                        <Card style={{
                            width: '800px',
                            alignContent: 'center',
                            justifyContent: 'center'
                        }}>
                            <CardContent>
                                <Typography>User Card</Typography>
                            </CardContent>
                        </Card>
                    )}
                </>
            )
            }
        </Box >
    )
}