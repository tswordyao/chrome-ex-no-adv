let config={
  "manifest_version": 2, // 若是是app的话,目前只能固定为2

  // 以下是显示在 `chrome-settings-extensions` 中的信息
  "name": "my_extension",
  "version": "1.0",
  "description": "学习js,学习chrome插件制作demo",

  // 默认图标,可以设置不同尺寸,chrome会根据实际情况适配
  "icons": {
      "16": "image/chrome.png"
  },

  // 根据google给出的tip,若是在大多数页面可见的话就用browserAction,否则推荐page_action
  "browser_action": {
      "default_icon": {
          "16": "image/chrome.png"
      },
      "default_title": "Chrome扩展demo", //鼠标悬浮时显示的提示名称
      "default_popup": "popup.html" // 点击图标时弹出的页面
  },

  // 常驻后台,可选
  "background": {
      // 指定后台运行的脚本
      // 右键菜单功能选项也可以在里面添加
      "scripts": [
          "js/background.js"
      ]
  },
  "permissions": [ //权限限制
      //允许访问的网站
      "http://flash.weather.com.cn/",
      "https://www.baidu.com/",
      "http://pv.sohu.com/",

      // 将扩展加入到右键菜单中,需要添加 `contextMenus` 权限
      // 同时还要设置 `icons` 域生命16像素尺寸的图标，右键菜单才会显示出扩展的图标
      "contextMenus",

      //　添加桌面提醒
      "notifications",

      // 操作cookies,需要添加权限以及可操作的域(不限制: `<all_urls>`),此处会允许上面生命的几个域数据
      "cookies"
  ]
}


/*
    bg和pop互相可以调用

    content只能用msg和他俩沟通

　　在应用程序级别的部分是可以有互相访问的权限的。比如Popup文件能用chrome.extension.getBackgroundPage()访问background里面的东西，这就好像Backbone 视图可以访问他们的Model和Collection。

　　Content Scripts是存在于每个独立的Dom页面，和background和popup用message的方式进行通信交流。特别的，它可以使用chrome.tabs.sendMessage和chrome.runtime.onMessage.addListener去向对方发送消息。这和Backbone 的事件系统很像.

　　Injected Scripts和Content Scripts的不同在于它不能监听或者发送消息给其他的Chrome插件部分
*/