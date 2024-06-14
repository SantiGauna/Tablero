import React, { useState } from 'react';
import { Typography, Container, Box, Button, Zoom} from '@mui/material';
import backgroundImage from '../accesorios-coche-espacio-copia.jpg'; 
import { Link } from 'react-router-dom';
import '@fontsource/roboto';
import logo from './logaso.jpg'; // Asegúrate de que la ruta del logo sea correcta

const Inicio = () => {
  const [checked, setChecked] = useState(false);

  React.useEffect(() => {
    setChecked(true);
  }, []);



  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        color: 'white',
        padding: '0 20px',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: -1,
        },
      }}
    >
      <Container sx={{ overflow: 'hidden' }}>
      <img
          src={logo}
          alt="Logo"
          style={{
            width: '200px',  // Ajusta el tamaño del logo según sea necesario
            height: 'auto',
            marginBottom: '20px',  // Espacio opcional entre el logo y el texto
          }}
        />
        <Zoom in={checked} style={{ transitionDelay: '100ms' }}>
          <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Roboto', fontWeight: 'bold', textAlign: 'center' }}>
            Bienvenido a G&L Repuestos
          </Typography>
        </Zoom>
        <Zoom in={checked} style={{ transitionDelay: '200ms' }}>
          <Typography variant="h6" sx={{ fontFamily: 'Roboto', fontStyle: 'italic', textAlign: 'center' }}>
            Tu fuente confiable para repuestos de calidad.
          </Typography>
        </Zoom>
        <br />
        <Zoom in={checked} style={{ transitionDelay: '300ms' }}>
        <Button
          color="inherit"
          variant="outlined"
          component={Link}
          to="/repuestos"
        >
          Ver lista de repuestos
        </Button>
        </Zoom>

      </Container>
    </Box>
  );
};

export default Inicio;