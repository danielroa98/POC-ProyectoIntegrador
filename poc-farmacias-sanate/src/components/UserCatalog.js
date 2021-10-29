import * as React from 'react';
import getFirebase from '../firebase/configFirebase';

// MUI
import { 
    FormControl,
    InputLabel,
    Select,
    Box,
    MenuItem,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography   ,
    Divider,
    Button,
    TextField 
} from '@mui/material';

import { CarritoContext } from '../contexts/Carrito';

export default function UserCatalog(props){

    const [tiendas, setTiendas] = React.useState([]);
    const [tienda, setTienda] = React.useState({});
    const [select_tienda, setSelectTienda] = React.useState('');
    const [loading_component, setLoadingComponent] = React.useState(true);
    const [inventario, setInventario] = React.useState([]);
    const [loading_inventory, setLoadingInventory] = React.useState(true);
    const [cantidad, setCantidad] = React.useState(0);

    const [carrito, setCarrito] = React.useContext(CarritoContext)

    const firebase = getFirebase();
    const db = firebase.firestore();
    const tiendasCollection = db.collection('Tiendas');
    

    const handleChange = (event) => {
        setInventario([]);
        tiendas.forEach( e => {
            if(e.name === event.target.value){
                setTienda(e);
                setSelectTienda(event.target.value);
            }
        })
      };

    const handleSubmit = (event) => {
        setCarrito((carrito) => [...carrito, {
            "tienda":tienda,
            "product":event.product,
            "cantidad":event.cantidad
        }]);
        console.log(carrito)
    }

      React.useEffect(() => {
        console.log(props)
        const fetchStores = async () => {
            try {
                const snapshot = tiendasCollection.get()
                    .then(docs => {
                        docs.forEach(doc => {
                            const storesData = doc.data();
                            console.log(storesData);
                            setTiendas(
                                tiendas => [
                                    ...tiendas,
                                    storesData
                                ]);
                        });
                    });
                setLoadingComponent(false);
            } catch (error) {
                console.log(error);
            }
        }

        fetchStores();

    }, [])

    React.useEffect(() => {
        
        const fetchInventories = async () => {
            try {
                tienda.inventory.forEach(entry => {
                    console.log(entry);
                    const snapshot = entry.product.get()
                    .then(medicamento => {
                        setInventario( inventario => [...inventario, {
                            "product": medicamento.data(),
                            "quantity": entry.quantity
                          }]);
                    })
                });
                setLoadingInventory(false);
            } catch (error) {
                console.log(error);
            }
        }

        fetchInventories();

    },[tienda])

    return(
        <>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
        {loading_component ? (<p>Loading..</p>) : (<FormControl>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Tienda
              </InputLabel>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={select_tienda}
                  label="Tienda"
                  onChange={handleChange}
                  sx={{width: 300}}
              >
                  {tiendas.map( tienda => (
                      <MenuItem key={tienda.name} value={tienda.name}>{tienda.name}</MenuItem>
                  ))}  
              </Select>
              </FormControl>)}
        </Box>

        {loading_inventory ? (<></>) : (<Box sx={{ display: 'flex',  flexWrap: 'wrap', justifyContent: 'center'}}>
        {inventario.map(entry => (
            <Card key={entry.product.Name} sx={{maxWidth: 325, margin: 1.5}}>
                <CardMedia
                    component="img"
                    image={entry.product.Img}
                    height="200"
                    sx={{objectFit: 'contain'}}
                />
                <Divider />
                <CardContent sx={{background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'}}>
                    <Typography gutterBottom variant="h5" component="div">
                    {entry.product.Name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Cantidad: {entry.quantity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Precio Base: {entry.product.Price}.00 MXN
                    </Typography>

                    <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                        <FormControl>
                        <TextField
                            label="Cantidad"
                            type="number"
                            size="small"
                            value={entry.cantidad}
                            onChange={(e) => entry.cantidad = e.target.value}
                            InputProps={{ inputProps: { min: 1, max: entry.quantity } }}
                        >Cantidad</TextField>
                        <Button variant="contained" sx={{margin: 1}} onClick={() => {handleSubmit(entry)}}>Comprar</Button>

                        </FormControl>
                    </Box>
                </CardContent>
            </Card>
        ))}
        </Box>

        )}
        </>
        
    )
}