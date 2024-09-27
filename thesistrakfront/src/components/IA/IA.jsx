import React, { useState } from "react";
import "./IA.css";

const IA = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");

      // Simulación de respuesta automática (puedes integrar la lógica GPT aquí)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "gpt", text: "Aquí está tu respuesta generada..." },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="MAINIAContainer">
      <div className="Intern">
        <div className="ChatWindow">
          {messages.map((msg, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default IA;
