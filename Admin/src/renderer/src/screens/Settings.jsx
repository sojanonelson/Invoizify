import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'Light Mode',
    notifications: true,
    autoUpdate: false,
  });

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h1 className="text-xl font-bold mb-4">Settings</h1>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Theme</span>
          <select
            value={settings.theme}
            onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
            className="border rounded-md px-2 py-1"
          >
            <option>Light Mode</option>
            <option>Dark Mode</option>
          </select>
        </div>
        <div className="flex justify-between items-center">
          <span>Email Notifications</span>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={() => toggleSetting('notifications')}
          />
        </div>
        <div className="flex justify-between items-center">
          <span>Enable Auto Updates</span>
          <input
            type="checkbox"
            checked={settings.autoUpdate}
            onChange={() => toggleSetting('autoUpdate')}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
