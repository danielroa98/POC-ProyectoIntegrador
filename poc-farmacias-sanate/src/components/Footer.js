import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { BrowserRouter as Router, Link } from 'react-router-dom';

export default function Footer(style) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Typography 
                    variant="body1" 
                    gutterBottom
                    >Propiedad de bla bla bla, terminos y condiciones, bla bla</Typography>
            </AppBar>
        </Box>
    );
}