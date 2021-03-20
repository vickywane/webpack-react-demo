// i need to split this file later !!
import { app, BrowserWindow, ipcMain, Tray, Menu, dialog, session } from 'electron';
// import { enableLiveReload } from 'electron-compile';
import path from 'path';
import storage from 'electron-json-storage';

let mainWindow;
let appIcon = null;
let authWindow;
// const isDevMode = process.execPath.match(/[\\/]electron/);
// if (isDevMode) enableLiveReload({ strategy: 'react-hmr' });

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 810,
    minHeight: 670,
    minWidth: 670,
    show: true,
    frame: true,
    backgroundColor: '#f4f4f5',
    title: 'Remotify',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  authWindow = new BrowserWindow({
    width: 500,
    height: 500,
    show: false,
    minHeight: 450,
    minWidth: 450,
    frame: false,
    resizable: false,
    backgroundColor: '#f4f4f5',
    title: 'Remotify',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);
  // Open the DevTools.
  // if (isDevMode) {
  //   mainWindow.webContents.openDevTools();
  // }

  authWindow.loadURL(`file://${__dirname}/auth/index.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  authWindow.on('closed', () => {
    authWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('activate', () => {
  if (authWindow === null) {
    createWindow();
  }
});

// to select user files in file  component
ipcMain.on('open-file-dialog', (event, arg) => {
  dialog.showOpenDialog(
    {
      properties: ['openFile', 'openDirectory'],
    },
    files => {
      if (files) {
        event.sender.send('selected-directory', files);
      }
    },
  );
});

// to select user files in file  component
ipcMain.on('open-music-dialog', (event, arg) => {
  dialog.showOpenDialog(
    {
      properties: ['openDirectory'],
    },
    files => {
      if (files) {
        event.sender.send('selected-directory', files);
      }
    },
  );
});

// Electron local-json-storage ========>
ipcMain.on('test-storage', (event, arg) => {
  const data = arg;

  storage.set('settings', { name: data }, error => {
    if (error) {
      console.log(error);
    }
  });
});

ipcMain.on('retrieve-storage', event => {
  storage.get('settings', (error, data) => {
    try {
      event.sender.send('read-storage', data);
    } catch (error) {
      console.log(error);
    }
  });
});

//  authentication part & putting details in json ===>
ipcMain.on('authenticate-user', (event, arg) => {
  mainWindow.hide();

  authWindow.show();
});

ipcMain.on('authenticated', (event, arg) => {
  /*
 session.defaultSession.cookies.set(arg).then(
    () => {
      // sucess
      authWindow.hide();

      console.log();
    },
    (error) => {
      console.log(error);
    }
  );
*/

  const data = arg;
  mainWindow.hide();

  storage.set(
    'details',
    {
      name: data.name,
      organization: data.organization,
      role: data.role,
      department: data.department,
      hours: data.hoursPerWeek,
    },
    error => {
      if (error) {
        console.log(error);
      }
    },
  );

  mainWindow.show();
  authWindow.hide();
});

// retreieves stored details
ipcMain.on('retrieve-details', event => {
  storage.get('details', (error, data) => {
    try {
      event.sender.send('read-details', data);
    } catch (error) {
      console.log(error);
    }
  });
});

ipcMain.on('clear-details', event => {
  storage.clear(error => {
    console.log(error);
  });
});

//= ===========

ipcMain.on('create-tray', event => {
  const icon = process.platform === 'win32' ? 'win.png' : 'win.png';
  const iconPath = path.join(__dirname, icon);
  appIcon = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Remove',
      click: () => {
        event.sender.send('remove-tray');
      },
    },
  ]);

  appIcon.setToolTip('Remotify');
  appIcon.setContextMenu(contextMenu);
});

ipcMain.on('delete-tray', (event, arg) => {
  appIcon.destroy();
});
