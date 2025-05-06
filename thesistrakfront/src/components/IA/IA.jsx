import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  Container,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";

const IA = () => {
  // Recuperar conversaciones guardadas en localStorage
  const theme = createTheme({
    typography: {
      fontFamily: '"Apple", sans-serif', // Se cambia a la fuente personalizada "Apple"
    },
  });
  const [conversations, setConversations] = useState(() => {
    const savedConversations = localStorage.getItem("conversations");
    return savedConversations ? JSON.parse(savedConversations) : [];
  });
  const [currentConversation, setCurrentConversation] = useState([]);
  const [input, setInput] = useState("");
  // Reemplaza con tu nueva clave de API segura
  const API_KEY =
    "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";

  // Guardar conversaciones en localStorage al cambiar
  useEffect(() => {
    localStorage.setItem("conversations", JSON.stringify(conversations));
  }, [conversations]);

  // Inicia una nueva conversación guardando la actual
  const startNewConversation = () => {
    if (currentConversation.length > 0) {
      setConversations((prev) => [
        ...prev,
        { id: Date.now(), messages: currentConversation },
      ]);
      setCurrentConversation([]);
    }
  };

  // Enviar mensaje y recibir respuesta de GPT
  const handleSend = async () => {
    if (input.trim() === "") return;
    const newMessage = { sender: "user", text: input };
    const updatedConversation = [...currentConversation, newMessage];
    setCurrentConversation(updatedConversation);
    setInput("");

    const formattedMessages = updatedConversation.map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo", // Usando GPT barato
            messages: formattedMessages,
          }),
        }
      );

      const data = await response.json();
      const gptResponse = data.choices[0].message.content;

      setCurrentConversation((prev) => [
        ...prev,
        { sender: "gpt", text: gptResponse },
      ]);
    } catch (error) {
      console.error("Error al obtener la respuesta de GPT:", error);
      setCurrentConversation((prev) => [
        ...prev,
        { sender: "gpt", text: "Error al obtener la respuesta." },
      ]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" id="IAContainer">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            pt: 2,
          }}
          id="IAContainer"
        >
          {/* Área de Chat Actual */}
          <Paper
            sx={{ flex: 1, p: 2, mb: 2, overflowY: "auto" }}
            elevation={3}
            id="IAContainer"
          >
            <List>
              {currentConversation.map((msg, index) => (
                <ListItem key={index} id="IAContainer">
                  <ListItemText
                    id="IAContainer"
                    primary={msg.text}
                    primaryTypographyProps={{
                      color:
                        msg.sender === "user" ? "primary" : "text.secondary",
                      align: msg.sender === "user" ? "right" : "left",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Entrada y Botones */}
          <Box sx={{ display: "flex", gap: 1 }} id="IAContainer">
            <TextField
              id="IAContainer"
              fullWidth
              variant="outlined"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSend}
              id="IAContainer"
            >
              Enviar
            </Button>
          </Box>
          <Button
            variant="text"
            onClick={startNewConversation}
            sx={{ mt: 1, alignSelf: "flex-end" }}
          >
            Nueva Conversación
          </Button>

          <Divider sx={{ my: 2 }} />

          {/* Listado de Conversaciones Previas */}
          <Typography variant="h6" gutterBottom>
            Conversaciones anteriores
          </Typography>
          <Paper sx={{ maxHeight: 200, overflowY: "auto", p: 1 }} elevation={1}>
            <List>
              {conversations.map((conv) => (
                <Box key={conv.id} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">
                    {`Conversación ${new Date(conv.id).toLocaleString()}`}
                  </Typography>
                  <List disablePadding>
                    {conv.messages.map((msg, idx) => (
                      <ListItem key={idx} sx={{ pl: 2 }}>
                        <ListItemText
                          primary={msg.text}
                          primaryTypographyProps={{
                            color:
                              msg.sender === "user"
                                ? "primary"
                                : "text.secondary",
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ))}
            </List>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default IA;
