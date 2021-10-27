import * as React from "react";
import {
    Button,
    Paper,
    Box,
    Typography,
    Divider,
    InputLabel,
    InputAdornment,
    FormControl,
    OutlinedInput

} from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";

import { useStyles } from "./styles";

export default function AddMedicine(props) {
    const styles = useStyles();

    const [values, setValues] = React.useState({
        product_price: '',
        product_name: '',
        product_id: '',
        
      });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(event.target.value);
      };

    return (
        <span>
            <Navbar/>
            <Box className={styles.paperContainer}>
            <Paper className={styles.paperForm}>

                <Box className={styles.formContainer}>
                    <Typography variant="h4">Agregar Medicamento</Typography>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="name">Nombre del Medicamento</InputLabel>
                        <OutlinedInput
                            id="name"
                            value={values.product_name}
                            onChange={handleChange('product_name')}
                            label="Nombre del Medicamente"
                            size='small'
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="price">Precio Base</InputLabel>
                        <OutlinedInput
                            id="price"
                            value={values.product_price}
                            onChange={handleChange('product_price')}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Precio Base"
                            size='small'
                        />
                    </FormControl>
                </Box>
            </Paper>
            </Box>
            <Box className={styles.paperContainer}>
                <Button color='primary' href='/add_medicine' variant='contained'>Submit</Button>{' '}
            </Box>
        </span>
    );
}
