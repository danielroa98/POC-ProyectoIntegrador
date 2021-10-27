import * as React from 'react';
import { Button, ButtonGroup, Card, CardContent, Grid } from '@mui/material';

import './CheckOut.css'

//Components
import AddressForm from '../components/AddressForm';
import Navbar from '../components/Navbar';
import PayAtHomeForm from '../components/PayAtHomeForm';
import PayAtStore from '../components/PayAtStore';
import ReactCreditCard from '../components/ReactCreditCard';

export default function CheckOut(params) {
    const [showCard, setShowCard] = React.useState(false);
    const [showHome, setShowHome] = React.useState(false);
    const [showStore, setShowStore] = React.useState(false);

    return (
        <span>
            <Navbar userData={params.userData} />
            <h1>Check Out</h1>
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <Card
                        raised={true}
                    >
                        <CardContent>
                            <h2>Nueva Dirección</h2>
                            <AddressForm userData={params.userData} />
                        </CardContent>
                    </Card>
                    <br />
                    <Card
                        raised={true}
                    >
                        <CardContent>
                            <h2>Escoja su método de pago</h2>
                            <Button variant='contained' onClick={() => {
                                setShowCard(prev => !prev);
                                setShowHome(false);
                                setShowStore(false);
                            }}>
                                Tarjeta
                            </Button> &nbsp;
                            <Button variant='contained' onClick={() => {
                                setShowHome(prev => !prev);
                                setShowCard(false);
                                setShowStore(false)
                            }}>
                                Pagar en casa
                            </Button>&nbsp;
                            <Button variant='contained' onClick={() => {
                                setShowStore(prev => !prev);
                                setShowCard(false);
                                setShowHome(false);
                            }}>
                                Pagar en sucursal
                            </Button>&nbsp;
                            {showCard && <ReactCreditCard />}
                            {showHome && <PayAtHomeForm />}
                            {showStore && <PayAtStore />}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card
                        style={{
                            border: 'none',
                            boxShadow: 'none'
                        }}
                    >
                        <CardContent>
                            <h2>Mi pedido</h2>
                        </CardContent>
                    </Card>
                    <div className='accept-checkout'>
                        <Button
                            color='success'
                            variant='contained'
                        >
                            Realizar pedido
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </span>
    )
}