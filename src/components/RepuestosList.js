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
  IconButton,
  Box,
  Zoom,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchAppBar from './SearchAppBar';
import backgroundImage from '../accesorios-coche-espacio-copia.jpg';

const RepuestosList = () => {
  const [repuestos, setRepuestos] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [ordenNombre, setOrdenNombre] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCards, setVisibleCards] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const repuestos = await fetchRepuestos();
        if (!Array.isArray(repuestos)) {
          throw new Error("Datos no válidos");
        }
        setRepuestos(repuestos);
        repuestos.forEach((_, index) => {
          setTimeout(() => {
            setVisibleCards(prev => prev + 1);
          }, index * 200);
        });
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
    try {
      await deleteRepuesto(selectedId);
      setRepuestos(repuestos.filter(repuesto => repuesto.id !== selectedId));
      setSnackbarMessage('Repuesto eliminado exitosamente');
      setOpenSnackbar(true);
      handleCloseDialog();
    } catch (error) {
      console.error("Error deleting repuesto:", error);
      setSnackbarMessage('Error eliminando repuesto');
      setOpenSnackbar(true);
    }
  };

  const handleOrdenNombreChange = () => {
    setOrdenNombre(orden => (orden === 'asc' ? 'desc' : 'asc'));
  };

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
        <div style={{ minHeight: '88vh', maxHeight: '80vh', padding: '50px', marginTop: '100px' }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              textAlign: 'center',
              padding: '20px',
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 700,
              color: '#ffffff',
              backgroundColor: '#333333',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              maxWidth: '500px',
              margin: 'auto',
            }}
          >
            Listado de Repuestos
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={handleOrdenNombreChange}>
                {ordenNombre === 'asc' ? <ArrowUpwardIcon color="primary" /> : <ArrowDownwardIcon color="primary" />}
              </IconButton>
              <Typography variant="subtitle2">{ordenNombre === 'asc' ? 'A-Z' : 'Z-A'}</Typography>
            </Grid>
            {filteredAndSortedRepuestos.map((repuesto, index) => (
              <Zoom in={visibleCards > index} key={repuesto.id}>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                    <img src={repuesto.imageURL} alt={repuesto.Nombre} style={{ maxWidth: '100%', height: '200px', marginBottom: '10px' }} />
                    <Typography sx={{ fontWeight: 'bold', textAlign: 'left', paddingY: '10px' }}>${repuesto.Precio} - {repuesto.Nombre}</Typography>
                    <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>{repuesto.Modelo}</Typography>
                    <Typography style={{ marginBottom: '10px', textAlign: 'left' }}>{repuesto.Descripcion}</Typography>
                    <Button component={Link} to={`/editar/${repuesto.id}`} variant="contained" startIcon={<ModeIcon />} color="primary" style={{ marginRight: '10px' }}>
                      Editar
                    </Button>
                    <Button onClick={() => handleOpenDialog(repuesto.id)} variant="contained" startIcon={<DeleteIcon />} color="error">
                      Eliminar
                    </Button>
                  </Paper>
                </Grid>
              </Zoom>
            ))}
          </Grid>
          <br />
          <br />
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
            <Button onClick={handleCloseDialog} variant='contained' color="primary">
              Cancelar
            </Button>
            <Button onClick={handleConfirmDelete} variant='contained' startIcon={<DeleteIcon />} color="error">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </React.Fragment>
  );
};

export default RepuestosList;
