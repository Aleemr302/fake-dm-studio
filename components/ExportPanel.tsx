
'use client';

import { useState } from 'react';

export default function ExportPanel({ onClose, messages, platform, darkMode, chatName, networkType }) {
  const [exportFormat, setExportFormat] = useState('png');
  const [exportQuality, setExportQuality] = useState('ultra');
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);

  const getRealisticPlatformColors = () => {
    switch (platform) {
      case 'instagram':
        return {
          background: '#000000',
          headerBg: '#262626',
          myBubble: '#3797f0',
          otherBubble: '#262626',
          textColor: '#ffffff',
          otherTextColor: '#ffffff',
          inputBg: '#262626',
          iconColor: '#ffffff',
          statusBarBg: '#000000'
        };
      case 'whatsapp':
        return {
          background: '#0b141a',
          headerBg: '#2a2f32',
          myBubble: '#005c4b',
          otherBubble: '#202c33',
          textColor: '#e9edef',
          otherTextColor: '#e9edef',
          inputBg: '#2a2f32',
          iconColor: '#8696a0',
          statusBarBg: '#2a2f32'
        };
      case 'messenger':
        return {
          background: '#ffffff',
          headerBg: '#ffffff',
          myBubble: '#0084ff',
          otherBubble: '#e4e6ea',
          textColor: '#ffffff',
          otherTextColor: '#050505',
          inputBg: '#f0f0f0',
          iconColor: '#65676b',
          statusBarBg: '#ffffff'
        };
      case 'telegram':
        return {
          background: '#17212b',
          headerBg: '#17212b',
          myBubble: '#8774e1',
          otherBubble: '#182533',
          textColor: '#ffffff',
          otherTextColor: '#ffffff',
          inputBg: '#182533',
          iconColor: '#8774e1',
          statusBarBg: '#17212b'
        };
      default:
        return {
          background: '#000000',
          headerBg: '#262626',
          myBubble: '#3797f0',
          otherBubble: '#262626',
          textColor: '#ffffff',
          otherTextColor: '#ffffff',
          inputBg: '#262626',
          iconColor: '#ffffff',
          statusBarBg: '#000000'
        };
    }
  };

  const createHyperRealisticScreenshot = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio || 1;
    const baseWidth = 428;
    const baseHeight = 926;

    let scaleFactor = 1;
    switch (exportQuality) {
      case 'hd':
        scaleFactor = 2;
        break;
      case '2k':
        scaleFactor = 3;
        break;
      case '4k':
        scaleFactor = 4;
        break;
      case 'ultra':
        scaleFactor = 5;
        break;
    }

    const deviceWidth = baseWidth * scaleFactor;
    const deviceHeight = baseHeight * scaleFactor;

    canvas.width = deviceWidth;
    canvas.height = deviceHeight;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.textBaseline = 'top';

    const colors = getRealisticPlatformColors();

    const statusBarHeight = 54 * scaleFactor;
    const screenX = 0;
    const screenY = 0;
    const screenWidth = deviceWidth;
    const screenHeight = deviceHeight;

    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, deviceWidth, deviceHeight);

    ctx.fillStyle = colors.statusBarBg;
    ctx.fillRect(0, 0, deviceWidth, statusBarHeight);

    ctx.fillStyle = '#ffffff';
    ctx.font = `${17 * scaleFactor}px -apple-system, SF Pro Display, system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.lineWidth = 0.5;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    ctx.fillText(currentTime, deviceWidth / 2, (15 * scaleFactor));

    const signalX = 22 * scaleFactor;
    const signalY = 12 * scaleFactor;
    const barWidth = 3 * scaleFactor;
    const barSpacing = 4 * scaleFactor;
    const maxBarHeight = 14 * scaleFactor;

    for (let i = 0; i < 4; i++) {
      const barHeight = (maxBarHeight / 4) * (i + 1);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(signalX + i * (barWidth + barSpacing), signalY + maxBarHeight - barHeight, barWidth, barHeight);
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = `${15 * scaleFactor}px -apple-system, SF Pro Display, system-ui, sans-serif`;
    ctx.textAlign = 'left';
    ctx.fillText(networkType, signalX + 75 * scaleFactor, signalY + 2 * scaleFactor);

    const batteryX = deviceWidth - 45 * scaleFactor;
    const batteryY = 12 * scaleFactor;
    const batteryWidth = 25 * scaleFactor;
    const batteryHeight = 12 * scaleFactor;

    ctx.textAlign = 'right';
    ctx.fillStyle = '#ffffff';
    ctx.font = `${15 * scaleFactor}px -apple-system, SF Pro Display, system-ui, sans-serif`;
    ctx.fillText('100%', batteryX - 8 * scaleFactor, signalY + 2 * scaleFactor);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5 * scaleFactor;
    ctx.strokeRect(batteryX, batteryY, batteryWidth, batteryHeight);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(batteryX + batteryWidth, batteryY + 3 * scaleFactor, 2 * scaleFactor, 6 * scaleFactor);

    ctx.fillStyle = '#34c759';
    ctx.fillRect(batteryX + 2 * scaleFactor, batteryY + 2 * scaleFactor, batteryWidth - 4 * scaleFactor, batteryHeight - 4 * scaleFactor);

    if (networkType === 'WiFi') {
      const wifiX = batteryX - 35 * scaleFactor;
      const wifiY = batteryY + 6 * scaleFactor;

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5 * scaleFactor;

      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(wifiX, wifiY, i * 4 * scaleFactor, -Math.PI * 0.75, -Math.PI * 0.25);
        ctx.stroke();
      }

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(wifiX, wifiY, 1.5 * scaleFactor, 0, 2 * Math.PI);
      ctx.fill();
    }

    const headerHeight = 88 * scaleFactor;
    const headerY = statusBarHeight;

    ctx.fillStyle = colors.headerBg;
    ctx.fillRect(0, headerY, deviceWidth, headerHeight);

    if (platform === 'messenger') {
      ctx.strokeStyle = '#e4e6ea';
      ctx.lineWidth = 0.5 * scaleFactor;
      ctx.beginPath();
      ctx.moveTo(0, headerY + headerHeight);
      ctx.lineTo(deviceWidth, headerY + headerHeight);
      ctx.stroke();
    }

    ctx.fillStyle = colors.iconColor;
    ctx.font = `${24 * scaleFactor}px -apple-system, SF Pro Display, system-ui, sans-serif`;
    ctx.textAlign = 'left';
    ctx.fillText('←', 20 * scaleFactor, headerY + 25 * scaleFactor);

    const avatarX = 55 * scaleFactor;
    const avatarY = headerY + 18 * scaleFactor;
    const avatarSize = 40 * scaleFactor;

    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarX + avatarSize/2, avatarY + avatarSize/2, avatarSize/2, 0, 2 * Math.PI);
    ctx.clip();
    ctx.fillStyle = '#8b9dc3';
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = colors.textColor;
    ctx.font = `bold ${18 * scaleFactor}px -apple-system, SF Pro Display, system-ui, sans-serif`;
    ctx.textAlign = 'left';
    ctx.fillText(chatName, avatarX + avatarSize + 15 * scaleFactor, headerY + 25 * scaleFactor);

    ctx.fillStyle = colors.textColor;
    ctx.font = `${14 * scaleFactor}px -apple-system, SF Pro Display, system-ui, sans-serif`;
    ctx.globalAlpha = 0.7;
    ctx.fillText('Active now', avatarX + avatarSize + 15 * scaleFactor, headerY + 48 * scaleFactor);
    ctx.globalAlpha = 1;

    ctx.fillStyle = colors.iconColor;
    ctx.font = `${20 * scaleFactor}px -apple-system, SF Pro Display, system-ui, sans-serif`;
    ctx.textAlign = 'right';

    ctx.fillText('📞', deviceWidth - 75 * scaleFactor, headerY + 30 * scaleFactor);
    ctx.fillText('📹', deviceWidth - 25 * scaleFactor, headerY + 30 * scaleFactor);

    const messagesStartY = headerY + headerHeight + 20 * scaleFactor;
    let currentY = messagesStartY;

    messages.forEach((message, index) => {
      const isMe = message.sender === 'me';
      const messageText = message.content || '';

      ctx.font = `${17 * scaleFactor}px -apple-system, SF Pro Display, system-ui, sans-serif`;

      const maxBubbleWidth = deviceWidth * 0.65;
      const words = messageText.split(' ');
      const lines = [];
      let currentLine = '';

      words.forEach(word => {
        const testLine = currentLine + word + ' ';
        const testWidth = ctx.measureText(testLine).width;

        if (testWidth > maxBubbleWidth - 32 * scaleFactor && currentLine !== '') {
          lines.push(currentLine.trim());
          currentLine = word + ' ';
        } else {
          currentLine = testLine;
        }
      });

      if (currentLine.trim()) {
        lines.push(currentLine.trim());
      }

      const lineHeight = 22 * scaleFactor;
      const bubbleHeight = Math.max(44 * scaleFactor, (lines.length * lineHeight) + 24 * scaleFactor);
      const bubbleWidth = Math.min(maxBubbleWidth, Math.max(...lines.map(line => ctx.measureText(line).width)) + 32 * scaleFactor);

      const bubbleX = isMe ? deviceWidth - bubbleWidth - 20 * scaleFactor : 20 * scaleFactor;
      const bubbleY = currentY;

      ctx.save();

      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 4 * scaleFactor;
      ctx.shadowOffsetY = 2 * scaleFactor;

      ctx.fillStyle = isMe ? colors.myBubble : colors.otherBubble;
      ctx.beginPath();

      const radius = 20 * scaleFactor;
      ctx.moveTo(bubbleX + radius, bubbleY);
      ctx.lineTo(bubbleX + bubbleWidth - radius, bubbleY);
      ctx.quadraticCurveTo(bubbleX + bubbleWidth, bubbleY, bubbleX + bubbleWidth, bubbleY + radius);
      ctx.lineTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight - radius);
      ctx.quadraticCurveTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight, bubbleX + bubbleWidth - radius, bubbleY + bubbleHeight);
      ctx.lineTo(bubbleX + radius, bubbleY + bubbleHeight);
      ctx.quadraticCurveTo(bubbleX, bubbleY + bubbleHeight, bubbleX, bubbleY + bubbleHeight - radius);
      ctx.lineTo(bubbleX, bubbleY + radius);
      ctx.quadraticCurveTo(bubbleX, bubbleY, bubbleX + radius, bubbleY);
      ctx.fill();

      ctx.restore();

      ctx.fillStyle = isMe ? colors.textColor : colors.otherTextColor;
      ctx.font = `${17 * scaleFactor}px -apple-system, SF Pro Display, system-ui, sans-serif`;
      ctx.textAlign = 'left';

      lines.forEach((line, lineIndex) => {
        ctx.fillText(line, bubbleX + 16 * scaleFactor, bubbleY + 18 * scaleFactor + (lineIndex * lineHeight));
      });

      ctx.fillStyle = isMe ? colors.textColor : colors.otherTextColor;
      ctx.font = `${13 * scaleFactor}px -apple-system, SF Pro Display, system-ui, sans-serif`;
      ctx.globalAlpha = 0.6;

      const timeText = message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      ctx.textAlign = isMe ? 'right' : 'left';
      ctx.fillText(timeText, isMe ? bubbleX + bubbleWidth - 16 * scaleFactor : bubbleX + 16 * scaleFactor, bubbleY + bubbleHeight - 12 * scaleFactor);
      ctx.globalAlpha = 1;

      currentY += bubbleHeight + 12 * scaleFactor;
    });

    const typingY = currentY;
    const typingX = 20 * scaleFactor;
    const typingWidth = 64 * scaleFactor;
    const typingHeight = 44 * scaleFactor;

    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 4 * scaleFactor;
    ctx.shadowOffsetY = 2 * scaleFactor;

    ctx.fillStyle = colors.otherBubble;
    ctx.beginPath();

    const typingRadius = 20 * scaleFactor;
    ctx.moveTo(typingX + typingRadius, typingY);
    ctx.lineTo(typingX + typingWidth - typingRadius, typingY);
    ctx.quadraticCurveTo(typingX + typingWidth, typingY, typingX + typingWidth, typingY + typingRadius);
    ctx.lineTo(typingX + typingWidth, typingY + typingHeight - typingRadius);
    ctx.quadraticCurveTo(typingX + typingWidth, typingY + typingHeight, typingX + typingWidth - typingRadius, typingY + typingHeight);
    ctx.lineTo(typingX + typingRadius, typingY + typingHeight);
    ctx.quadraticCurveTo(typingX, typingY + typingHeight, typingX, typingY + typingHeight - typingRadius);
    ctx.lineTo(typingX, typingY + typingRadius);
    ctx.quadraticCurveTo(typingX, typingY, typingX + typingRadius, typingY);
    ctx.fill();

    ctx.restore();

    ctx.fillStyle = colors.otherTextColor;
    ctx.globalAlpha = 0.6;

    const dotRadius = 3 * scaleFactor;
    const dotSpacing = 8 * scaleFactor;
    const dotsStartX = typingX + 20 * scaleFactor;
    const dotsY = typingY + typingHeight / 2;

    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(dotsStartX + i * dotSpacing, dotsY, dotRadius, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    const inputAreaHeight = 88 * scaleFactor;
    const inputY = deviceHeight - inputAreaHeight;

    ctx.fillStyle = colors.background;
    ctx.fillRect(0, inputY, deviceWidth, inputAreaHeight);

    const inputFieldX = 16 * scaleFactor;
    const inputFieldY = inputY + 24 * scaleFactor;
    const inputFieldWidth = deviceWidth - 88 * scaleFactor;
    const inputFieldHeight = 40 * scaleFactor;

    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 2 * scaleFactor;
    ctx.shadowOffsetY = 1 * scaleFactor;

    ctx.fillStyle = colors.inputBg;
    ctx.beginPath();
    ctx.roundRect(inputFieldX, inputFieldY, inputFieldWidth, inputFieldHeight, 20 * scaleFactor);
    ctx.fill();

    ctx.restore();

    ctx.fillStyle = colors.iconColor;
    ctx.font = `${16 * scaleFactor}px -apple-system, SF Pro Display, system-ui, sans-serif`;
    ctx.textAlign = 'left';
    ctx.globalAlpha = 0.5;
    ctx.fillText('Message...', inputFieldX + 20 * scaleFactor, inputFieldY + 16 * scaleFactor);
    ctx.globalAlpha = 1;

    const sendButtonX = deviceWidth - 52 * scaleFactor;
    const sendButtonY = inputFieldY + 8 * scaleFactor;
    const sendButtonRadius = 24 * scaleFactor;

    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
    ctx.shadowBlur = 4 * scaleFactor;
    ctx.shadowOffsetY = 2 * scaleFactor;

    ctx.fillStyle = colors.myBubble;
    ctx.beginPath();
    ctx.arc(sendButtonX, sendButtonY, sendButtonRadius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();

    ctx.fillStyle = '#ffffff';
    ctx.font = `${18 * scaleFactor}px -apple-system, SF Pro Display, system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('→', sendButtonX, sendButtonY - 8 * scaleFactor);

    const homeIndicatorWidth = 134 * scaleFactor;
    const homeIndicatorHeight = 5 * scaleFactor;
    const homeIndicatorX = (deviceWidth - homeIndicatorWidth) / 2;
    const homeIndicatorY = deviceHeight - 12 * scaleFactor;

    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.roundRect(homeIndicatorX, homeIndicatorY, homeIndicatorWidth, homeIndicatorHeight, homeIndicatorHeight / 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    return canvas;
  };

  const handleExport = async () => {
    try {
      const canvas = createHyperRealisticScreenshot();

      const quality = exportFormat === 'jpg' ? 0.98 : 1.0;
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `hyper-realistic-dm-${platform}-${exportQuality}-${Date.now()}.${exportFormat}`;
        a.click();
        URL.revokeObjectURL(url);
      }, `image/${exportFormat}`, quality);

    } catch (error) {
      console.error('Export error:', error);
    }
  };

  const handleShare = () => {
    const link = `https://fakedm.studio/share/${Math.random().toString(36).substr(2, 9)}`;
    setShareLink(link);
    setShowShareOptions(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert('Link copied to clipboard!');
  };

  const handleGenerateQR = () => {
    setShowQRCode(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Export Ultra-Realistic Screenshot
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer ${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600'}`}
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Export Format
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setExportFormat('png')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  exportFormat === 'png'
                    ? 'bg-purple-500 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                PNG (Best Quality)
              </button>
              <button
                onClick={() => setExportFormat('jpg')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  exportFormat === 'jpg'
                    ? 'bg-purple-500 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                JPG (Smaller)
              </button>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Resolution Quality
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setExportQuality('hd')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  exportQuality === 'hd'
                    ? 'bg-purple-500 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                HD (2x)
              </button>
              <button
                onClick={() => setExportQuality('2k')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  exportQuality === '2k'
                    ? 'bg-purple-500 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                2K (3x)
              </button>
              <button
                onClick={() => setExportQuality('4k')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  exportQuality === '4k'
                    ? 'bg-purple-500 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                4K (4x)
              </button>
              <button
                onClick={() => setExportQuality('ultra')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  exportQuality === 'ultra'
                    ? 'bg-purple-500 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Ultra (5x)
              </button>
            </div>
          </div>

          <button
            onClick={handleExport}
            className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all whitespace-nowrap cursor-pointer"
          >
            <i className="ri-download-line mr-2"></i>
            Download Hyper-Realistic {exportFormat.toUpperCase()}
          </button>

          <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'}`}>
            <div className="flex items-center gap-2 mb-2">
              <i className="ri-information-line text-blue-500"></i>
              <span className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                Hyper-Realistic Features
              </span>
            </div>
            <ul className={`text-xs space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• Ultra-high resolution with anti-aliasing</li>
              <li>• Realistic iOS status bar and UI elements</li>
              <li>• Authentic platform colors and styling</li>
              <li>• Proper shadows and lighting effects</li>
              <li>• Crisp text rendering at any zoom level</li>
            </ul>
          </div>

          <div className="border-t pt-6">
            <h3 className={`font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Share Options
            </h3>

            <div className="space-y-3">
              <button
                onClick={handleShare}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <i className="ri-share-line mr-2"></i>
                Generate Share Link
              </button>

              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <i className="ri-clipboard-line mr-2"></i>
                Copy to Clipboard
              </button>

              <button
                onClick={handleGenerateQR}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <i className="ri-qr-code-line mr-2"></i>
                Generate QR Code
              </button>
            </div>
          </div>

          {showShareOptions && shareLink && (
            <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Share link (expires in 7 days):
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className={`flex-1 px-3 py-2 rounded-lg border text-sm ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition-colors cursor-pointer"
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          {showQRCode && (
            <div className={`p-4 rounded-lg border text-center ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                QR Code:
              </p>
              <div className="w-32 h-32 bg-white mx-auto rounded-lg flex items-center justify-center">
                <i className="ri-qr-code-line text-4xl text-gray-400"></i>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Scan to view shared chat
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
