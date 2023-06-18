const express = require('express')
const path = require('path');
const cors = require('cors');
const { app, BrowserWindow } = require('electron');

app.whenReady().then(() => {
    const mainWindow = new BrowserWindow({
        titleBarStyle: 'hidden',
        titleBarOverlay: true,
        icon: './public/imgs/icon.ico'
    });
  
    mainWindow.loadFile(path.join(__dirname, 'views', 'index.html'));
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
