const express = require('express')
const path = require('path');
const cors = require('cors');
const { app, BrowserWindow } = require('electron');
const mongoose = require('mongoose');
const router = require(path.join(__dirname, 'app', 'controllers', 'router.js'))
const config = require(path.join(__dirname, 'app', 'config', 'config.js'));

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

// Mongo DB

async function connect(){
  const mongoConection = `mongodb+srv://admin:${config.password}@cortes.9iadh5h.mongodb.net/CortesDB`;
  let db = mongoose.connection;
  db.on('connecting', () => {
      console.log('Connecting...');
  });
  db.on('connected', () => {
      console.log('Connected succesfully');
  });
  await mongoose.connect(mongoConection, {useNewUrlParser: true});
}

// Servidor
const server = express();
server.use(express.json());
server.use(cors());
const PORT = process.env.PORT || 3000;

server.use('/', router);

server.get('/', (req, res) => {
  res.send("Hola mundo")
})

connect();

server.listen(PORT, () => {
    console.log("server running on port " + PORT);
})
