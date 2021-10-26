import * as React from "react";
import Button from '@mui/material/Button';
import Navbar from '../../components/Navbar';

export default function Catalog(props) {
    // console.log(props.signOut);

    console.log('Loaded log out');
    return (
        <span>
            <Navbar/>
            <h1>Medicinas uwu</h1>
            <Button color='primary' href='/add_medicine' variant='contained'>Agregar Medicina</Button>{' '}
        </span>
    );
}
