import { app, shell, BrowserWindow } from 'electron';
import { join } from 'path';


function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    icon: join(__dirname, '../../resources/icon.png'), // Platform-agnostic icon
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'), // Preload script
      sandbox: false
    }
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


app.whenReady().then(() => {
  createWindow();

  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
