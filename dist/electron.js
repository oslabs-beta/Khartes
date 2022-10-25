/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./electron/electron.ts":
/*!******************************!*\
  !*** ./electron/electron.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst { app, BrowserWindow } = __webpack_require__(/*! electron */ \"electron\");\n// requiring express server to connect to backend\n// require('../server/index.ts'); // this is where the error is, cannot get these connected\n// const server = require('./app'); still not working..\nfunction createWindow() {\n    // Create the browser window.\n    let win = new BrowserWindow({\n        width: 1200,\n        height: 1200,\n        webPreferences: {\n            nodeIntegration: true\n        }\n    });\n    // load URL for express server (not needed since we added the backend server to localhost:8000 through client/index.html)\n    // win.loadURL(`http://localhost:8000/`)\n    // and load the index.html of the app.\n    win.loadFile('index.html');\n    // to open devtools, uncomment below:\n    win.webContents.openDevTools();\n}\n// app.whenReady().then(createWindow);\napp.on('ready', createWindow);\n// const {app, BrowserWindow} = require('electron')\n// const path = require('path')\n// const url = require('url')\n// // Keep a global reference of the window object, if you don't, the window will\n// // be closed automatically when the JavaScript object is garbage collected.\n// let win: any;\n// function createWindow () {\n//   // Create the browser window.\n//   win = new BrowserWindow({width: 800, height: 600})\n//   // and load the index.html of the app.\n//   win.loadURL(url.format({\n//     pathname: path.join(__dirname, 'index.html'),\n//     protocol: 'file:',\n//     slashes: true\n//   }))\n//   win.loadURL(`file://${__dirname}/index.html`)\n//   // Open the DevTools.\n//   win.webContents.openDevTools()\n//   // Emitted when the window is closed.\n//   win.on('closed', () => {\n//     // Dereference the window object, usually you would store windows\n//     // in an array if your app supports multi windows, this is the time\n//     // when you should delete the corresponding element.\n//     win = null\n//   })\n// }\n// // This method will be called when Electron has finished\n// // initialization and is ready to create browser windows.\n// // Some APIs can only be used after this event occurs.\n// app.on('ready', createWindow)\n// // Quit when all windows are closed.\n// app.on('window-all-closed', () => {\n//   // On macOS it is common for applications and their menu bar\n//   // to stay active until the user quits explicitly with Cmd + Q\n//   if (process.platform !== 'darwin') {\n//     app.quit()\n//   }\n// })\n// app.on('activate', () => {\n//   // On macOS it's common to re-create a window in the app when the\n//   // dock icon is clicked and there are no other windows open.\n//   if (win === null) {\n//     createWindow()\n//   }\n// })\n// // In this file you can include the rest of your app's specific main process\n// // code. You can also put them in separate files and require them here.\n\n\n//# sourceURL=webpack://khartes/./electron/electron.ts?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./electron/electron.ts");
/******/ 	
/******/ })()
;