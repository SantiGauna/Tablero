import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRepuesto, createRepuesto, updateRepuesto } from '../services/repuestosService';
import { Button, TextField, Container, Typography, Snackbar, Paper } from '@mui/material';
import SearchAppBar from './SearchAppBar';

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
    <br/>
    <br/>
    <br/>
    <br/>
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? 'Editar Repuesto' : 'Agregar Repuesto'}
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
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
          <Button variant="contained" color="primary" type="submit">
            {id ? 'Actualizar' : 'Guardar'}
          </Button>
        </form>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Container>
    </React.Fragment>
  );
};

export default RepuestoForm;
