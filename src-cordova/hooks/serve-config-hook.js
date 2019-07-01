const fs = require('fs')

function info(msg) {
    console.log(msg)
}

process.env.CORDOVA_WEBVIEW_SRC = 'http://192.168.6.161:5000'
const url = process.env.CORDOVA_WEBVIEW_SRC
// const url = 'http://10.0.0.7:5000'
// const cordovaConfigPath = process.env.CORDOVA_PREPARE_CONFIG
const cordovaConfigPath = 'config.xml'
if (!url || !cordovaConfigPath) {
  return
}
info(`updating ${cordovaConfigPath} content to ${url}`)

let cordovaConfig = fs.readFileSync(cordovaConfigPath, 'utf-8')
const lines = cordovaConfig.split(/\r?\n/g).reverse()
const regexContent = /\s+<content/
const contentIndex = lines.findIndex(line => line.match(regexContent))
const allowNavigation = `    <allow-navigation href="${url}" />`
if (contentIndex >= 0) {
  lines[contentIndex] = `    <content src="${url}" />`
  if (url) {
    lines.splice(contentIndex, 0, allowNavigation)
  }
  cordovaConfig = lines.reverse().join('\n')
  fs.writeFileSync(cordovaConfigPath, cordovaConfig)
}
