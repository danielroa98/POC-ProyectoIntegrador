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

export default function Home(params) {
    const classes = useStyles();
    return(
        <span>
            <Navbar />
            <Container className={classes.homeContainer}>
            <h1>Bienvenido a las Farmacias Sanate</h1>
            <p>Las mejores farmacias de la Republica</p>
            </Container>
            <Divider sx={{margin: 3}} />
            <Box className={classes.recentContainer}>
                <Card className={classes.recentCard}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Ejemplo
                    </Typography>
                </CardContent>
                </Card>

                <Card className={classes.recentCard}> 
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Ejemplo
                    </Typography>
                </CardContent>
                </Card>

                <Card className={classes.recentCard}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Ejemplo
                    </Typography>
                </CardContent>
                </Card>

                <Card className={classes.recentCard}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Ejemplo
                    </Typography>
                </CardContent>
                </Card>
                <Card className={classes.recentCard}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Ejemplo
                    </Typography>
                </CardContent>
                </Card>
            </Box>
            <Divider sx={{margin: 3}} />
        </span>
    )
}