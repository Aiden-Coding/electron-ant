const { ipcMain } = require('electron')
const tokenDao = require('../sqlite/TokenDao')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  tokenDao.saveUserToken('1','2','3')
  event.reply('asynchronous-reply', 'pong')
})
