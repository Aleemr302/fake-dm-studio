'use client';

import { useState, useEffect } from 'react';
import PlatformSelector from '@/components/PlatformSelector';
import ChatCanvas from '@/components/ChatCanvas';
import MessageEditor from '@/components/MessageEditor';
import ExportPanel from './ExportPanel';

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: 'ri-instagram-line', color: 'pink' },
  { id: 'whatsapp', name: 'WhatsApp', icon: 'ri-whatsapp-line', color: 'green' },
  { id: 'messenger', name: 'Messenger', icon: 'ri-messenger-line', color: 'blue' },
  { id: 'tiktok', name: 'TikTok', icon: 'ri-tiktok-line', color: 'black' },
  { id: 'telegram', name: 'Telegram', icon: 'ri-telegram-line', color: 'blue' },
  { id: 'twitter', name: 'X (Twitter)', icon: 'ri-twitter-x-line', color: 'black' },
  { id: 'snapchat', name: 'Snapchat', icon: 'ri-snapchat-line', color: 'yellow' },
  { id: 'discord', name: 'Discord', icon: 'ri-discord-line', color: 'indigo' }
];

export default function Editor() {
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'text',
      content: 'Hey! How are you doing?',
      sender: 'other',
      timestamp: new Date(),
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20friendly%20young%20woman%20with%20shoulder%20length%20brown%20hair%2C%20warm%20smile%2C%20clean%20background%2C%20natural%20lighting%2C%20high%20quality%20portrait%20photo&width=100&height=100&seq=avatar-1&orientation=squarish'
    },
    {
      id: 2,
      type: 'text',
      content: 'I\'m great! Just working on some projects. What about you?',
      sender: 'me',
      timestamp: new Date(),
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20confident%20young%20man%20with%20short%20dark%20hair%2C%20friendly%20expression%2C%20clean%20background%2C%20natural%20lighting%2C%20high%20quality%20portrait%20photo&width=100&height=100&seq=avatar-2&orientation=squarish'
    }
  ]);
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [showExportPanel, setShowExportPanel] = useState(false);
  const [chatName, setChatName] = useState('Sarah Johnson');
  const [networkType, setNetworkType] = useState('5G');
  const [userStatus, setUserStatus] = useState('Online');

  // Set up global function for ChatCanvas to add messages
  useEffect(() => {
    window.parentAddMessage = (message) => {
      setMessages(prev => [...prev, message]);
    };
  }, []);

  const addMessage = (message) => {
    setMessages([...messages, { ...message, id: Date.now() }]);
  };

  const updateMessage = (id, updates) => {
    setMessages(messages.map(msg => msg.id === id ? { ...msg, ...updates } : msg));
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 py-3`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className={`text-2xl font-bold font-pacifico ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Fake DM Studio
          </h1>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'} hover:bg-opacity-80 transition-colors cursor-pointer`}
            >
              <i className={`${darkMode ? 'ri-sun-line' : 'ri-moon-line'} text-xl`}></i>
            </button>
            
            <button
              onClick={() => setShowExportPanel(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all whitespace-nowrap cursor-pointer"
            >
              Export & Share
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Controls */}
          <div className="lg:col-span-1 space-y-6">
            <PlatformSelector
              platforms={platforms}
              selectedPlatform={selectedPlatform}
              onSelect={setSelectedPlatform}
              darkMode={darkMode}
            />
            
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Chat Settings
              </h3>
              
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isGroupChat}
                    onChange={(e) => setIsGroupChat(e.target.checked)}
                    className="rounded"
                  />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Group Chat
                  </span>
                </label>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Chat Name
                  </label>
                  <input
                    type="text"
                    value={chatName}
                    onChange={(e) => setChatName(e.target.value)}
                    placeholder="Enter chat name"
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Status
                  </label>
                  <select 
                    value={userStatus}
                    onChange={(e) => setUserStatus(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-sm pr-8 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  >
                    <option>Online</option>
                    <option>Last seen recently</option>
                    <option>Last seen 1 hour ago</option>
                    <option>Offline</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Network Type
                  </label>
                  <select 
                    value={networkType}
                    onChange={(e) => setNetworkType(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-sm pr-8 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  >
                    <option>5G</option>
                    <option>4G</option>
                    <option>WiFi</option>
                    <option>3G</option>
                    <option>2G</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Chat Canvas */}
          <div className="lg:col-span-2">
            <ChatCanvas
              platform={selectedPlatform}
              messages={messages}
              darkMode={darkMode}
              isGroupChat={isGroupChat}
              chatName={chatName}
              userStatus={userStatus}
              networkType={networkType}
              onMessageUpdate={updateMessage}
              onMessageDelete={deleteMessage}
            />
          </div>

          {/* Right Sidebar - Message Editor */}
          <div className="lg:col-span-1">
            <MessageEditor
              onAddMessage={addMessage}
              darkMode={darkMode}
              platform={selectedPlatform}
            />
          </div>
        </div>
      </div>

      {/* Export Panel */}
      {showExportPanel && (
        <ExportPanel
          onClose={() => setShowExportPanel(false)}
          messages={messages}
          platform={selectedPlatform}
          darkMode={darkMode}
          chatName={chatName}
          networkType={networkType}
        />
      )}
    </div>
  );
}
