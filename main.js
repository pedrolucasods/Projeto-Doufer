// electron/main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const { startServer } = require('./src/backend/server');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Carrega a URL do Express
  mainWindow.loadURL('http://localhost:3000');

  // Abre o DevTools opcionalmente
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(async () => {
  try {
    await startServer(3000);
    createWindow();
  } catch (err) {
    console.error('Erro ao iniciar servidor Express:', err);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});







