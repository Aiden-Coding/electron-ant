// Modules to control application life and create native browser window
//用于控制应用程序生命周期和创建本机浏览器窗口的模块
const electron = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')//electron-is-dev库，判断是否是开发环境
/**注意：isDev判断是否为开发环境；
开发环境就loadURL为localhost:3000
非开发环境：加载打包之后的静态文件，这里先留存之后再修改 */
const {app, BrowserWindow} = electron
const { ipcMain } = electron
const Notification = electron.Notification // 消息提醒

const TokenDao = require('./sqlite/TokenDao')
const db = require('better-sqlite3')('/Users/aiden/workspace/dev/ll/db/ll.db', null);
const tokenDao = new TokenDao(db)
function createWindow () {
  // Create the browser window.
  //创建一个窗口
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // 是指在render process(渲染线程)中可以使用nodeNodejs
      // preload: path.join(__dirname, 'preload.js') /**String (可选) -在页面运行其他脚本之前预先加载指定的脚本 无论页面是否集成Node, 此脚本都可以访问所有Node API 脚本路径为文件的绝对路径。 当 node integration 关闭时, 预加载的脚本将从全局范围重新引入node的全局引用标志 */
    }
  })
  
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  // Open the DevTools.
  //打开调试
  mainWindow.webContents.openDevTools()
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//当electron完成时，将调用此方法
//初始化，并准备创建浏览器窗口。
//有些api只能在事件发生后使用。
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    //在macOS上，重新创建一个窗口是很常见的
    //点击dock图标，没有打开其他窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

//当所有窗口关闭时退出，除了macOS。在那里,这是常见的
//让应用程序及其菜单栏保持活动状态，直到用户退出
//显式使用Cmd + Q。
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
/**
 * 当应用程序完成基础的启动的时候被触发。 
 * 在 Windows 和 Linux 中, will-finish-launching 事件与 ready 事件是相同的; 
 * 在 macOS 中，这个事件相当于 NSApplication 中的 applicationWillFinishLaunching 提示。 
 * 通常会在这里为 open-file 和 open-url 设置监听器，并启动崩溃报告和自动更新。
 */
app.on('will-finish-launching', function () {
  console.log("will-finish-launching")
})
/**
 * 当 Electron 完成初始化时被触发。 在 macOS 中, 如果从通知中心中启动，那么 launchInfo 中的 userInfo 包含用来打开应用程序的 NSUserNotification 信息。 
 * 你可以通过调用 app.isReady() 方法来检查此事件是否已触发。
 */
app.on('ready', function () {
  console.log("ready...")
})

/**
 * Emitted before the application starts closing its windows. Calling event.preventDefault() will prevent the default behavior, which is terminating the application.
 * 在应用程序开始关闭其窗口之前发出。调用event.preventDefault()将阻止默认行为，即终止应用程序。
 */
/**
 * 在 Windows 系统中，如果应用程序因系统关机/重启或用户注销而关闭，那么这个事件不会被触发。
 */
app.on('before-quit', function (e) {
  // e.preventDefault()
  console.log("before-quit")
})

/**
 * Emitted when all windows have been closed and the application will quit. Calling event.preventDefault() will prevent the default behaviour, which is terminating the application.
 * 当所有窗口都已关闭且应用程序将退出时发出。调用event.preventDefault()将阻止默认行为，即终止应用程序。
 */
/**
 * 在 Windows 系统中，如果应用程序因系统关机/重启或用户注销而关闭，那么这个事件不会被触发。
 */
app.on('will-quit', function (e) {
  // e.preventDefault()
  console.log("will-quit")
})
/**
 * 在应用程序退出时发出。
 */
app.on('quit', function (e) {
  //无法触发
  // e.preventDefault()
  console.log("quit")
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//在这个文件中，你可以包含应用程序的主进程的其他部分
//代码。您还可以将它们放在单独的文件中，并在这里使用它们。
ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  // tokenDao.saveUserToken('1')
  tokenDao.saveUserToken('1','2','3')
  event.returnValue = 'pong'
  // event.reply('synchronous-message-reply', 'pong')
})
