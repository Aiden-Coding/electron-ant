// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
/**在页面运行其他脚本之前预先加载的指定的脚本：首先是个js文件没错了，再看加载时机，在页面运行其他脚本之前预先加载，这个页面不是普通的某个h5页面，而是指某个渲染进程（需要预加载js的渲染进程，因为渲染进程可能有多个，每个就是一个窗口），我们new一个BrowserWindow，打开了一个窗口，就是启动了一个渲染进程，如果我们不给这个窗口指定页面，那它就是空白的，如果指定了页面，那么窗口就会加载这个页面： */
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
