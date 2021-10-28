import * as React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography
} from '@mui/material';

import getFirebase from '../firebase/configFirebase';

export default function OrderCard(params) {

    const firebase = getFirebase();
    const [ordersInfo, setOrdersInfo] = React.useState([]);

    React.useEffect(() => {
        let clientOrders = [];
        let storeOrders = [];

        try {
            const db = firebase.firestore();
            const orderCollection = db.collection('Orders');

            const orderSnapshot = orderCollection.where('client_id', '==', params.userData.uid).get()
                .then(snapshot => {
                    snapshot.docs.forEach(order => {
                        let currentOrderID = order.id;
                        let ordObj ={ ...order.data(), ['id']: currentOrderID };

                        clientOrders.push(ordObj);
                        clientOrders.push(order.data());
                    })

                })

        } catch (error) {
            
        }
    }, []);

    return (
        <Box style={{ justifyContent: 'center', alignContent: 'center' }}>
            <Card style={{ width: '800px', alignContent: 'center', justifyContent: 'center' }}>
                {params.userData.admin ? (
                    <CardContent>
                        <Typography variant='h5'>Id de orden: </Typography>
                    </CardContent>
                ) : (
                    <CardContent>
                        <Typography>User Card</Typography>
                    </CardContent>
                )}
            </Card>
        </Box>
    )
}