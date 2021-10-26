import React from 'react';
import { Button, Card, CardContent, Grid } from '@mui/material';

import './CheckOut.css'

//Components
import Navbar from '../components/Navbar';

export default function CheckOut() {
    return (
        <span>
            <Navbar />
            <h1>Check Out</h1>
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <Card
                        raised={true}
                    >
                        <CardContent>
                            <h2>Address</h2>
                        </CardContent>
                    </Card>
                    <br />
                    <Card
                        raised={true}
                    >
                        <CardContent>
                            <h2>Form of payment</h2>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card
                        raised={true}
                    >
                        <CardContent>
                            <h2>My order</h2>
                        </CardContent>
                    </Card>
                    <div className='accept-checkout'>
                        <Button
                            color='success'
                            variant='contained'
                        >
                            Accept
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </span>
    )
}