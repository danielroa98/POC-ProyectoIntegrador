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

//Components
import Navbar from "../../components/Navbar";
import RecentMedicines from "../../components/RecentMedicine";
import Footer from "../../components/Footer";

const names = [
    'Antonio Junco',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

export default function Home(params) {
    const classes = useStyles();
    const firebase = getFirebase();

    const [tienda, setTienda] = React.useState('');

    
    React.useEffect(async () => {
      const db = firebase.firestore();
      const tiendasCollection = db.collection('Tiendas');
      
      console.log(params.userData)
      const doc = await tiendasCollection.where('client_id', '==', params.userData.uid).get()
      .then( snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.data())
        })
      });

    },[]);

    

      const handleChange = (event) => {
        setTienda(event.target.value);
        console.log(tienda);
      };
    
    return(
        <span>
            <Navbar userData={params.userData}/>
            <Container className={classes.homeContainer}>
            <h1>Bienvenido a las Farmacias Sanate</h1>
            <p>Las mejores farmacias de la Republica</p>
            </Container>
            <Divider sx={{margin: 3}}>
              {params.userData.admin ? 
              (<>
              <Typography variant="h4">Mi Inventario</Typography>
              </>) 
              : 
              (
              <>
              <Typography variant="h4">Buscar Medicinas</Typography>
              <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Tienda
              </InputLabel>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tienda}
                  label="Tienda"
                  onChange={handleChange}
              >
                  {names.map(tienda => (
                      <MenuItem key={tienda} value={tienda}>{tienda}</MenuItem>
                  ))}  
              </Select>
              </FormControl>
              </>
              )}
                
            </Divider>
        </span>
    )
}