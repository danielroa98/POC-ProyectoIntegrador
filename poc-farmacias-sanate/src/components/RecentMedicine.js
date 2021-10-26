import React from "react";
import { Card,
         CardContent,
         Typography,
         Box
 } from  "@mui/material";

import { useStyles } from "../pages/Home/styles";

export default function RecentMedicines() {
    
    const classes = useStyles();
    
    return(
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
    );
}