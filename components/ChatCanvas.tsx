'use client';

import { useState, useEffect } from 'react';

export default function ChatCanvas({ platform, messages, darkMode, isGroupChat, chatName, userStatus, networkType, onMessageUpdate, onMessageDelete }) {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [batteryLevel, setBatteryLevel] = useState(87);

  // Update current time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Set up global function to receive messages from parent
  useEffect(() => {
    window.addMessageFromCanvas = (message) => {
      if (onMessageUpdate) {
        const newMessage = {
          id: Date.now(),
          type: 'text',
          content: inputMessage,
          sender: 'me',
          timestamp: new Date(),
          avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20confident%20young%20man%20with%20short%20dark%20hair%2C%20friendly%20expression%2C%20clean%20background%2C%20natural%20lighting%2C%20high%20quality%20portrait%20photo&width=100&height=100&seq=send-avatar&orientation=squarish'
        };

        if (window.parentAddMessage) {
          window.parentAddMessage(newMessage);
        }
      }
    };
  }, [inputMessage, onMessageUpdate]);

  const getPlatformStyle = () => {
    switch (platform) {
      case 'instagram':
        return {
          bg: darkMode ? 'bg-black' : 'bg-white',
          header: 'bg-white border-b border-gray-200',
          message: 'bg-gray-100'
        };
      case 'whatsapp':
        return {
          bg: darkMode ? 'bg-gray-900' : 'bg-green-50',
          header: 'bg-green-600 text-white',
          message: 'bg-white'
        };
      case 'messenger':
        return {
          bg: darkMode ? 'bg-gray-900' : 'bg-blue-50',
          header: 'bg-blue-600 text-white',
          message: 'bg-white'
        };
      case 'discord':
        return {
          bg: 'bg-gray-800',
          header: 'bg-gray-700 text-white',
          message: 'bg-gray-700'
        };
      default:
        return {
          bg: darkMode ? 'bg-gray-900' : 'bg-white',
          header: darkMode ? 'bg-gray-800 text-white' : 'bg-white border-b border-gray-200',
          message: darkMode ? 'bg-gray-700' : 'bg-gray-100'
        };
    }
  };

  const getNetworkIcon = () => {
    switch (networkType) {
      case 'WiFi':
        return 'ri-wifi-line';
      case '5G':
        return 'ri-signal-tower-line';
      case '4G':
        return 'ri-signal-tower-line';
      case '3G':
        return 'ri-signal-tower-line';
      case '2G':
        return 'ri-signal-tower-line';
      default:
        return 'ri-signal-tower-line';
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'text',
      content: inputMessage,
      sender: 'me',
      timestamp: new Date(),
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20confident%20young%20man%20with%20short%20dark%20hair%2C%20friendly%20expression%2C%20clean%20background%2C%20natural%20lighting%2C%20high%20quality%20portrait%20photo&width=100&height=100&seq=send-avatar&orientation=squarish'
    };

    if (window.parentAddMessage) {
      window.parentAddMessage(newMessage);
    }

    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const style = getPlatformStyle();

  return (
    <div className="relative">
      {/* Mobile Frame */}
      <div className="bg-black rounded-3xl p-2 shadow-2xl max-w-sm mx-auto">
        {/* Mobile Status Bar */}
        <div className="bg-black text-white px-4 py-2 flex items-center justify-between text-sm rounded-t-2xl">
          <div className="flex items-center gap-1">
            <span className="font-medium">{currentTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <i className={`${getNetworkIcon()} text-xs`}></i>
              <span className="text-xs">{networkType}</span>
            </div>
            <div className="flex items-center gap-1">
              <i className="ri-battery-2-line text-xs"></i>
              <span className="text-xs">{batteryLevel}%</span>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className={`${style.bg} overflow-hidden`} style={{ height: '600px' }}>
          {/* Chat Header */}
          <div className={`${style.header} px-4 py-3 flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20friendly%20young%20woman%20with%20shoulder%20length%20brown%20hair%2C%20warm%20smile%2C%20clean%20background%2C%20natural%20lighting%2C%20high%20quality%20portrait%20photo&width=100&height=100&seq=chat-avatar&orientation=squarish"
                  alt="Chat Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-sm">
                  {isGroupChat ? 'Group Chat' : chatName}
                </h3>
                <p className="text-xs opacity-70">
                  {isGroupChat ? '5 members' : userStatus}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-black/10 rounded-full transition-colors cursor-pointer">
                <i className="ri-phone-line text-lg"></i>
              </button>
              <button className="p-2 hover:bg-black/10 rounded-full transition-colors cursor-pointer">
                <i className="ri-video-line text-lg"></i>
              </button>
              <button className="p-2 hover:bg-black/10 rounded-full transition-colors cursor-pointer">
                <i className="ri-more-line text-lg"></i>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} group relative`}
                onClick={() => setSelectedMessage(message.id)}
              >
                {message.sender === 'other' && (
                  <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden mr-2 flex-shrink-0">
                    <img 
                      src={message.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className={`max-w-xs ${message.sender === 'me' ? 'bg-purple-500 text-white' : style.message + ' text-gray-900'} rounded-2xl px-3 py-2 relative cursor-pointer`}>
                  {message.type === 'text' && (
                    <p className="text-sm break-words">{message.content}</p>
                  )}
                  
                  {message.type === 'image' && (
                    <div className="w-48 h-32 bg-gray-200 rounded-lg overflow-hidden">
                      <img 
                        src={message.content}
                        alt="Message Image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {message.type === 'voice' && (
                    <div className="flex items-center gap-2 w-48">
                      <button className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer">
                        <i className="ri-play-fill text-white text-sm"></i>
                      </button>
                      <div className="flex-1 h-6 bg-gray-300 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                      <span className="text-xs opacity-70">1:23</span>
                    </div>
                  )}
                  
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  
                  {selectedMessage === message.id && (
                    <div className="absolute top-0 right-0 -mr-8 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onMessageDelete(message.id);
                        }}
                        className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer"
                      >
                        <i className="ri-delete-bin-line text-xs"></i>
                      </button>
                    </div>
                  )}
                </div>
                
                {message.sender === 'me' && (
                  <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden ml-2 flex-shrink-0">
                    <img 
                      src={message.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            <div className="flex items-center gap-2 opacity-70">
              <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20friendly%20young%20woman%20with%20shoulder%20length%20brown%20hair%2C%20warm%20smile%2C%20clean%20background%2C%20natural%20lighting%2C%20high%20quality%20portrait%20photo&width=100&height=100&seq=typing-avatar&orientation=squarish"
                  alt="Typing Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t px-4 py-3`}>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                <i className="ri-attachment-line text-lg text-gray-500"></i>
              </button>
              <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="w-full bg-transparent text-sm focus:outline-none"
                />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                <i className="ri-emoji-line text-lg text-gray-500"></i>
              </button>
              <button 
                onClick={handleSendMessage}
                className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors cursor-pointer"
              >
                <i className="ri-send-plane-line text-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
