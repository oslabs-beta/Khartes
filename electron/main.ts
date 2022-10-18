import { app, BrowserWindow } from 'electron';


// mainWindow is the browser window, but it cannot be created before the app is 'ready'
let mainWindow: any = null;



app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {backgroundThrottling: false}
  });
  mainWindow.loadURL(`file://${__dirname}/client/index.html`);
})