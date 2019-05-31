let info = {
  "name": "沙鑫",
  "work": "前端开发工程师",
  "aver": "",
  "info": [{
    "title": '关于我',
    "content": [
      // "离职原因：公司项目部解散",
      "出生日期: 1994-10-25",
      "期望职位：WEB前端工程师|HTML5软件开发工程师",
      "工作性质：全职",
      "目前状况：目前处于在职期，可快速到岗"
    ]
  }, {
    "title": '技能掌握',
    "content": [
      "熟练使用vue前端框架、拆分前端页面、将复用部分封装成组件、具有一定抽象组件能力、熟练组件间通信。",
      "熟练使用Ajax、axios动态获取数据，能与后端很好的合作, 完成前后端分离架构的研发工作，能够解决跨域请求访问问题。",
      "熟练Bootstrap、element、iview等前端ui框架的应用，能够快速实现网页开发，以及样式的定制。",
      "熟练mui、vant等webapp ui框架的应用，能够快速结合html5 plus 进行app开发",
      "熟练移动端的布局，对百分比、等比例缩放、rem布局，弹性盒布局有丰富的经验，能够独立架构移动网站。",
      "熟练stylus、scss等css预编译语言、git等代码托管工具。",
      "熟悉uniapp,微信小程序",
      "熟悉webpack gulp等前端构建工具",
      "了解react框架、mobx全局状态管理，父子组件通信。",
      "了解nodejs。"
    ]
  }],
  "works": {
    "title": '项目简述',
    "works": [
      // {
      //   "name": "诠星游戏后台系统",
      //   'desp': '诠星游戏平台包含了公司所属游戏的推广下载、公司游戏运营情况、收入和下载量等。',
      //   "technology": [
      //     "1.后台系统使用的React + MobX + ReactRouter + Ant Design实现页面数据展示",
      //     "2.使用Axios实现数据交互",
      //     "3.通过SCSS css3等来渲染页面",
      //     "4.使用ECharts实现数据联动，对数据进行可视化展示",
      //   ]
      // },
      {
        "name": "滚石音乐平台管理系统",
        'desp': '滚石音乐平台管理系统是公司对于本公司所属的音乐，彩铃，人力等状态的管理。系统分为3个系统，分别为渠道方（销售方）系统、cp方（制作方）、系统与本公司系统。',
        "technology": [
          "1.用 vue全家桶 + Element-UI 实现页面数据展示",
          "2.使用 Axios 实现数据交互",
          "3.通过 SCSS、css3、bootstrap 和来渲染页面",
          "4.使用 ECharts 实现数据联动，对数据进行可视化展示",
        ]
      }, {
        "name": "深中通道",
        'desp': '深中通道是针对深圳向中山大桥建设制作的app,完成了员工上岗签到，业务完成描述，流程审批，实时定位，项目检查，呼救，工程进度等功能',
        "technology": [
          "1.用 vue 实现页面数据展示",
          "2.通过 css3，mui 等来渲染页面",
          "3.使用 Axios 实现数据交互",
          "4.使用 ECharts 实现数据联动，对数据进行可视化展示",
          "5.使用百度地图展示用户位置",
          "6.h5plus实现手机与原生交互"
        ]
      }
    ]
  },
  "experience": [{
    "time": '2018年8月-至今',
      "content": [
        "三进宇通", "技术部/移动web前端工程师", "主要负责公司项目界面效果与功能"
      ]
    },
    {
      "time": '2016年11月-2018年8月',
      "content": [
        "北京工科桥梁大连研发中心", "技术部/移动web前端工程师", "主要负责深中通道相关项目的页面与功能"
      ]
    }, {
      "time": '2013年9月-2017年6月',
      "content": [
        "辽宁科技大学", "本科", "计算机科学与技术专业"
      ]
    }
  ],
  imgUrls: [{
      id: 1,
      name: '深中通道',
      url: 'http://qiniudns.shaxin741.vip/zhongshan.png'
    },
    {
      id: 2,
      name: '艾艾贴',
      url: 'http://qiniudns.shaxin741.vip/aiaijiu.png'
    },
    {
      id: 3,
      name: '相泽青英',
      url: 'http://qiniudns.shaxin741.vip/xiangze.png'
    },
    {
      id: 4,
      name: '音乐平台',
      url: 'http://qiniudns.shaxin741.vip/geku.png'
    }
  ]
}


module.exports = {
  info: info
}