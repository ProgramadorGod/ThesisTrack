import { createTheme, ThemeProvider } from '@mui/material/styles';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
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

const theme = createTheme({
  typography: {
    fontFamily: '"Apple", sans-serif',
  },
});

const Header = () => (
  <Box sx={{ textAlign: 'center', mb: 4 }}>
    <Typography variant="h3" component="h1" color="primary">
      GUÍA PARA DESARROLLAR TU PROYECTO DE GRADO
    </Typography>
  </Box>
);

const AboutProject = () => (
  <Box sx={{ mb: 6 }}>
    <Typography variant="h4" component="h2" gutterBottom>
      ¿Qué es un proyecto de grado?
    </Typography>
    <Typography variant="body1" paragraph>
      Un proyecto de grado es un trabajo académico que demuestra la capacidad de aplicar conocimientos teóricos y prácticos para resolver un problema o crear una solución innovadora. Puede abarcar desde investigaciones científicas hasta desarrollos tecnológicos.
    </Typography>
    <Typography variant="h6" gutterBottom fontWeight="bold" align="left">¿PARA QUÉ SIRVE?</Typography>
    <List>
      <ListItem>
        <Typography>Aplicar conocimientos y generar un aporte significativo.</Typography>
      </ListItem>
    </List>
    <Typography variant="h6" gutterBottom fontWeight="bold" align="left">TIPOS</Typography>
    <List>
      <ListItem><Typography>Investigativo</Typography></ListItem>
      <ListItem><Typography>Desarrollo de Software</Typography></ListItem>
      <ListItem><Typography>Propuesta Técnica</Typography></ListItem>
      <ListItem><Typography>Revisión de Literatura</Typography></ListItem>
    </List>
    <Typography variant="h6" gutterBottom fontWeight="bold" align="left">CRITERIOS DE EVALUACIÓN</Typography>
    <List>
      <ListItem><Typography>✅ Originalidad</Typography></ListItem>
      <ListItem><Typography>✅ Viabilidad</Typography></ListItem>
      <ListItem><Typography>✅ Aporte o impacto</Typography></ListItem>
    </List>
  </Box>
);

const ProjectTypes = () => (
  <Box sx={{ mb: 6 }}>
    <Typography variant="h4" component="h2" gutterBottom>
      Tipos de Proyecto de Grado
    </Typography>
    <Grid container spacing={2}>
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

const ProjectSteps = () => (
  <Box sx={{ mb: 6 }}>
    <Typography variant="h4" component="h2" gutterBottom>
      Pasos para Desarrollar tu Proyecto
    </Typography>
    <Timeline position="right">
      {[
        "Elección del tema",
        "Planteamiento del problema",
        "Justificación y objetivos",
        "Marco teórico y referencial",
        "Metodología",
        "Desarrollo / Ejecución",
        "Redacción del documento final",
        "Sustentación"
      ].map((step, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot color="primary">
              {index === 0 ? <EmojiObjectsIcon /> : null}
            </TimelineDot>
            {index < 7 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Typography>{step}</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  </Box>
);

const Tips = () => (
  <Box sx={{ mb: 6 }}>
    <Typography variant="h4" component="h2" gutterBottom>
      Consejos útiles y buenas prácticas
    </Typography>
    <Grid container spacing={2}>
      {[
        "🎯 Elige un tema que te apasione.",
        "🧑‍🏫 Escoge bien a tu tutor.",
        "📅 Usa un calendario de entregas.",
        "📝 Haz respaldos frecuentes de tu trabajo.",
        "📚 Apóyate en normas APA o IEEE.",
        "🤝 Trabaja colaborativamente si es en grupo."
      ].map((tip, i) => (
        <Grid item xs={12} sm={4} key={i}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="body1" align="center">{tip}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const Resources = () => (
  <Box sx={{ mb: 6 }}>
    <Typography variant="h4" component="h2" gutterBottom>
      Recursos y plantillas
    </Typography>
    <List>
      <ListItem>
        <Link href="/plantilla-word" underline="hover" color="primary" target="_blank">
          <Typography>📄 Plantilla Word para redactar tu proyecto</Typography>
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/ejemplos" underline="hover" color="primary" target="_blank">
          <Typography>🧾 Ejemplos reales de proyectos anteriores</Typography>
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/normas-universidad" underline="hover" color="primary" target="_blank">
          <Typography>🎓 Normas y lineamientos institucionales</Typography>
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/tutoriales" underline="hover" color="primary" target="_blank">
          <Typography>📚 Tutoriales y guías prácticas para cada etapa</Typography>
        </Link>
      </ListItem>
    </List>
  </Box>
);



// Componente para Contacto / Créditos
const ContactSection = () => (
  <Box sx={{ mb: 6, textAlign: 'center' }}>
    <Typography variant="h5" gutterBottom fontWeight="bold">
      ¿Necesitas ayuda o quieres crear algo similar?
    </Typography>
    <Typography variant="body1" paragraph>
      Este recurso fue creado por Luis Felipe Gutiérrez Camacho. Si deseas más información, apoyo o desarrollar un proyecto parecido para otra universidad, puedes contactarme:
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
      <Link
        href="https://www.linkedin.com/in/luis-felipe-gutierrez-camacho-0373a7233/"
        target="_blank"
        rel="noopener noreferrer"
        color="inherit"
        underline="hover"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <LinkedInIcon color="primary" />
        LinkedIn
      </Link>
      <Link
        href="https://github.com/ProgramadorGod"
        target="_blank"
        rel="noopener noreferrer"
        color="inherit"
        underline="hover"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <GitHubIcon color="action" />
        GitHub
      </Link>
      <Link
        href="https://wa.me/573132153738"
        target="_blank"
        rel="noopener noreferrer"
        color="inherit"
        underline="hover"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <WhatsAppIcon sx={{ color: '#25D366' }} />
        WhatsApp
      </Link>
    </Box>
  </Box>
);


const Footer = () => (
  <Box sx={{ textAlign: 'center', pt: 3, borderTop: '1px solid #ccc' }}>
    <Typography variant="body2" color="textSecondary">
      © 2025 ThesisTrack. Todos los derechos reservados.
    </Typography>
  </Box>
);

const Help = () => {
  return (
    <ThemeProvider theme={theme}>
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
        <ContactSection></ContactSection>
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default Help;
