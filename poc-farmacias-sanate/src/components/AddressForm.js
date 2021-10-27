import * as React from 'react';
import { Button, FormControl, TextField } from '@mui/material';

import getFirebase from '../firebase/configFirebase';

export default function AddressForm(params) {
    const defaultAddress = {
        userID: params.userData.uid,
        direccion: '',
        ciudad: '',
        estado: '',
        cp: ''
    }

    const [newAddress, setNewAddress] = React.useState(defaultAddress);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress({
            ...newAddress,
            [name]: value,
        });
        console.log(defaultAddress, '\n NewAddress', newAddress);
    };

    console.log(params.userData.uid);
    // console.log(defaultAddress);
    console.log(defaultAddress, '\nNewAddress', newAddress);

    return(
        <div>
            <FormControl>
                <TextField fullWidth required label='Dirección' variant='standard' />
                <TextField fullWidth required label='Ciudad' variant='standard' />
                <TextField fullWidth required label='Estado' variant='standard' />
                <TextField fullWidth required label='Código postal' variant='standard' type='number' />
            </FormControl>
        </div>
    )
}