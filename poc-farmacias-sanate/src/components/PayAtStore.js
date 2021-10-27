import * as React from 'react';
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Typography
} from '@mui/material';

export default function PayAtStore() {
    return(
        <div>
            <Typography variant='h5' component='div' gutterBottom>
                Acuda a su sucursal para realizar el pago con la forma deseada.
            </Typography>
            <Typography variant='subtitle1' component='div' gutterBottom>
                No se le olvide llevar su número de orden en caso que se tenga que validar el pedido. 
            </Typography>
        </div>
    )
}