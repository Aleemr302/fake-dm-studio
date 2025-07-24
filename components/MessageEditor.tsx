'use client';

import { useState } from 'react';

export default function MessageEditor({ onAddMessage, darkMode, platform }) {
  const [messageType, setMessageType] = useState('text');
  const [messageContent, setMessageContent] = useState('');
  const [messageSender, setMessageSender] = useState('me');

  const handleAddMessage = () => {
    if (!messageContent.trim()) return;

    const message = {
      type: messageType,
      content: messageContent,
      sender: messageSender,
      timestamp: new Date(),
      avatar: messageSender === 'me' 
        ? 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20confident%20young%20man%20with%20short%20dark%20hair%2C%20friendly%20expression%2C%20clean%20background%2C%20natural%20lighting%2C%20high%20quality%20portrait%20photo&width=100&height=100&seq=my-avatar&orientation=squarish'
        : 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20friendly%20young%20woman%20with%20shoulder%20length%20brown%20hair%2C%20warm%20smile%2C%20clean%20background%2C%20natural%20lighting%2C%20high%20quality%20portrait%20photo&width=100&height=100&seq=other-avatar&orientation=squarish'
    };

    onAddMessage(message);
    setMessageContent('');
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Add Message
      </h3>
      
      <div className="space-y-4">
        {/* Message Type */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Message Type
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setMessageType('text')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                messageType === 'text'
                  ? 'bg-purple-500 text-white'
                  : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Text
            </button>
            <button
              onClick={() => setMessageType('image')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                messageType === 'image'
                  ? 'bg-purple-500 text-white'
                  : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Image
            </button>
            <button
              onClick={() => setMessageType('voice')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                messageType === 'voice'
                  ? 'bg-purple-500 text-white'
                  : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Voice
            </button>
          </div>
        </div>

        {/* Sender */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Sender
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setMessageSender('me')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                messageSender === 'me'
                  ? 'bg-blue-500 text-white'
                  : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Me
            </button>
            <button
              onClick={() => setMessageSender('other')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                messageSender === 'other'
                  ? 'bg-blue-500 text-white'
                  : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Other
            </button>
          </div>
        </div>

        {/* Message Content */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {messageType === 'text' ? 'Message Text' : messageType === 'image' ? 'Image URL' : 'Voice Duration'}
          </label>
          
          {messageType === 'text' && (
            <textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Type your message..."
              maxLength={500}
              className={`w-full px-3 py-2 rounded-lg border text-sm resize-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              rows={3}
            />
          )}
          
          {messageType === 'image' && (
            <div className="space-y-2">
              <input
                type="text"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Enter image URL or click to generate"
                className={`w-full px-3 py-2 rounded-lg border text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
              <button
                onClick={() => setMessageContent('https://readdy.ai/api/search-image?query=Beautiful%20landscape%20photo%20with%20mountains%20and%20lake%2C%20natural%20lighting%2C%20high%20quality%20photography%2C%20scenic%20view&width=400&height=300&seq=msg-img&orientation=landscape')}
                className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Generate Sample Image
              </button>
            </div>
          )}
          
          {messageType === 'voice' && (
            <input
              type="text"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="e.g., 1:23"
              className={`w-full px-3 py-2 rounded-lg border text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          )}
        </div>

        {/* Add Message Button */}
        <button
          onClick={handleAddMessage}
          className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all whitespace-nowrap cursor-pointer"
        >
          Add Message
        </button>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className={`font-medium mb-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Quick Actions
        </h4>
        <div className="space-y-2">
          <button
            onClick={() => {
              onAddMessage({
                type: 'text',
                content: 'Hey! 👋',
                sender: 'other',
                timestamp: new Date(),
                avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20friendly%20young%20woman%20with%20shoulder%20length%20brown%20hair%2C%20warm%20smile%2C%20clean%20background%2C%20natural%20lighting%2C%20high%20quality%20portrait%20photo&width=100&height=100&seq=quick-avatar&orientation=squarish'
              });
            }}
            className={`w-full px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Add Greeting
          </button>
          <button
            onClick={() => {
              onAddMessage({
                type: 'text',
                content: 'Sounds good! 😊',
                sender: 'me',
                timestamp: new Date(),
                avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20confident%20young%20man%20with%20short%20dark%20hair%2C%20friendly%20expression%2C%20clean%20background%2C%20natural%20lighting%2C%20high%20quality%20portrait%20photo&width=100&height=100&seq=my-quick-avatar&orientation=squarish'
              });
            }}
            className={`w-full px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Add Response
          </button>
        </div>
      </div>
    </div>
  );
}
