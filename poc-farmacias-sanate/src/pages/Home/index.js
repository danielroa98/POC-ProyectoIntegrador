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
import InventoryCards from "../../components/InventoryCards";
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';

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
    const [inventario, setInventario] = React.useState();
    const mounted = React.useRef(false);

      const handleChange = (event) => {
        setTienda(event.target.value);
        console.log(tienda);
      };

    
      React.useEffect(() => {
        mounted.current = true;
        
        try {
          const db = firebase.firestore();
          const tiendasCollection = db.collection('Tiendas');
          const doc = tiendasCollection.where('client_id', '==', params.userData.uid).get()
          .then( snapshot => {
            snapshot.forEach(async doc => {
              //console.log(doc.data().inventory)
              let inv = [];
              doc.data().inventory.map(entry => {
                entry.product.get().then(res => {
                  inv.push({
                    product: res.data(),
                    quantity: entry.quantity
                  });
                })
              })
              setInventario(inv);
              
            })
          });
        } catch (error) {
          console.log(error)
        }

        console.log(inventario)

            },[params]);


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

            <Box>
            {inventario && <InventoryCards inventario={inventario} />}
            </Box>
            </>)

            :

            (
              <>
              <Divider sx={{margin: 3}}>
              <Typography variant="h4">Buscar Medicinas</Typography>
              </Divider>
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
              )

          }
      </div>
      </>
    )
}