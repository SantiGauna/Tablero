import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RepuestosList from './components/RepuestosList';
import RepuestoForm from './components/RepuestosForm';
import Inicio from './components/Inicio';
import Footer from './components/Footer'; // Importa el componente de footer




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/repuestos" element={<RepuestosList />} />
        <Route path="/nuevo" element={<RepuestoForm />} />
        <Route path="/editar/:id" element={<RepuestoForm />} />
      </Routes>
      <Footer />
    </Router>


  );
}

export default App;



