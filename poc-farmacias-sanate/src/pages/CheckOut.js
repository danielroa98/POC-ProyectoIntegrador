import * as React from 'react';
import { 
    Button, 
    ButtonGroup, 
    Card, 
    CardContent, 
    Grid, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow,
    Typography 
} from '@mui/material';

import './CheckOut.css'

import getFirebase from '../firebase/configFirebase';

//Components
import AddressForm from '../components/AddressForm';
import Navbar from '../components/Navbar';
import PayAtHomeForm from '../components/PayAtHomeForm';
import PayAtStore from '../components/PayAtStore';
import ReactCreditCard from '../components/ReactCreditCard';

import { CarritoContext } from '../contexts/Carrito';

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
    const [loading, setLoading] = React.useState(true);

    const [carrito, setCarrito] = React.useContext(CarritoContext)

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
        console.log(carrito)
        const fetchData = async() => {

            try {
                const snapshot = addressColl.where('client_id', '==', currentUserID).get()
                    .then(docs => {
                        docs.forEach(doc => {
                            const data = doc.data();
                            console.log(data);
                            setAddressTest(addressTest =>[...addressTest, data] );
                            console.log(addressTest);
                        })
                    });

                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
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
                                {loading ? (<p>Loading...</p>) : (
                                    <CardContent>
                                    <Table aria-label='simple table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Dirección</TableCell>
                                                <TableCell>Opciones</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {addressTest.map(e =>
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
                                )}
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
                            {carrito.map((entry) => (
                                <Card>
                                    <CardContent>
                                        <Typography>{entry.product.Name}</Typography>
                                        <Typography>Cantidad: {entry.cantidad}</Typography>
                                        <Typography>Precio: {entry.product.Price} MXN</Typography>
                                    </CardContent>
                                </Card>
                            )

                            )}
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