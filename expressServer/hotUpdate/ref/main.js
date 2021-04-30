import { autoUpdater } from "electron-updater";
const EAU = require("electron-asar-hot-updater");
const isDevelopment = process.env.NODE_ENV !== "production";

// function handleUpdate() {
//   // 更新前，删除本地安装包 ↓
//   let updaterCacheDirName = "xxapp-updater";
//   const updatePendingPath = path.join(
//     autoUpdater.app.baseCachePath,
//     updaterCacheDirName,
//     "pending"
//   );

//   fs_extra.emptyDir(updatePendingPath);
//   // 更新前，删除本地安装包 ↑
//   log.info("updatePendingPath=" + updatePendingPath);
//   const returnData = {
//     error: { status: -1, msg: "检测更新查询异常" },
//     checking: { status: 0, msg: "正在检查应用程序更新" },
//     updateAva: { status: 1, msg: "检测到新版本，正在下载,请稍后" },
//     updateNotAva: { status: -1, msg: "您现在使用的版本为最新版本,无需更新!" }
//   };
//   // 本地开发环境，改变app-update.yml地址
//   if (process.env.NODE_ENV === "development") {
//     var dev_path = path.join(
//       __dirname,
//       "win-unpacked/resources/app-update.yml"
//     );
//     log.info("dev_path=" + dev_path);
//     autoUpdater.updateConfigPath = dev_path;

//     // mac的地址是'Contents/Resources/app-update.yml'
//   } else {
//     var dev_path = path.join(__dirname, "../app-update.yml");
//     log.info("dev_path=" + dev_path);
//     autoUpdater.updateConfigPath = dev_path;
//   }
//   //log.info("autoUpdater.updateConfigPath=" + autoUpdater.updateConfigPath);
//   //和之前package.json配置的一样

//   autoUpdater.setFeedURL("http://update.tuzhitong.com/download/update");
//   //autoUpdater.setFeedURL({"headers": "get","url": "http://update.xxx.com/download/update"});
//   //更新错误
//   autoUpdater.on("error", function(error) {
//     sendUpdateMessage(returnData.error);
//   });

//   //检查中
//   autoUpdater.on("checking-for-update", function() {
//     sendUpdateMessage(returnData.checking);
//   });

//   //发现新版本
//   autoUpdater.on("update-available", function(info) {
//     if (!isDevelopment) {
//       sendUpdateMessage(returnData.updateAva);
//     } else {
//       sendUpdateMessage(returnData.updateNotAva);
//     }
//   });

//   //当前版本为最新版本
//   autoUpdater.on("update-not-available", function(info) {
//     setTimeout(function() {
//       hotUpdate(); //热更新检查
//       sendUpdateMessage(returnData.updateNotAva);
//     }, 1000);
//   });

//   // 更新下载进度事件
//   autoUpdater.on("download-progress", function(progressObj) {
//     win.webContents.send("updateAppProgress", progressObj);
//   });

//   autoUpdater.on("update-downloaded", function(
//     event,
//     releaseNotes,
//     releaseName,
//     releaseDate,
//     updateUrl,
//     quitAndUpdate
//   ) {
//     // win.webContents.send('isUpdateNow',"isUpdateNow")
//   });

//   //执行自动更新检查
//   //autoUpdater.checkForUpdates();
// }

// // 通过main进程发送事件给renderer进程，提示更新信息
// function sendUpdateMessage(text) {
//   //通知BrowserWindow页面显示进度条
//   //win.webContents.send('updateAppMessage', text)
// }
// ipcMain.on("isUpdateNow", (e, arg) => {
//   //some code here to handle event
//   autoUpdater.quitAndInstall(true, true);
// });

// ipcMain.on("checkForUpdate", (event, data) => {
//   //log.info('执行自动更新检查!!!');

//   autoUpdater.checkForUpdates();
// });

// ipcMain.on("downloadUpdate", () => {
//   // 下载
//   autoUpdater.downloadUpdate();
// });

// handleUpdate();

function hotUpdate() {
  EAU.init({
    api: "http://127.0.0.1:3176/api/apitest/postElectronUpdate", // The API EAU will talk to
    server: false // Where to check. true: server side, false: client side, default: true.
  });

  EAU.check(function(error, last, body) {
    if (error) {
      if (error === "no_update_available") {
        return false;
      }
      //dialog.showErrorBox('info', error)
      return false;
    }

    win.webContents.send("beginUpdate");

    EAU.progress(function(state) {
      win.webContents.send("updateAppProgress", {
        percent: state.percent * 100
      });
      // The state is an object that looks like this:
      // {
      //     percent: 0.5,
      //     speed: 554732,
      //     size: {
      //         total: 90044871,
      //         transferred: 27610959
      //     },
      //     time: {
      //         elapsed: 36.235,
      //         remaining: 81.403
      //     }
      // }
      if (state.percent >= 1) {
        //dialog.showMessageBox('info', 'App updated successfully! Restart it please.')
      }
    });

    EAU.download(function(error) {
      if (error) {
        // dialog.showErrorBox('info', error)
        return false;
      }
      //通知页面显示进度条
      // win.webContents.send('updateAppProgress',{percent: 100} )
      setTimeout(() => {
        if (process.platform === "darwin") {
          app.relaunch();
          app.quit();
        } else {
          app.quit();
        }
      }, 2000);
    });
  });
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<处理更新操作 end
