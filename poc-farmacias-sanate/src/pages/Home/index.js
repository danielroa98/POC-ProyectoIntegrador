import React from "react";
import { Container,
         Divider,
         Card,
         CardContent,
         Typography,
         Box
 } from  "@mui/material";
import { Link } from 'react-router-dom';

import { useStyles } from "./styles";

//Components
import Navbar from "../../components/Navbar";
import RecentMedicines from "../../components/RecentMedicine";
import Footer from "../../components/Footer";

export default function Home(params) {
    const classes = useStyles();
    return(
        <span>
            <Navbar />
            <Container className={classes.homeContainer}>
            <h1>Bienvenido a las Farmacias Sanate</h1>
            <p>Las mejores farmacias de la Republica</p>
            </Container>
            <Divider sx={{margin: 3}}>
                <Typography variant="h4">Medicinas mas populares</Typography>
            </Divider>
                <RecentMedicines/>
                <Divider sx={{margin: 3}}>
                <Typography variant="h4">Farmacias cerca de ti</Typography>
            </Divider>
                <Box className={classes.mapContainer}>
                    <img src={'https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg'} className={classes.mapImg}/>
                </Box>
                <Divider sx={{margin: 3}}/>
            <Footer style={classes.footer} />
        </span>
    )
}