import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom si estás utilizando enrutamiento

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#333',
            color: '#fff',
            textAlign: 'center',
            padding: '10px', // Ajusta el padding según el espacio deseado dentro del footer
            position: 'fixed',
            bottom: '0',
            width: '100%',
            zIndex: '999', // Asegura que el zIndex sea alto para que esté delante de otros elementos
            borderTop: '1px solid #666', // Agrega una línea superior para separar del contenido principal
        }}>
            <p style={{ margin: '0' }}>&copy; 2024 Repuestos Gauna & Lazaro. Todos los derechos reservados.</p>
            <p style={{ margin: '0' }}>
                <Link to="/politica" style={{ color: '#fff', textDecoration: 'underline' }}>Política de Privacidad</Link>
            </p>
        </footer>
    );
}

export default Footer;
