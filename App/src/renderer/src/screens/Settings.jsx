import React, { useState } from 'react';
import { 
  RefreshCcw,
  Check,
  XCircle,
  Download,
  Cog
} from 'lucide-react';
// import sendNotification from '../utils/Notification';
const Settings = () => {
  const [updateStatus, setUpdateStatus] = useState('idle'); // idle, checking, available, upToDate, error
  const [progress, setProgress] = useState(0);
  const [settings, setSettings] = useState({
    autoUpdate: true,
    notifyOnUpdate: true,
    currentVersion: '2.1.0'
  });

  const simulateUpdateCheck = () => {
    setUpdateStatus('checking');
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate check completion
    setTimeout(() => {
      clearInterval(interval);
      setUpdateStatus('upToDate');
      setProgress(100);
      // sendNotification('Invoizify' , 'Your application up to date')
    }, 2500);
  };

  const getUpdateStatusDisplay = () => {
    switch (updateStatus) {
      case 'checking':
        return (
          <div className="flex items-center space-x-3">
            <RefreshCcw className="w-5 h-5 animate-spin text-blue-500" />
            <span>Checking for updates...</span>
          </div>
        );
      case 'available':
        return (
          <div className="flex items-center space-x-3 text-green-500">
            <Download className="w-5 h-5" />
            <span>Update available!</span>
          </div>
        );
      case 'upToDate':
        return (
          <div className="flex items-center space-x-3 text-green-500">
            <Check className="w-5 h-5" />
            <span>Your software is up to date!</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center space-x-3 text-red-500">
            <XCircle className="w-5 h-5" />
            <span>Error checking for updates</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-h-screen bg-slate-100 p-2">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Cog className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-semibold text-gray-900">Software Settings</h1>
        </div>

        {/* Update Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Software Updates</h2>
          </div>
          <div className="p-6 space-y-6">
            {/* Version Info */}
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Current Version</p>
                <p className="text-lg font-medium">{settings.currentVersion}</p>
              </div>
              <button
                onClick={simulateUpdateCheck}
                disabled={updateStatus === 'checking'}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 
                  ${updateStatus === 'checking' 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                <RefreshCcw className={`w-4 h-4 ${updateStatus === 'checking' ? 'animate-spin' : ''}`} />
                <span>Check for Updates</span>
              </button>
            </div>

            {/* Progress Bar */}
            {updateStatus === 'checking' && (
              <div className="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-200 ease-in-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Status Display */}
            <div className="h-8 flex items-center justify-center">
              {getUpdateStatusDisplay()}
            </div>

            {/* Update Settings */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Automatic Updates</p>
                  <p className="text-sm text-gray-500">Download and install updates automatically</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={settings.autoUpdate}
                    onChange={() => setSettings(prev => ({...prev, autoUpdate: !prev.autoUpdate}))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Update Notifications</p>
                  <p className="text-sm text-gray-500">Get notified when updates are available</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={settings.notifyOnUpdate}
                    onChange={() => setSettings(prev => ({...prev, notifyOnUpdate: !prev.notifyOnUpdate}))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;