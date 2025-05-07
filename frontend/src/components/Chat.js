import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Chat.css';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = { user: 'You', text: message };
    const currentMessage = message;
    setMessage('');
    setIsLoading(true);

    try {
      setChat(prev => [...prev, userMessage]);
      const response = await axios.post('http://localhost:5000/api/chat', { 
        message: currentMessage 
      });
      const aiReply = { user: 'AI', text: response.data.reply };
      setChat(prev => [...prev, aiReply]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { user: 'AI', text: 'Üzgünüm, bir hata oluştu.' };
      setChat(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-app">
      <div className="chat-messages">
        <div className="messages-container">
          {chat.length === 0 ? (
            <div className="welcome-message">
              <h2>Hoş Geldiniz!</h2>
              <p>AI asistanınızla sohbet etmeye başlayın.</p>
            </div>
          ) : (
            chat.map((msg, index) => (
              <div 
                key={index} 
                className={`message-container ${msg.user.toLowerCase()}`}
              >
                <div className="message">
                  <div className="message-header">
                    <span className="user-name">{msg.user}</span>
                  </div>
                  <div className="message-content">
                    {msg.text}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="chat-input-container">
        <div className="input-wrapper">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Mesajınızı yazın..."
            disabled={isLoading}
          />
          <button 
            onClick={sendMessage}
            disabled={isLoading}
            className={isLoading ? 'loading' : ''}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              'Gönder'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
