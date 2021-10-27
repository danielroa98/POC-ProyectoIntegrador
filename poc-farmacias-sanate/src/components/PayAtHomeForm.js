import * as React from 'react';
import { 
    FormControl, 
    FormControlLabel, 
    FormLabel,
    Radio, 
    RadioGroup 
} from '@mui/material';

export default function PayAtHomeForm() {
    return (
        <div>
            <FormControl component='fieldset'>
                <FormLabel component='legend'>Escoja su forma de pago</FormLabel>
                <RadioGroup row aria-label='forma-de-pago' name='row-radio-buttons-group'>
                    <FormControlLabel value='efectivo' control={<Radio />} label='Efectivo' />
                    <FormControlLabel value='tarjeta' control={<Radio />} label='Tarjeta' />
                </RadioGroup>
            </FormControl>
        </div>
    )
}