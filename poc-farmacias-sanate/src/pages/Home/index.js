import React from "react";
import { Container,
         Divider,
         Card,
         CardContent,
         Typography,
         Box,
         FormControl,
         Select,
         MenuItem,
         InputLabel,
 } from  "@mui/material";
import { Link } from 'react-router-dom';

import { useStyles } from "./styles";

// Custom Components
import getFirebase from "../../firebase/configFirebase";
import getInventory from "../../functions/GetInventories";

//Components
import Navbar from "../../components/Navbar";
import RecentMedicines from "../../components/RecentMedicine";
import Footer from "../../components/Footer";
import InventoryCards from "../../components/InventoryCards";
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import UserCatalog from "../../components/UserCatalog";


export default function Home(params) {
    const classes = useStyles();
    const firebase = getFirebase();

    const [tienda, setTienda] = React.useState('');
    const [inventario, setInventario] = React.useState([]);

      const handleChange = (event) => {
        setTienda(event.target.value);
        console.log(tienda);
      };

    

    return(
      <>
      <div>
          <Navbar userData={params.userData}/>
          <Container className={classes.homeContainer}>
          <h1>Bienvenido a las Farmacias Sanate</h1>
          <p>Las mejores farmacias de la Republica</p>
          </Container>

          {params.userData.admin ?
          
            (<>
            <Divider sx={{margin: 3}}>
            <Typography variant="h4">Mi Inventario</Typography>
            </Divider>
              <InventoryCards userData = {params.userData}/>
            </>)

            :

            (
              <>
              <Divider sx={{margin: 3}}>
              <Typography variant="h4">Buscar Medicinas</Typography>
              </Divider>

                <UserCatalog params={params}/>

              </>
              )

          }
      </div>
      </>
    )
}