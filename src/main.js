const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);

async function findConfigFile(directory) {
    try {
        const files = await readdir(directory);
        for (const file of files) {
            const fullPath = path.join(directory, file);
            const stats = await stat(fullPath);
            if (stats.isDirectory()) {
                const configFilePath = path.join(fullPath, 'config.mcsi');
                try {
                    await stat(configFilePath);
                    return fullPath;
                } catch (err) {
                    const result = await findConfigFile(fullPath);
                    if (result) {
                        return result;
                    }
                }
            }
        }
        return null;
    } catch (err) {
        console.error('Error reading directory:', err);
        return null;
    }
}

async function loadServerData(filePath) {
    try {
        const content = await readFile(filePath, 'utf-8');
        const config = {};
        const lines = content.split('\n');
        lines.forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                config[key.trim()] = value.trim().replace(/(^"|"$)/g, '');
            }
        });
        return config;
    } catch (error) {
        console.error('Error reading config.mcsi file:', error);
        return null;
    }
}

function createWindow () {
    const win = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
        title: 'MineServer Imager',
        icon: path.join(__dirname, 'icon.ico'),
        frame: false,
        resizable: false,
        maximizable: false,
        minimizable: true,
    });

    win.loadFile('index.html');

    win.webContents.on('did-navigate', (event, url) => {
        if (url.endsWith('server.html')) {
            win.setSize(1200, 900); // server_create.html の場合のウィンドウサイズ
        } else {
            win.setSize(900, 600); // デフォルトのウィンドウサイズ
        }
    });

    ipcMain.handle('find-config-file', async () => {
        const serversDir = path.join(__dirname, 'servers');
        const folderPath = await findConfigFile(serversDir);
        if (folderPath) {
            const filePath = path.join(folderPath, 'config.mcsi');
            return await loadServerData(filePath);
        }
        return null;
    });

    ipcMain.handle('load-server-data', async () => {
        const serversDir = path.join(__dirname, 'servers');
        const folderPath = await findConfigFile(serversDir);
        if (folderPath) {
            const filePath = path.join(folderPath, 'config.mcsi');
            return await loadServerData(filePath);
        }
        return null;
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
