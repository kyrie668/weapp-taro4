export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/about/index',
    'pages/me/index',
    'pages/index/index',
    'pages/upload/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#1AAD19',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'assets/icons/home.png',
        selectedIconPath: 'assets/icons/home-active.png'
      },
      {
        pagePath: 'pages/about/index',
        text: '关于',
        iconPath: 'assets/icons/about.png',
        selectedIconPath: 'assets/icons/about-active.png'
      },
      {
        pagePath: 'pages/me/index',
        text: '我的',
        iconPath: 'assets/icons/me.png',
        selectedIconPath: 'assets/icons/me-active.png'
      },
      {
        pagePath: 'pages/upload/index',
        text: '接口',
        iconPath: 'assets/icons/about.png',
        selectedIconPath: 'assets/icons/about-active.png'
      }
    ]
  }
})
