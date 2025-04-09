import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  Link,
  Divider
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/lab';
import SchoolIcon from '@mui/icons-material/School';
import ScienceIcon from '@mui/icons-material/Science';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

// Componente para la cabecera principal
const Header = () => (
  <Box sx={{ textAlign: 'center', mb: 4 }}>
    <Typography variant="h3" component="h1" color="primary">
      GUIDE TO DEVELOP YOUR THESIS
    </Typography>
  </Box>
);

// Componente para la sección "¿Qué es un proyecto de grado?"
const AboutProject = () => (
  <Box sx={{ mb: 6 }}>
    <Typography variant="h4" component="h2" gutterBottom>
      ¿Qué es un proyecto de grado?
    </Typography>
    <Typography variant="body1" paragraph>
      Un proyecto de grado es un trabajo académico que demuestra la capacidad de aplicar conocimientos teóricos y prácticos para resolver un problema o crear una solución innovadora. Puede abarcar desde investigaciones científicas hasta desarrollos tecnológicos.
    </Typography>
    <List>
      <ListItem>
        <strong>Para qué sirve:</strong> Aplicar conocimientos y generar un aporte significativo.
      </ListItem>
      <ListItem>
        <strong>Tipos:</strong> Investigativo, Desarrollo de Software, Propuesta Técnica, Revisión de Literatura.
      </ListItem>
      <ListItem>
        <strong>Criterios de evaluación:</strong> Originalidad, viabilidad, aporte.
      </ListItem>
    </List>
  </Box>
);

// Componente para la sección "Tipos de Proyecto de Grado"
const ProjectTypes = () => (
  <Box sx={{ mb: 6 }}>
    <Typography variant="h4" component="h2" gutterBottom>
      Tipos de Proyecto de Grado
    </Typography>
    <Grid container spacing={2}>
      {/* Investigativo */}
      <Grid item xs={12} sm={6}>
        <Card variant="outlined">
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <ScienceIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Investigativo</Typography>
            </Box>
            <Typography variant="body2">
              Basado en el método científico.
              <br />
              <em>Ejemplo:</em> Análisis de suelos en zonas de Unipaz.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* Desarrollo de Software */}
      <Grid item xs={12} sm={6}>
        <Card variant="outlined">
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CodeIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Desarrollo de Software</Typography>
            </Box>
            <Typography variant="body2">
              Creación de aplicaciones o herramientas.
              <br />
              <em>Ejemplo:</em> Sistema de reservas para laboratorios.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* Propuesta Técnica */}
      <Grid item xs={12} sm={6}>
        <Card variant="outlined">
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <BuildIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Propuesta Técnica</Typography>
            </Box>
            <Typography variant="body2">
              Mejora o implementación de procesos.
              <br />
              <em>Ejemplo:</em> Propuesta para mejorar riego en cultivos.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* Revisión de Literatura */}
      <Grid item xs={12} sm={6}>
        <Card variant="outlined">
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <SchoolIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Revisión de Literatura</Typography>
            </Box>
            <Typography variant="body2">
              Análisis y síntesis de información existente.
              <br />
              <em>Ejemplo:</em> Estado del arte sobre IA en educación.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

// Componente para la sección "Pasos para Desarrollar tu Proyecto"
const ProjectSteps = () => (
  <Box sx={{ mb: 6 }}>
    <Typography variant="h4" component="h2" gutterBottom>
      Pasos para Desarrollar tu Proyecto
    </Typography>
    <Timeline position="right">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <EmojiObjectsIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Elección del tema</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Planteamiento del problema</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Justificación y objetivos</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Marco teórico y referencial</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Metodología</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Desarrollo / Ejecución</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Redacción del documento final</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" />
        </TimelineSeparator>
        <TimelineContent>Sustentación</TimelineContent>
      </TimelineItem>
    </Timeline>
  </Box>
);

// Componente para la sección "Consejos útiles y buenas prácticas"
const Tips = () => (
  <Box sx={{ mb: 6 }}>
    <Typography variant="h4" component="h2" gutterBottom>
      Consejos útiles y buenas prácticas
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body1" align="center">
              🎯 Elige un tema que te apasione.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body1" align="center">
              🧑‍🏫 Escoge bien a tu tutor.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body1" align="center">
              📅 Usa un calendario de entregas.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body1" align="center">
              📝 Haz respaldos frecuentes de tu trabajo.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body1" align="center">
              📚 Apóyate en normas APA o IEEE.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body1" align="center">
              🤝 Trabaja colaborativamente si es en grupo.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

// Componente para la sección "Recursos y plantillas"
const Resources = () => (
  <Box sx={{ mb: 6 }}>
    <Typography variant="h4" component="h2" gutterBottom>
      Recursos y plantillas
    </Typography>
    <List>
      <ListItem>
        <Link href="/plantilla-word" underline="hover" color="primary" target="_blank">
          📄 Plantilla Word para proyecto
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/ejemplos" underline="hover" color="primary" target="_blank">
          🧾 Ejemplos de proyectos anteriores
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/normas-universidad" underline="hover" color="primary" target="_blank">
          🎓 Normas de la universidad
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/tutoriales" underline="hover" color="primary" target="_blank">
          📚 Tutoriales y guías adicionales
        </Link>
      </ListItem>
    </List>
  </Box>
);

// Componente para el Footer
const Footer = () => (
  <Box sx={{ textAlign: 'center', pt: 3, borderTop: '1px solid #ccc' }}>
    <Typography variant="body2" color="textSecondary">
      © 2025 ThesisTrack. Todos los derechos reservados.
    </Typography>
  </Box>
);

const Help = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Header />
      <AboutProject />
      <Divider sx={{ mb: 6 }} />
      <ProjectTypes />
      <Divider sx={{ mb: 6 }} />
      <ProjectSteps />
      <Divider sx={{ mb: 6 }} />
      <Tips />
      <Divider sx={{ mb: 6 }} />
      <Resources />
      <Footer />
    </Container>
  );
};

export default Help;
