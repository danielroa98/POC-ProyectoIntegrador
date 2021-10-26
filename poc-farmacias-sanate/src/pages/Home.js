import React from "react";
import { Container } from  "@mui/material";
import { Link } from 'react-router-dom';

import './HomeStyle.css';

//Components
import Navbar from "../components/Navbar";

export default function Home(params) {
    return(
        <span>
            <Navbar />
            <Container>
            <h1>Bienvenido a las Farmacias Sanate</h1>
            <p>Las mejores farmacias de la Republica</p>
            </Container>
        </span>
    )
}