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
                                    <Link to="/">
                                    <Button color='warning' variant='contained'>Home</Button>
                                    </Link>
                                    &nbsp;
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
                        <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
                            <Toolbar>
                                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                                    Farmacias Sanate (Usuario)
                                </Typography>
                                <Toolbar>
                                    <Link to="/">
                                    <Button color='warning' variant='contained'>Home</Button>
                                    </Link>
                                    &nbsp;
                                    <Link to="/checkout">
                                    <Button color='secondary' variant='contained'>Checkout</Button>
                                    </Link>
                                    &nbsp;
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
