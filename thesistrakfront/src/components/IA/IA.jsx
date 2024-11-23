import React, { useState, useEffect } from "react";
import "./IA.css";

const IA = () => {
  const [conversations, setConversations] = useState(() => {
    const savedConversations = localStorage.getItem("conversations");
    return savedConversations ? JSON.parse(savedConversations) : [];
  });
  const [currentConversation, setCurrentConversation] = useState([]);
  const [input, setInput] = useState("");
  const API_KEY = "sk-QXZgiIh9Cc5fRQMESLypuqwGmc4A6KJjnvjwQ_IUeIT3BlbkFJInWBm-8TeyQa9I-o1LM03Nj9fTFFlOIud5YTUBmjgA "; // Reemplaza con tu nueva clave de API segura

  // Guardar en localStorage cuando las conversaciones cambien
  useEffect(() => {
    localStorage.setItem("conversations", JSON.stringify(conversations));
  }, [conversations]);

  const startNewConversation = () => {
    setConversations((prevConversations) => [
      ...prevConversations,
      { id: Date.now(), messages: currentConversation },
    ]);
    setCurrentConversation([]);
  };

  const handleSend = async () => {
    if (input.trim() !== "") {
      const newMessage = { sender: "user", text: input };
      const updatedConversation = [...currentConversation, newMessage];
      setCurrentConversation(updatedConversation);
      setInput("");

      const formattedMessages = updatedConversation.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));

      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4-turbo", // Usando GPT-4
            messages: formattedMessages, // Enviar el historial de mensajes completo
          }),
        });

        const data = await response.json();
        const gptResponse = data.choices[0].message.content;

        setCurrentConversation((prevMessages) => [
          ...prevMessages,
          { sender: "gpt", text: gptResponse },
        ]);
      } catch (error) {
        console.error("Error al obtener la respuesta de GPT:", error);
        setCurrentConversation((prevMessages) => [
          ...prevMessages,
          { sender: "gpt", text: "Error al obtener la respuesta." },
        ]);
      }
    }
  };

  return (
    <div className="MAINIAContainer">
      <div className="Intern">
        <div className="ChatWindow">
          {currentConversation.map((msg, index) => (
            <div
              key={index}
              className={`Message ${msg.sender === "user" ? "UserMessage" : "GPTMessage"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="InputContainer">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
          />
          <button onClick={handleSend}>Enviar</button>
          <button onClick={startNewConversation}>Nueva Conversación</button>
        </div>
      </div>
      <div className="PreviousConversations">
        <h3>Conversaciones anteriores</h3>
        {conversations.map((conv) => (
          <div key={conv.id} className="ConversationPreview">
            <h4>Conversación {new Date(conv.id).toLocaleString()}</h4>
            {conv.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`Message ${msg.sender === "user" ? "UserMessage" : "GPTMessage"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IA;
