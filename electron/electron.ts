const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 1920,
    height: 1200,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Load URL for express server (not needed since we added the backend server to localhost:8000 through client/index.html)
  // win.loadURL(`http://localhost:8000/`)

  // OR load the index.html of the app.
  win.loadFile('index.html');

  // To open devtools, uncomment below:
  // win.webContents.openDevTools()
}

// When the app is ready, create an electron window.
app.on('ready', createWindow);