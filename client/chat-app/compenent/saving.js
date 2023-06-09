import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        media : "false",
        url : "",
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const uploadImage = async () => {
    
      const messageData = {
        media : "true",
        url : "http://photos.wikimapia.org/p/00/03/33/69/35_big.jpg",
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        {/* <p>Live Chat</p> */}
        <div id="upload">
        <input type="file" accept="image/*" />
          <button onClick={uploadImage}>upload</button>
        </div>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-meta">
                    <p id="author">{messageContent.author}</p>
                  </div>
                  {messageContent.media==="false" ?(<div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>) :(
                    <img src={messageContent.url} style={{"max-width":"100%","height":"auto"}}/>
                  )}
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDownCapture={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;




{/* <MDBTypography listUnStyled className="text-white">
            {messageList.map((messageContent) => {
              {username === messageContent.author ? (
                
              ): ()}
            })}
          </MDBTypography>
        
        
        <li className="footer">
          <MDBInput placeholder="write.." id='typeText' type='text' onChange={(e) => { setCurrentMessage(e.target.value);}} />
        <MDBBtn className='me-1' onClick={sendMessage}>
          Send
        </MDBBtn>
      </li>
        
        
        
        
        */}

          