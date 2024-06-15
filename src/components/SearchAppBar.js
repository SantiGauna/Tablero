import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, alpha, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logaso.jpg'; // Asegúrate de que la ruta del logo sea correcta

const SearchAppBar = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  const handleAddClick = () => {
    navigate('/nuevo');
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#1a1a1a' }}>
      <Toolbar>
        <Box
          component="img"
          sx={{
            height: 40,
            marginRight: 2,
            borderRadius: '50%',
          }}
          alt="Logaso"
          src={logo}
        />
        <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Urban, sans-serif', fontWeight: 'bold', letterSpacing: 1.2, color: '#ffffff' }}>
          G&L REPUESTOS
        </Typography>
        <div style={{ position: 'relative', borderRadius: 4, backgroundColor: alpha('#ffffff', 0.25), marginRight: 2 }}>
          <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', pointerEvents: 'none', padding: '0 8px' }}>
            <SearchIcon style={{ color: '#ffffff' }} />
          </div>
          <InputBase
            placeholder="Buscar…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ color: 'inherit', paddingLeft: 32 }}
          />
        </div>
        <IconButton 
          color="inherit" 
          component={Link} 
          to="/" 
          title="Inicio"
        >
          <HomeIcon />
        </IconButton>
        <IconButton 
          color="inherit" 
          component={Link} 
          to="/repuestos" 
          title="Lista de Repuestos"
        >
          <ListIcon />
        </IconButton>
        <IconButton 
          color="inherit" 
          onClick={handleAddClick} 
          title="Agregar Repuesto"
        >
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default SearchAppBar;
