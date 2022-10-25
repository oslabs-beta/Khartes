const { app, BrowserWindow } = require('electron');
const path = require('path');
// import electronReload from "electron-reload"; // downloading this, we can utilize electron hot-reloading
// // requiring express server to connect to backend
// // require('../server/index.ts'); // this is where the error is, cannot get these connected
// // const server = require('./app'); still not working..

// electronReload(__dirname, {}); // this function allows us to hot Reload in electron
// try {
// 	require('electron-reloader')(module);
// } catch {}

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // load URL for express server (not needed since we added the backend server to localhost:8000 through client/index.html)
  // win.loadURL(`http://localhost:8000/`)
  // and load the index.html of the app.
  win.loadFile('index.html');
  // to open devtools, uncomment below:
  win.webContents.openDevTools()
  

}

// app.whenReady().then(createWindow);
app.on('ready', createWindow);

// const {app, BrowserWindow} = require('electron')
// const path = require('path')
// const url = require('url')

// // Keep a global reference of the window object, if you don't, the window will
// // be closed automatically when the JavaScript object is garbage collected.
// let win: any;

// function createWindow () {
//   // Create the browser window.
//   win = new BrowserWindow({width: 800, height: 600})

//   // and load the index.html of the app.
//   win.loadURL(url.format({
//     pathname: path.join(__dirname, 'index.html'),
//     protocol: 'file:',
//     slashes: true
//   }))

//   win.loadURL(`file://${__dirname}/index.html`)
//   // Open the DevTools.
//   win.webContents.openDevTools()

//   // Emitted when the window is closed.
//   win.on('closed', () => {
//     // Dereference the window object, usually you would store windows
//     // in an array if your app supports multi windows, this is the time
//     // when you should delete the corresponding element.
//     win = null
//   })
// }

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready', createWindow)

// // Quit when all windows are closed.
// app.on('window-all-closed', () => {
//   // On macOS it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// app.on('activate', () => {
//   // On macOS it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (win === null) {
//     createWindow()
//   }
// })

// // In this file you can include the rest of your app's specific main process
// // code. You can also put them in separate files and require them here.