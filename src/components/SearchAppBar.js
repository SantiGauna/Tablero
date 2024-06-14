// SearchAppBar.js

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, alpha } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';

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
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          SG Repuestos
        </Typography>
        <div style={{ position: 'relative', borderRadius: 4, backgroundColor: alpha('#ffffff', 0.15) }}>
          <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', pointerEvents: 'none', padding: '0 8px' }}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Buscar…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ color: 'inherit', paddingLeft: 32 }}
          />
        </div>
        <IconButton color="inherit" component={Link} to="/">
          <HomeIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleAddClick}>
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default SearchAppBar;
