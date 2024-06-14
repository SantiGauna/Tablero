import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRepuesto, createRepuesto, updateRepuesto } from '../services/repuestosService';
import { Button, TextField, Container, Typography, Snackbar, Paper, Box } from '@mui/material';
import SearchAppBar from './SearchAppBar';
import { Link } from 'react-router-dom';
import backgroundImage from '../accesorios-coche-espacio-copia.jpg'; 



const RepuestoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [repuesto, setRepuesto] = useState({
    Nombre: '',
    Modelo: '',
    Precio: '',
    Descripcion: '',
    Fecha_Alta: new Date(),
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const repuesto = await fetchRepuesto(id);
          setRepuesto(repuesto);
        } catch (error) {
          console.error("Error fetching repuesto:", error);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRepuesto((prevRepuesto) => ({
      ...prevRepuesto,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateRepuesto(id, repuesto);
        setSnackbarMessage('Repuesto actualizado exitosamente');
      } else {
        await createRepuesto(repuesto);
        setSnackbarMessage('Repuesto guardado exitosamente');
      }
      setOpenSnackbar(true);
      setTimeout(() => navigate('/repuestos'), 2000);
    } catch (error) {
      console.error("Error saving repuesto:", error);
    }
  };

  return (
    <React.Fragment>
    <SearchAppBar />
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
        padding: '0 10px',
        position: 'relative',
        overflow: 'auto',
        zIndex: 1,
      }}
    >
    <Container sx={{textAlign:'center', padding:'50px'}}>
      <Typography variant="h4" component="h1" gutterBottom >
        {id ? 'Editar Repuesto' : 'Agregar Repuesto'}
      </Typography>
      <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            name="Nombre"
            value={repuesto.Nombre}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Modelo"
            name="Modelo"
            value={repuesto.Modelo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Precio"
            name="Precio"
            type="number"
            value={repuesto.Precio}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Descripción"
            name="Descripcion"
            value={repuesto.Descripcion}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Ingrese la URL de la imágen"
            name="imageURL"
            value={repuesto.imageURL}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <div>
              <Button variant="contained" color="primary" type="submit" style={{ marginRight: '10px' }}>
                  {id ? 'Actualizar' : 'Guardar'}
              </Button>
              <Button variant='contained' color="error" component={Link} to={`/repuestos`} >
                  Cancelar
              </Button>
          </div>

        </form>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Container>
    </Box>
    </React.Fragment>
  );
};

export default RepuestoForm;
