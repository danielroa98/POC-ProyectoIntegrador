import * as React from "react";
import Button from '@mui/material/Button';

export default function Logout(props) {
    // console.log(props.signOut);

    console.log('Loaded log out');
    return (
        <span>
            <h1>¿Quieres salir de tu cuenta?</h1>
            <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={props.signOut}
                color='error'
            >
                Logout
            </Button>
            <Button
                fullWidth
                variant='contained'
                color='primary'
                href='/'
            >
                Regresar a home
            </Button>
        </span>
    );
}
