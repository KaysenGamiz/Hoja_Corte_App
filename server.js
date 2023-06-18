const express = require('express')
const path = require('path');
const cors = require('cors');
const { app, BrowserWindow } = require('electron');

// Electron App
app.whenReady().then(() => {
    const mainWindow = new BrowserWindow({
        titleBarStyle: 'hidden',
        titleBarOverlay: true,
        icon: path.join(__dirname, 'app', 'public', 'imgs', 'icon.ico')
    });
  
    console.log(__dirname)

    mainWindow.loadFile(path.join(__dirname, 'app','views', 'index.html'));
    mainWindow.maximize();
  
    mainWindow.on('closed', () => {
      app.quit();
    });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Servidor
const server = express();
server.use(express.json());
server.use(cors());
const PORT = process.env.PORT || 3000;

server.get('/', (req, res) => {
    res.send('¡Hola mundo!');
  });

server.listen(PORT, () => {
    console.log("server running on port " + PORT);
})
