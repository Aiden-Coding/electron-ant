# 学习日志
## .prettierrc 代码格式化配置
    {
      "printWidth": 100, // 超过最大值换行 
        "overrides": [
            {
                "files": ".prettierrc",
                "options": { "parser": "json" }
            }
        ],
      "tabWidth": 4, // 缩进字节数 
      "useTabs": false, // 缩进不使用tab，使用空格 
      "semi": true, // 句尾添加分号 
      "singleQuote": true, // 使用单引号代替双引号 
      "proseWrap": "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行 
      "arrowParens": "avoid", // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号 
      "bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }" 
      "disableLanguages": ["vue"], // 不格式化vue文件，vue文件的格式化单独设置 
      "endOfLine": "auto", // 结尾是 \n \r \n\r auto
      "eslintIntegration": false, //不让prettier使用eslint的代码格式进行校验 
      "htmlWhitespaceSensitivity": "ignore",
      "ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中  
      "jsxBracketSameLine": false, // 在jsx中把'>' 是否单独放一行
      "jsxSingleQuote": false, // 在jsx中使用单引号代替双引号  "prettier.parser": "babylon", // 格式化的解析器，默认是babylon
      "requireConfig": false, // Require a 'prettierconfig' to format prettier  
      "stylelintIntegration": false, //不让prettier使用stylelint的代码格式进行校验  
      "trailingComma": "es5", // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
      "prettier.tslintIntegration": false // 不让prettier使用tslint的代码格式进行校验
    }

## .editorconfig 代码格式化配置 webstorm等开发工具
## eslintrc 代码规则检测 工具


 [0] NODE_MODULE_VERSION 83. This version of Node.js requires 
 [0] NODE_MODULE_VERSION 80. Please try re-compiling or re-installing
## electron node_module_version 版本不匹配
  npm install --save-dev electron-rebuild
  npm install
  ./node_modules/.bin/electron-rebuild （win下切记  /  改为  \）


### umijs站点配置到非站点根目录下处理
1.config/config.js中

export default {中加上如下：

history: 'hash', //采用hash路由：#/xxx的形式

base:'./',

publicPath:'./',

（会自动将/static/xxx.jpg之类的和umi.js中的a.p="/"及index.html中window.routerBase中该值进行替换）

2.生成出来的dist目录中index.html所有路径改成./xxx这种形式。（可能color.less路径还没有变成./）

3.src/utils/request.js中

return fetch(url, newOptions)

改为

return fetch("."+url, newOptions)

所有ajax请求根目录从.开始

4.注销后重新登录url错误问题

src/models/login.js

routerRedux.push({
  pathname: '/user/login',
  search: stringify({
    redirect: window.location.href,
  }),
})
修改为

 

routerRedux.push({
  pathname: '/user/login',
  search: stringify({
    redirect: window.location.hash,
  }),
})

# 1.创建react项目
## 安装 create-react-app 命令,如果已将安装请忽略
npm install -g create-react-app
## 创建 ll 项目
create-react-app ll
## 启动项目( create-react-app 真的超级方便啊)
cd ll && npm start

-------
# 2.创建electron项目
## github上有一个 electron-quick-start 仓库克隆下来
git clone https://github.com/electron/electron-quick-start
## 进入文件夹
cd electron-quick-start
## 安装依赖包并运行
npm install && npm start

----

# 3.添加electron包
## 在ll 目录下安装 Electron 包
npm install -save electron

-----

# 4.配置
## 1.配置 main.js
    根目录(不是 src 目录)下面新建 main.js 文件,这个文件和 electron-quick-start 中的官方默认 main.js 几乎一模一样，只修改了加载应用这入口这一个地方：
    // 引入electron并创建一个Browserwindow
    const {app, BrowserWindow} = require('electron')
    const path = require('path')
    const url = require('url')
    // 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
    let mainWindow
    function createWindow () {
    //创建浏览器窗口,宽高自定义具体大小你开心就好
    mainWindow = new BrowserWindow({width: 800, height: 600})
    /* 
    * 加载应用----- electron-quick-start中默认的加载入口
    mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
    }))
    */
    // 加载应用----适用于 react 项目
    mainWindow.loadURL('http://localhost:3000/');
    
    // 打开开发者工具，默认不打开
    // mainWindow.webContents.openDevTools()
    // 关闭window时触发下列事件.
    mainWindow.on('closed', function () {
    mainWindow = null
    })
    }
    // 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
    app.on('ready', createWindow)
    // 所有窗口关闭时退出应用.
    app.on('window-all-closed', function () {
    // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
    if (process.platform !== 'darwin') {
    app.quit()
    }
    })
    app.on('activate', function () {
    // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
    if (mainWindow === null) {
    createWindow()
    }
    })
    // 你可以在这个脚本中续写或者使用require引入独立的js文件.
## 2.配置 package.json
    {
        "name": "ll",
        "version": "0.1.0",
        "private": true,
        "main": "main.js", // 配置启动文件
        "homepage":".", // 
        "dependencies": {
            "electron": "^1.7.10",
            "react": "^16.2.0",
            "react-dom": "^16.2.0",
            "react-scripts": "1.1.0"
        },
        "scripts": {
            "start": "react-scripts start",
            "build": "react-scripts build",
            "test": "react-scripts test --env=jsdom",
            "eject": "react-scripts eject",
            "electron-start": "electron ." // 配置electron的start，区别于web端的start
        }
    }
## 3.启动项目
### 启动react项目
npm start
### 启动electron
npm run electron-start

## 4.打包
打包 react 项目
### 首先修改 main.js, 因为现在你要将 react 项目打包在 build 文件夹下面，所以加载应用处改成如下！当然也可在某个配置文件里面配置是否属于开发，此处用if判断一下从未进行选择执行哪段加载应用代码。但是这里为了简便，暂且使用直接修改的方式：
    // 加载应用----react 打包
    mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './build/index.html'),
    protocol: 'file:',
    slashes: true
    }))
    // 加载应用----适用于 react 开发时项目
    // mainWindow.loadURL('http://localhost:3000/');
### 默认情况下，homepage 是 http://localhost:3000，build 后，所有资源文件路径都是 /static，而 Electron 调用的入口是 file :协议，/static 就会定位到根目录去，所以找不到静态文件。在 package.json 文件中添加 homepage 字段并设置为"."后，静态文件的路径就变成了相对路径，就能正确地找到了添加如下配置：
    "homepage":"."

### 然后就开始打包 react
npm run-script build

### 打包 electron
electron-builder打包

    //安装electron-builder
    cnpm install electron-builder --save-dev
    //package.json中添加相关build配置
    "build": {
    "appId": "smileyqp",
    "productName": "smileyqp",
    "copyright": "Copyright © 2019 ${author}",
    "files": [
      "build/**/*",
      "node_modules/**/*",
      "package.json"
    ],
    "directories": {
      "buildResources": "assets"
    },
    "extraMetadata": {
      "main": "./build/main.js"
    },
    "extends": null,
    "mac": {
      "category": "public.app-category.productivity",
      "artifactName": "${productName}-${version}-${arch}.${ext}"
    },
    "dmg": {
      "background": "assets/smileyqp.jpg",
      "icon": "assets/icon.icns",
      "iconSize": 100,
      "contents": [
        {
          "x": 380,
          "y": 280,
          "type": "link",
          "path": "/Applications"
        },
        {
          "x": 110,
          "y": 280,
          "type": "file"
        }
      ],
      "window": {
        "width": 500,
        "height": 500
      }
    },
    "win": {
      "target": [
        "msi",
        "nsis"
      ],
      "icon": "assets/icon.ico",
      "artifactName": "${productName}-Web-Setup-${version}.${ext}",
      "publisherName": "unity-drive"
    },
    "nsis": {
      "allowToChangeInstallationDirectory": true,
      "oneClick": false,
      "perMachine": false
    }
    },
    "eslintConfig": {
        "extends": "react-app"
    },
    "browserslist": {
        "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
        ],
        "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
        ]
    },    

# 其他安装
## 1.安装electron-is-dev库，判断是否是开发环境
    //安装
    cnpm install electron-is-dev --save-dev
    //使用
    const isDev = require('electron-is-dev')
    const urlLocation = isDev ? 'http://localhost:3000':'null';
    mainWindow.loadURL(urlLocation); 
注意：isDev判断是否为开发环境；
开发环境就loadURL为localhost:3000
非开发环境：加载打包之后的静态文件，这里先留存之后再修改

## 2.concurrently同步
指的是npm start和electron .同时进行

    //安装
    cnpm install concurrently --save-dev

## 3.wait-on等待命令运行完
等待react的localhost:3000运行起来之后才去开始electron .

    //安装
    cnpm install wait-on --save-dev
    //package.json中将script的dev改成
     "dev": "concurrently \"wait-on http://localhost:3000 && electron .\" \"npm start\""

### 注意：concurrently是让两个命令同时执行；wait-on是等待localhost:3000加载完成之后再执行electron .，直接npm run dev就可以同时开启浏览器和electron的GUI了

## 4.cross-env控制系统不开启浏览器中的localhost:3000
    //安装 cnpm install cross-dev
    //修改package.json
    "dev": "concurrently \"wait-on http://localhost:3000 && electron .\" \"cross-env BROWSER=none npm start\""

### 注意：之后只开启electron程序，并不会开启localhost:3000

