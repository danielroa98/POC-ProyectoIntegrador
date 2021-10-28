import * as React from 'react';
import { Button, ButtonGroup, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import './CheckOut.css'

import getFirebase from '../firebase/configFirebase';

//Components
import AddressForm from '../components/AddressForm';
import Navbar from '../components/Navbar';
import PayAtHomeForm from '../components/PayAtHomeForm';
import PayAtStore from '../components/PayAtStore';
import ReactCreditCard from '../components/ReactCreditCard';

export default function CheckOut(params) {
    const firebase = getFirebase();
    const db = firebase.firestore();
    const addressColl = db.collection('Addresses');

    const currentUserID = params.userData.uid;

    const [showCard, setShowCard] = React.useState(false);
    const [showHome, setShowHome] = React.useState(false);
    const [showStore, setShowStore] = React.useState(false);

    const [addressInfo, setAddressInfo] = React.useState([]);
    const [addressTest, setAddressTest] = React.useState([]);

    const [order, setOrder] = React.useState({
        client_id: currentUserID,
        clientAddress: '',
        status: '',
        totalCost: '',
        paymentType: '',
        products: [],
    });


    const selectAddress = (e) => {
        // console.log(e);
        let fullAddress = {
            Street: e.Street,
            City: e.City,
            State: e.State,
            PostalCode: e.PostalCode
        }

        setOrder({
            ...order,
            fullAddress: fullAddress,
        })

        console.log(order);
    }

    React.useEffect(() => {

        const fetchData = async() => {
            let userAddresses = [];

            try {
                const snapshot = addressColl.where('client_id', '==', currentUserID).get()
                    .then(docs => {
                        docs.forEach(doc => {
                            const data = doc.data();
                            console.log(data);
                            setAddressTest(data);
                            console.log(addressTest);
                        })
                    })
            } catch (error) {
                
            }
        }

        let userAddresses = [];

        try {
            

            const addressSnapshot = addressColl.where('client_id', '==', params.userData.uid).get()
                .then(snapshot => {
                    snapshot.docs.forEach(address => {
                        let currentAddressID = address.id;
                        let addrObj = { ...address.data(), ['id']: currentAddressID }

                        userAddresses.push(addrObj);
                        userAddresses.push(address.data());

                        console.log(userAddresses);
                    })
                    setAddressInfo(userAddresses);
                });

        } catch (error) {
            console.log(error);
        }
        // getUserAddresses();
        fetchData();
    }, [params])

    return (
        <span>
            <Navbar userData={params.userData} />
            <h1>Check Out</h1>
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <Card
                        raised={true}
                    >
                        <CardContent>
                            <h2>Nueva Dirección</h2>
                            <AddressForm userData={params.userData} />
                            <h2>Direcciones existentes</h2>
                            <Card style={{
                                border: 'none',
                                boxShadow: 'none'
                            }}>
                                <CardContent>
                                    <Table aria-label='simple table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Dirección</TableCell>
                                                <TableCell>Opciones</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {addressInfo.map(e =>
                                                <TableRow>
                                                    <TableCell>
                                                        {e.Street}, {e.City}, {e.State}, {e.PostalCode}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button onClick={() => {
                                                            selectAddress(e);
                                                        }} variant='contained'>
                                                            Enviar aquí
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                    <br />
                    <Card
                        raised={true}
                    >
                        <CardContent>
                            <h2>Escoja su método de pago</h2>
                            <Button variant='contained' onClick={() => {
                                setShowCard(prev => !prev);
                                setShowHome(false);
                                setShowStore(false);
                            }}>
                                Tarjeta
                            </Button> &nbsp;
                            <Button variant='contained' onClick={() => {
                                setShowHome(prev => !prev);
                                setShowCard(false);
                                setShowStore(false)
                            }}>
                                Pagar en casa
                            </Button>&nbsp;
                            <Button variant='contained' onClick={() => {
                                setShowStore(prev => !prev);
                                setShowCard(false);
                                setShowHome(false);
                            }}>
                                Pagar en sucursal
                            </Button>&nbsp;
                            {showCard && <ReactCreditCard />}
                            {showHome && <PayAtHomeForm />}
                            {showStore && <PayAtStore />}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card
                        style={{
                            border: 'none',
                            boxShadow: 'none'
                        }}
                    >
                        <CardContent>
                            <h2>Mi pedido</h2>
                        </CardContent>
                    </Card>
                    <div className='accept-checkout'>
                        <Button
                            color='success'
                            variant='contained'
                        >
                            Realizar pedido
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </span>
    )
}