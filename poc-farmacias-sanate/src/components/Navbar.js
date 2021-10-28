import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Popper } from '@material-ui/core';

import getFirebase from '../firebase/configFirebase';

import { BrowserRouter as Router, Link } from 'react-router-dom';

export default function Navbar(params) {

    return (
        <>
            {params.userData.admin ?
                (
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }} >
                            <Toolbar >
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bolder' }}>
                                    Farmacias Sanate (Tienda {params.userData.displayName})
                                </Typography>
                                <Toolbar>
                                    <Button color='warning' href='/' variant='contained'>Home</Button>
                                    &nbsp;
                                    <Button color='warning' href='/transferencias' variant='contained'>Transferir</Button>
                                    <Button variant='contained' href='/my-orders' color='secondary' sx={{ margin: 2 }}>Mis Ordenes</Button>
                                </Toolbar>
                                <Button variant='contained' color='secondary' sx={{ margin: 2 }}>{params.userData.displayName}</Button>
                                <Button variant='contained' color='error' href='/logout'>Logout</Button>
                            </Toolbar>
                        </AppBar>
                    </Box>
                )
                :
                (
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                                    Farmacias Sanate (Usuario)
                                </Typography>
                                <Toolbar>
                                    <Button color='warning' href='/' variant='contained'>Home</Button>
                                    &nbsp;
                                    <Button color='secondary' href='/checkout' variant='contained'>Checkout</Button>
                                    &nbsp;
                                    <Button color='secondary' href='/my-orders' variant='contained'>Mis Ordenes</Button>
                                </Toolbar>

                                <Button variant='contained' color='secondary' sx={{ margin: 2 }}>{params.userData.displayName}</Button>
                                <Button variant='contained' color='error' href='/logout'>Logout</Button>

                            </Toolbar>
                        </AppBar>
                    </Box>

                )}
        </>
    );
}
