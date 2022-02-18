module.exports = {
  title: 'TIm\'s blog',
  keywords: '架构设计',
  description: '蒂姆的个人博客',
  repo: 'https://github.com/dingmeikun/blog.git',  //仓库地址
  serviceWorker: true, // 是否开启 PWA
  head: [ 
    ['link', { rel: 'icon', href: '/favicon.ico' }],
	['link', { rel: 'manifest', href: '/img/tim.jpg' }],
    ['link', { rel: 'apple-touch-icon', href: '/img/tim.jpg' }],
	['meta', { 'http-quiv': 'pragma', cotent: 'no-cache'}],
    ['meta', { 'http-quiv': 'pragma', cotent: 'no-cache,must-revalidate'}],
    ['meta', { 'http-quiv': 'expires', cotent: '0'}]
  ],
  
  serviceWorker: true, // 是否开启 PWA
  base: '/blog/',  // 配合部署项目
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  lastUpdated: 'Last Updated',
  theme: 'reco',
  themeConfig:{
	logo: '/img/tim.jpg',
	nav: [
	  {text: "主页", link: "/"},
      {text: "java基础", link: "/java/" },
      {text: "架构", link: "/architecture/" },
      {text: "数据库", link: "/database/"   },
	  {text: "算法", link: "/algorithm/"   },
      {text: "面试", link: "/interview/" },
	  {
		text: '蒂姆的个人博客',
            items: [  //多级导航栏
                { text: 'github', link: 'https://github.com/dingmeikun' },
                { text: '公众号', link: '/gongzhonghao' }
        ]
      },
    ],
    sidebar: [ // 侧边栏配置
		{
            title: "基础学习",
            path: '/java/README',
            collapsable: false, // 不折叠
            children: [
                { title: "MyBtis-Plus的流式查询", path: "/java/MyBtis-Plus的流式查询" },
				{ title: "MySQL前缀索引选择性", path: "/java/MySQL前缀索引选择性" }
            ],
        }
	],
	subSidebar: 'auto'
  }
}