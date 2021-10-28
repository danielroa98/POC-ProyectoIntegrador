import * as React from "react";
import {
    Box,
    Typography
} from "@mui/material";

import OrderCard from "../components/OrderCard";
import Navbar from "../components/Navbar";

export default function Orders(params) {

    return (
        <>
            <div>
                <Navbar userData={params.userData} />
                {params.userData.admin ? (
                    <>

                        <Typography variant='h4' component='div' gutterBottom style={{
                            textAlign: 'center',
                        }}>
                            Pedidos
                        </Typography>
                        <Box style={{ alignItems: "center", justifyContent: "center" }}>
                            <OrderCard userData={params.userData} />
                        </Box>

                    </>
                ) : (
                    <>
                        <Typography variant='h4' component='div' gutterBottom style={{
                            textAlign: 'center',
                        }}>
                            Mis pedidos anteriores
                        </Typography>
                        <OrderCard userData={params.userData} />
                    </>
                )}
            </div>
        </>
    )
}