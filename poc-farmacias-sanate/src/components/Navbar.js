import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { BrowserRouter as Router, Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        Farmacias Sanate
                    </Typography>
                    <Toolbar>
                        <Button color='warning' href='/' variant='contained'>Home</Button>
                        &nbsp;
                        <Button color='success' href='/catalog' variant='contained'>Catalogo</Button>
                        &nbsp;
                        <Button color='secondary' href='/checkout' variant='contained'>Checkout</Button>
                        {/* <Button variant='contained' color='error'>Logout 2</Button>{' '}
                        <Button variant='contained' color='error'>Logout 3</Button>{' '} */}
                    </Toolbar>
                    <Button variant='contained' color='error' href='/logout'>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
