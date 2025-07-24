'use client';

export default function PlatformSelector({ platforms, selectedPlatform, onSelect, darkMode }) {
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Platform
      </h3>
      
      <div className="grid grid-cols-2 gap-2">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => onSelect(platform.id)}
            className={`p-3 rounded-lg border transition-all cursor-pointer ${
              selectedPlatform === platform.id
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : darkMode
                ? 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <i className={`${platform.icon} text-lg`}></i>
              <span className="text-xs font-medium">{platform.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}