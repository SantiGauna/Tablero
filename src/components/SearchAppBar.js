// SearchAppBar.js

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, alpha } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List'; 
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

  const handleRepuestosListClick = () => {
    navigate('/repuestos'); 
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          SG Repuestos
        </Typography>
        <div img style={{maxHeight: 40, float: 'left'}} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPkv0zUZZNU06PAIY4j8LcY40sZw5oVXmiaI7ZhiQOudPJtO4sgfe8fbqHoubKFaP1c-s&usqp=CAU' />
        <div/>
        <div style={{ position: 'relative', borderRadius: 4, backgroundColor: alpha('#ffffff', 0.15) }}>
          <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', pointerEvents: 'none', padding: '0 8px' }}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Buscar…"s
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
        <IconButton color="inherit" onClick={handleRepuestosListClick}>
          <ListIcon /> 
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default SearchAppBar;
