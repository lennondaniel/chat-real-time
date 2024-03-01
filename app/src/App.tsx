import React, { useState } from "react";
import { io } from "socket.io-client";
import ChatPage from "./components/chat/page.tsx";
import styles from "./app.module.css";

export default function Home() {
  const [showChat, setShowChat] = useState(false)
  const [userName, setUserName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [roomId, setRoomId] = useState("");

  var socket = io(import.meta.env?.VITE_API_HOST)

  const handleJoin = () => {
    if(userName !== "" && roomId !== "") {
      socket.emit("joinRoom", roomId);
      setShowSpinner(true);

      setTimeout(() => {
        setShowChat(true);
        setShowSpinner(false)
      }, 4000);
    } else {
      alert("Preencha Nome")
    }
  };

  return (
    <div>
      <div className={styles.main_div}
           style={{display: showChat ? "none" : ""}}>
        <div
          className={styles.form_div}
        >
          <h3 className={styles.form_title}>Entrar no chat</h3>
          <input
            className={styles.main_input}
            type="text"
            placeholder="Nome de usuário"
            onChange={(e) => setUserName(e.target.value)}
            disabled={showSpinner}
          />
          <input
            className={styles.main_input}
            type="text"
            placeholder="ID da sala"
            onChange={(e) => setRoomId(e.target.value)}
            disabled={showSpinner}
          />
          <button className={styles.main_button} onClick={() => handleJoin()}>
            {!showSpinner ? (
              "Entrar"
            ) : (
              <div className={styles.loading_spinner}></div>
            )}
          </button>
        </div>
      </div>
      <div style={{display: !showChat ? "none" : ""}}>
        <ChatPage socket={socket} roomId={roomId} userNameRoom={userName}/>
      </div>
    </div>
  );
}