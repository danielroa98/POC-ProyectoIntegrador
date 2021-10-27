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

export default function Navbar() {
    
    const firebase = getFirebase();
    const [name, setName] = React.useState('');
    const [id, setId] = React.useState('');
    const [admin, setAdmin] = React.useState(Boolean);

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User logged in already or has just logged in.
          console.log(user);
          setName(user.displayName);
          setId(user.uid);
          setAdmin(id === 'wuqxWFjxfZU0Qapp1rsYSW9YPj92');
        } else {
          // User not logged in or has just logged out.
        }
      });

    return (
        <>
        {admin ? 
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
                        {/* <Button variant='contained' color='error'>Logout 2</Button>{' '}
                        <Button variant='contained' color='error'>Logout 3</Button>{' '} */}
                    </Toolbar>
                    
                    <Button variant='contained' color='error' href='/logout'>Logout</Button>
                    <Button variant='contained' color='secondary' sx={{margin:2}}>{name}</Button>

                </Toolbar>
            </AppBar>
        </Box>)
        :
        (
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        Farmacias Sanate (Tienda)
                    </Typography>
                    <Toolbar>
                        <Button color='warning' href='/' variant='contained'>Home</Button>
                        &nbsp;
                        <Button color='warning' href='/' variant='contained'>Transferir</Button>
                        <Button variant='contained' color='secondary' sx={{margin:2}}>Re-Stock</Button>
                        {/* <Button variant='contained' color='error'>Logout 2</Button>{' '}
                        <Button variant='contained' color='error'>Logout 3</Button>{' '} */}
                    </Toolbar>
                    
                    <Button variant='contained' color='error' href='/logout'>Logout</Button>
                    <Button variant='contained' color='secondary' sx={{margin:2}}>{name}</Button>

                </Toolbar>
            </AppBar>
        </Box>)}
        </>
    );
}
