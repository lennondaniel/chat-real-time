import React, { useState, useEffect } from "react";
import style from "./chat.module.css";
interface IMsgDataTypes {
    roomId: String | number;
    userName: String;
    message: String;
    date: Date;
}

const ChatPage = ({ socket, userNameRoom, roomId }: any) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [chat, setChat] = useState<IMsgDataTypes[]>([]);

    const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(currentMessage !== "") {
            const messageData: IMsgDataTypes = {
                roomId: roomId,
                userName: userNameRoom,
                message: currentMessage,
                date: new Date(Date.now())
            };
            await socket.emit("sendMessage", messageData);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("recMessage", (data: IMsgDataTypes) => {
            setChat((pre: any) => [...pre, data]);
        });
    }, [socket]);

    return (
      <div className={style.chat_div}>
          <div className={style.chat_border}>
              <div className={style.chat_header}>
                  <p>
                      {userNameRoom}
                  </p>
                  <p>
                      Sala: {roomId}
                  </p>
              </div>
              <div>
                  {chat.map(({ roomId, userName, message, date }, key) => (
                    <div
                      key={key}
                      className={
                          userName == userNameRoom
                            ? style.chatProfileRight
                            : style.chatProfileLeft
                      }
                    >
              <span
                className={style.chatProfileSpan}
                style={{ textAlign: userName == userNameRoom ? "right" : "left" }}
              >
                {userName.charAt(0)}
              </span>
                        <p style={{ textAlign: userName == userNameRoom ? "right" : "left" }}>
                            { message }
                        </p>
                    </div>
                  ))}
              </div>
              <div className={style.chat_footer}>
                  <form onSubmit={(e) => sendData(e)}>
                      <input
                        className={style.chat_input}
                        type="text"
                        value={currentMessage}
                        placeholder="Digite sua mensagem"
                        onChange={(e) => setCurrentMessage(e.target.value)}
                      />
                      <button className={style.chat_button}>Enviar</button>
                  </form>
              </div>
          </div>
      </div>
    );
};

export default ChatPage;