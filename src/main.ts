// Modules to control application life and create native browser window
import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

const settingdir = path.join(require('os').homedir(), 'Dynamica', 'setting.json');

const initialize = () : any => {
  try {
    return JSON.parse(fs.readFileSync(settingdir).toString());
  } catch (e) {
    fs.writeFileSync(settingdir, '{}');
    return initialize();
  }
};

let setting: JSON = initialize();
let window: BrowserWindow;

const getImage = () => {
  for (let i in setting) {
    
  }
};

const imageSender = () => {
  if (false) window.webContents.send('change-image', getImage());  // TODO: GET FILEPATH!
};

const createWindow = () => {
  // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  window = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // set full screen
  window.setFullScreen(true);
  window.setMenu(null);

  // and load the index.html of the app.
  window.loadFile('build/index.html');

  // Open the DevTools.
  // window.webContents.openDevTools();

  // setup initializer
  window.webContents.on('did-finish-load', imageSender);

  // set interval to update background
  setInterval(imageSender, 60000);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
