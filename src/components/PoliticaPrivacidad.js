import React from 'react';
import { styled } from '@mui/material/styles';
import { Container, Typography, Box, Divider, List, ListItem, ListItemText } from '@mui/material';
import SearchAppBar from './SearchAppBar';

const ScrollableContainer = styled(Container)({
  marginTop: '5rem',
  maxHeight: 'calc(100vh - 10rem)', // Limita la altura y agrega scroll cuando sea necesario
  overflowY: 'auto', // Añade scroll vertical cuando el contenido excede la altura máxima
});

const SectionContainer = styled(Box)({
  backgroundColor: '#f8f9fa',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginBottom: '1rem',
});

const Bullet = styled('span')({
  color: '#007bff',
  display: 'inline-block',
  width: '1em',
  marginLeft: '-1em',
});

const PoliticaPrivacidad = () => {
  const sections = [
    {
      title: 'Introducción',
      content:
        'En G&L, valoramos tu privacidad y estamos comprometidos a proteger tu información personal. Esta política de privacidad describe los tipos de información que recopilamos, cómo la utilizamos y las medidas que tomamos para garantizar su seguridad.',
    },
    {
      title: 'Recopilación de Información',
      content:
        'Recopilamos información personal de diversas maneras, incluyendo cuando te registras en nuestro sitio, realizas un pedido, te suscribes a nuestro boletín o rellenas un formulario. La información recopilada puede incluir tu nombre, dirección de correo electrónico, dirección postal y número de teléfono.',
    },
    {
      title: 'Uso de la Información',
      content:
        'La información que recopilamos puede utilizarse para mejorar tu experiencia en nuestro sitio web, mejorar el servicio al cliente, procesar transacciones, enviar correos electrónicos periódicos o administrar un concurso, promoción o encuesta.',
    },
    {
      title: 'Protección de la Información',
      content:
        'Implementamos una variedad de medidas de seguridad para mantener la seguridad de tu información personal. Utilizamos cifrado avanzado y políticas de seguridad rigurosas para proteger tu información contra el acceso no autorizado.',
    },
    {
      title: 'Compartir Información con Terceros',
      content:
        'No vendemos, intercambiamos ni transferimos tu información personal a terceros. Esto no incluye a terceros de confianza que nos ayudan a operar nuestro sitio web, realizar nuestro negocio o prestarte servicios, siempre y cuando esas partes acuerden mantener esta información confidencial.',
    },
    {
      title: 'Consentimiento',
      content:
        'Al utilizar nuestro sitio, consientes nuestra política de privacidad.',
    },
    {
      title: 'Cambios en Nuestra Política de Privacidad',
      content:
        'Si decidimos cambiar nuestra política de privacidad, publicaremos esos cambios en esta página. Esta política fue modificada por última vez el 12/06/2024.',
    },
    {
      title: 'Contáctanos',
      content:
        'Si tienes alguna pregunta sobre esta política de privacidad, puedes contactarnos utilizando la siguiente información:',
      items: [
        'Email: contacto@G&L.com',
        'Teléfono: 3516176333 - 543517233',
        'Dirección: RUTA 5 Km18, Cordoba, Argentina',
      ],
    },
  ];

  return (
    <ScrollableContainer>
        <SearchAppBar />
      <Typography variant="h1" sx={{ color: '#007bff', textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem' }}>
        Política de Privacidad - G&L
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '2rem' }}>
        En G&L, valoramos tu privacidad y estamos comprometidos a proteger tu información personal.
      </Typography>
      <Divider sx={{ borderTop: '2px solid #007bff', my: '2rem' }} />

      {sections.map((section, index) => (
        <SectionContainer key={index}>
          <Typography variant="h2" gutterBottom sx={{ fontSize: '1.8rem' }}>
            {section.title}
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem' }}>
            {section.content}
          </Typography>
          {section.items && (
            <List>
              {section.items.map((item, idx) => (
                <ListItem key={idx}>
                  <Bullet>&bull;</Bullet>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          )}
        </SectionContainer>
      ))}
    </ScrollableContainer>
  );
};

export default PoliticaPrivacidad;
