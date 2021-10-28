import * as React from 'react';
import {
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

import getFirebase from '../firebase/configFirebase';

//Components
import Navbar from '../components/Navbar';

export default function Transfers(params) {
    const firebase = getFirebase();
    const db = firebase.firestore();
    const tiendasCollection = db.collection('Tiendas');

    const [loading, setLoading] = React.useState(true);

    const [allStores, setAllStores] = React.useState([]);
    const [selectedStore, setSelectedStore] = React.useState([]);
    const [storage, setStorage] = React.useState('');
    const [storeInventory, setStoreInventory] = React.useState([]);

    const handleChange = (e) => {
        setStorage(e.target.value);
        console.log(storage);
    };

    const requestProducts = (e) => {

        console.log(selectedStore);

        const productsReq = {
            tiendaSolicitante: params.userData.uid,
            tiendaOrigen: storage,
        };

        console.log(productsReq);
    };

    React.useEffect(() => {
        console.log('Current store is ', storage);

        const fetchData = async () => {
            try {
                const snapshot = tiendasCollection.where('name', '==', storage).get()
                    .then(docs => {
                        docs.forEach(doc => {
                            const storeData = doc.data();
                            console.log(storeData);
                            setSelectedStore(selectedStore => [
                                storeData
                            ]);

                            // Check the store's inventory

                            storeData.inventory.forEach(entry => {
                                console.log(entry);

                                const product = entry.product.get()
                                    .then(meds => {
                                        console.log(meds.data());

                                        setStoreInventory(storeInventory => [
                                            ...storeInventory, {
                                                "product": meds.data(),
                                                "quantity": entry.quantity
                                            }]);
                                    });
                            });
                        });
                    });
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
        console.log(selectedStore);

    }, [storage]);

    React.useEffect(() => {

        const fetchStores = async () => {
            try {
                const snapshot = tiendasCollection.get()
                    .then(docs => {
                        docs.forEach(doc => {
                            const storesData = doc.data();
                            console.log(storesData);
                            setAllStores(
                                allStores => [
                                    ...allStores,
                                    storesData
                                ]);
                        });
                    });
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        fetchStores();

    }, [])

    return (
        <span>
            <Navbar userData={params.userData} />
            <Typography component='div' variant='h4' gutterBottom style={{ textAlign: 'center', }} >Transferencias</Typography>
            <Container>
                <Typography component='div' variant='h5' gutterBottom style={{ textAlign: 'center', }} >Escoge la tienda o almacén</Typography>
                <br />
                <Grid container spacing={2} direction='column' alignItems='center' >
                    {loading ? (<Typography align='center' gutterBottom variant='subtitle1' >
                        Loading...
                    </Typography>) : (
                        <>
                            <FormControl style={{ minWidth: 400, }}>
                                <InputLabel>Tienda/Almacén</InputLabel>
                                <Select onChange={handleChange} value={storage} label='Tienda/Almacén'>
                                    {allStores.map(store => (
                                        <MenuItem key={store.name} value={store.name} >{store.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Typography>Productos de {storage}</Typography>
                        </>
                    )}
                    <Table aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                {/* <TableCell align='center'>Tienda/Almacén</TableCell> */}
                                <TableCell align='center'>Producto</TableCell>
                                <TableCell align='center'>Cantidad</TableCell>
                                <TableCell align='center'>Opciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {storeInventory.map(info =>
                                <TableRow>
                                   {/*  <TableCell>
                                        {info.name}
                                    </TableCell> */}
                                    <TableCell>
                                        {info.product.name}
                                    </TableCell>
                                    <TableCell>
                                        {info.quantity}
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Button color='primary' size='small'>Solicitar</Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Grid>
                <br />
                <Grid container spacing={2} direction='column' alignItems='center'>
                    <Button color='success' onClick={() => {
                        requestProducts();
                    }} variant='contained'>Terminar</Button>
                </Grid>
            </Container>
        </span>
    )
}