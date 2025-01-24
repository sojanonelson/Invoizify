import React, { useState, useEffect } from "react";
import {
  Printer,
  Moon,
  Sun,
  Settings as SettingsIcon,
  Download,
  RefreshCcw,
  Check,
  Server,
} from "lucide-react";

import { getTheme, setTheme } from "../services/localstorageService";

const Settings = (theme) => {
  const [settings, setSettings] = useState({
    appearance: false,
    printing: {
      defaultPrinter: "HP LaserJet Pro",
      paperSize: "A4",
      colorMode: "grayscale",
      copies: 1,
    },
    system: {
      autoStart: false,
      autoUpdate: true,
      startMinimized: false,
    },
    updateStatus: "idle", // idle, checking, upToDate, error
  });

  const [updateProgress, setUpdateProgress] = useState(0);

  // Load theme from localStorage on initial render
  const toggleAppearance = () => {
    const newTheme = !settings.appearance;
    setSettings((prev) => ({ ...prev, appearance: newTheme }));
    setTheme(newTheme); // Save boolean to localStorage
  };
  
  useEffect(() => {
    const savedTheme = getTheme();
    console.log(savedTheme)
    if (savedTheme) {
      setSettings((prev) => ({ ...prev, appearance: savedTheme }));
    }
  }, []);

  console.log("H",theme.theme)
  

  const simulateUpdateCheck = () => {
    setSettings((prev) => ({ ...prev, updateStatus: "checking" }));
    setUpdateProgress(0);

    const interval = setInterval(() => {
      setUpdateProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setSettings((prev) => ({ ...prev, updateStatus: "upToDate" }));
      setUpdateProgress(100);
    }, 2500);
  };

  const updateSetting = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  return (
    <div
      className={`w-full min-h-screen p-6 ${
        settings.appearance 
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SettingsIcon className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold">Software Settings</h1>
          </div>
          <button
            onClick={toggleAppearance}
            className={`p-2 rounded-full transition-colors ${
              settings.appearance === "dark"
                ? "bg-yellow-400 text-black hover:bg-yellow-500"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {settings.appearance === "dark" ? <Sun /> : <Moon />}
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <Printer className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Printing Settings</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Default Printer</label>
              <select 
                value={settings.printing.defaultPrinter}
                onChange={(e) => updateSetting('printing', 'defaultPrinter', e.target.value)}
                className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
              >
                <option>HP LaserJet Pro</option>
                <option>Canon ImageCLASS</option>
                <option>Epson WorkForce</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Paper Size</label>
              <select 
                value={settings.printing.paperSize}
                onChange={(e) => updateSetting('printing', 'paperSize', e.target.value)}
                className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
              >
                <option>A4</option>
                <option>Letter</option>
                <option>Legal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Color Mode</label>
              <select 
                value={settings.printing.colorMode}
                onChange={(e) => updateSetting('printing', 'colorMode', e.target.value)}
                className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
              >
                <option value="grayscale">Grayscale</option>
                <option value="color">Color</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Copies</label>
              <input 
                type="number" 
                value={settings.printing.copies}
                onChange={(e) => updateSetting('printing', 'copies', parseInt(e.target.value))}
                min="1" 
                max="100"
                className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <Server className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">System Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Auto Start with Windows</p>
                <p className="text-sm text-gray-500">Launch software on system startup</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.system.autoStart}
                  onChange={() => updateSetting('system', 'autoStart', !settings.system.autoStart)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer-checked:bg-blue-500 transition-all"></div>
              </label>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Automatic Updates</p>
                <p className="text-sm text-gray-500">Receive latest software updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.system.autoUpdate}
                  onChange={() => updateSetting('system', 'autoUpdate', !settings.system.autoUpdate)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer-checked:bg-blue-500 transition-all"></div>
              </label>
            </div>
          </div>
        </div>


        {/* Update Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Download className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold">Software Update</h2>
            </div>
            <p className="text-sm text-gray-500">Current Version: 2.3.1</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={simulateUpdateCheck}
              disabled={settings.updateStatus === "checking"}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                settings.updateStatus === "checking"
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              <RefreshCcw
                className={`w-4 h-4 ${
                  settings.updateStatus === "checking" ? "animate-spin" : ""
                }`}
              />
              <span>Check for Updates</span>
            </button>
            {settings.updateStatus === "checking" && (
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-200 ease-in-out"
                  style={{ width: `${updateProgress}%` }}
                />
              </div>
            )}
            
            {settings.updateStatus === "upToDate" && (
              <div className="flex items-center space-x-2 text-green-500">
                <Check className="w-5 h-5" />
                <span>Software is up to date</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
