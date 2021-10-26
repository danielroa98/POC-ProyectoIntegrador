import * as React from "react";
import {
    Button,
    Paper,
    Box,
    Typography,
    Divider,
    TextField

} from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";

import { useStyles } from "./styles";

export default function AddMedicine(props) {
    const styles = useStyles();

    return (
        <span>
            <Navbar/>
            <Box className={styles.paperContainer}>
            <Paper className={styles.paperForm}>

                <Box className={styles.formContainer}>
                    <Typography variant="h4">Agregar Medicamento</Typography>
                    <Divider />
                    <TextField
                        required
                        id="product_name"
                        label="Nombre"
                        defaultValue="Nombre del Medicamento..."
                        />
                </Box>
            </Paper>
            </Box>
            <Box className={styles.paperContainer}>
                <Button color='primary' href='/add_medicine' variant='contained'>Submit</Button>{' '}
            </Box>
        </span>
    );
}
