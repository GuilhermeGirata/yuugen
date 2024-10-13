const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('../src/services/database');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(__dirname, '../public/index.html'));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// IPC Handlers for Menu Items
ipcMain.handle('get-menu-items', (event) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM menu', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
});

ipcMain.handle('add-menu-item', (event, item) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO menu (name, price) VALUES (?, ?)',
      [item.name, item.price],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...item });
        }
      }
    );
  });
});