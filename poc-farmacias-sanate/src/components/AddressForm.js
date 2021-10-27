import * as React from 'react';
import { Button, FormControl, Grid, TextField } from '@mui/material';

import getFirebase from '../firebase/configFirebase';

export default function AddressForm(params) {

    const [address, setAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [postalCode, setpostalCode] = React.useState('');

    const handleSubmit = e => {
        e.preventDefault();

        const firebase = getFirebase();
        const db = firebase.firestore();
        const addressCollection = db.collection('Addresses');
        const clientCollection = db.collection('Client');
        const clientReference = clientCollection.doc(params.userData.uid);
     
        try {

            const newAddress = {
                client_id: params.userData.uid,
                Street: address,
                City: city,
                State: state,
                PostalCode: postalCode
            };

            const res = addressCollection.add(newAddress);

            console.log('Added doc correctly');
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(params.userData.uid);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid>
                    <Grid item xs={10}>
                        <TextField fullWidth required label='Dirección' variant='standard' onChange={e => setAddress(e.target.value)} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth required label='Ciudad' variant='standard' onChange={e => setCity(e.target.value)} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth required label='Estado' variant='standard' onChange={e => setState(e.target.value)} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth required label='Código postal' variant='standard' type='number' onChange={e => setpostalCode(e.target.value)} />
                    </Grid>
                </Grid>
                <br />
                <Button type='submit' variant='contained' color='success'>Añadir dirección</Button>
            </form>
        </div>
    )
}