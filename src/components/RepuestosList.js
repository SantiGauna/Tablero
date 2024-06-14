// RepuestosList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchRepuestos, deleteRepuesto } from '../services/repuestosService';
import {
  Button,
  Snackbar,
  Paper,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchAppBar from './SearchAppBar';

const RepuestosList = () => {
  const [repuestos, setRepuestos] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [ordenNombre, setOrdenNombre] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const repuestos = await fetchRepuestos();
        setRepuestos(repuestos);
      } catch (error) {
        console.error("Error fetching repuestos:", error);
      }
    };
    fetchData();
  }, []);

  const handleOpenDialog = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = async () => {
    await deleteRepuesto(selectedId);
    setRepuestos(repuestos.filter(repuesto => repuesto.id !== selectedId));
    setSnackbarMessage('Repuesto eliminado exitosamente');
    setOpenSnackbar(true);
    handleCloseDialog();
  };

  const handleOrdenNombreChange = () => {
    setOrdenNombre(orden => (orden === 'asc' ? 'desc' : 'asc'));
  };

  // Filtrar y ordenar los repuestos basados en el término de búsqueda y el orden del nombre
  const filteredAndSortedRepuestos = repuestos
    .filter(repuesto => repuesto.Nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (ordenNombre === 'asc') {
        return a.Nombre.localeCompare(b.Nombre);
      } else {
        return b.Nombre.localeCompare(a.Nombre);
      }
    });

  return (
    <React.Fragment>
      <SearchAppBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <br/>
      <br/>
      <br/>
      <div style={{ minHeight: '88vh', maxHeight: '80vh', overflowY: 'auto', padding: '10px 20px' }}>
        <Typography variant="h4" component="h1" gutterBottom color={'primary'}>
          Repuestos
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleOrdenNombreChange}>
              {ordenNombre === 'asc' ? <ArrowUpwardIcon color="primary" /> : <ArrowDownwardIcon color="primary" />}
            </IconButton>
            <Typography variant="subtitle2">{ordenNombre === 'asc' ? 'A-Z' : 'Z-A'}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {filteredAndSortedRepuestos.map(repuesto => (
            <Grid item key={repuesto.id} xs={12} sm={6} md={4}>
              <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                <Typography component="div" style={{ fontWeight: 'bold', marginBottom: '10px' }}>{repuesto.Nombre}</Typography>
                <Typography style={{ marginBottom: '10px' }}>{repuesto.Modelo}</Typography>
                {/* Mostrar la imagen */}
                <img src={repuesto.imageURL} alt={repuesto.Nombre} style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }} />
                <Typography>${repuesto.Precio}</Typography>
                <Typography style={{ marginBottom: '10px' }}>{repuesto.Descripcion}</Typography>
                <Typography style={{ marginBottom: '10px' }}>{new Date(repuesto.Fecha_Alta.seconds * 1000).toLocaleDateString()}</Typography>
                <Button component={Link} to={`/editar/${repuesto.id}`} variant="contained" startIcon={<ModeIcon/>} color="primary" style={{ marginRight: '10px' }}>
                  Editar
                </Button>
                <Button onClick={() => handleOpenDialog(repuesto.id)} variant="outlined" startIcon={<DeleteIcon />} color="secondary">
                  Eliminar
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        TransitionComponent={Slide}
      >
        <DialogTitle>{"Confirmar eliminación"}</DialogTitle>
        <DialogContent>
        <DialogContentText>
            ¿Estás seguro de que quieres eliminar este repuesto?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default RepuestosList;
