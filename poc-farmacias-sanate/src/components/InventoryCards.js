import React, {useState, useEffect} from "react";
// Firebase
import getFirebase from "../firebase/configFirebase";

//MUI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";

export default function InventoryCards(props){
    
    console.log(props.inventario)

    useEffect(() => {
        
    },[props.inventario])

    return(
        <>
        <Box>
        {props.inventario.map((entry) =>(
            <Card key={entry.product.Name} sx={{maxWidth: 345}}>
                <CardMedia
                    component="img"
                    image={entry.product.Img}
                    height="200"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {entry.product.Name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Cantidad: {entry.quantity}
                    </Typography>
                </CardContent>
            </Card>
        ))}
        </Box>
        </>
    )
}