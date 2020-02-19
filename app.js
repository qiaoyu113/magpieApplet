//app.js
import util from 'utils/util';

App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // console.log('login',res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
        // 登录成功后存token
        // wx.setStorage({
        //   key:'KtcNGbsFV35gHldcjgWd0g==',
        //   data:'oQdm84n33zYoU8MqXzBQoT4rdu_M'
        // })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      },
      fail: res => {
        // console.log('fail')
      }
    })
    util.checkUpdateVersion();
    wx.getStorage({
      'key':'token',
      success:(res)=>{
        this.globalData.token = res.data
      }
    })

    //获取设备指定样式
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        this.globalData.CustomBar = e.platform == 'android' ? e.statusBarHeight + 50 : e.statusBarHeight + 45;
      }
    })

    // 云开发
    if (!wx.cloud) {
      wx.showToast({
        title: '云加载失败',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.cloud.init({
        env: 'firmiana-m1-wdeku', // m1环境
        // env:'firmiana-stable-8snod', // 生产环境
        traceUser: true
      })
    }
  },
  globalData: {
    token:null, 
    userInfo:null,
    // m1环境域名
    url: 'https://firmiana-bss-api-m1.yunniao.cn/',
    // 生产环境域名
    // url: 'https://firmiana-bss-api.yunniao.cn/',
    // d2环境域名
    // url: 'http://172.17.101.77:20150/',
    // 图片域名
    imgUrl: 'https://qizhiniao-dev.oss-cn-beijing.aliyuncs.com/img/'
  }
})