import { app, shell, BrowserWindow, globalShortcut, Notification  } from 'electron';
import { join } from 'path';
// import sendNotification from '../renderer/src/utils/Notification';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    icon: join(__dirname, '../../resources/icon.png'),
    webPreferences: {
      preload: join(__dirname, 'out/preload/index.js'), 
    },
  });

  // Show the window only when ready
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  // Handle external links in the default browser
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  const rendererURL = process.env['ELECTRON_RENDERER_URL'];
  if (rendererURL) {
    mainWindow.loadURL(rendererURL);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

function registerGlobalShortcut() {
  globalShortcut.register('Alt+I', () => {
    if (mainWindow) {
      if (!mainWindow.isVisible()) {
        mainWindow.show();
      }
      mainWindow.focus();
    }
  });
}



// const showNotification = (title, body) => {
//   const notification = new Notification({
//     title,
//     body,
//     icon: join(__dirname, '../../resources/icon.png'),
//   });

//   notification.show();

//   // Optional: Log when notification is clicked
//   notification.on('click', () => {
//     console.log('Notification clicked');
//   });
// };



function setupAutoLaunch() {
  app.setLoginItemSettings({
    openAtLogin: true, // Enable auto-launch on system startup
    path: app.getPath('exe'),
  });
}

app.whenReady().then(() => {
  createWindow();
  registerGlobalShortcut();
  // sendNotification("welcome","Test Notification")
  setupAutoLaunch();

  // Recreate the window on macOS when the dock icon is clicked and no windows are open
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('will-quit', () => {
  // Unregister all shortcuts when the app quits
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
