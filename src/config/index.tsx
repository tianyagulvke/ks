export interface MenuListItem {
  path: string;
  name?: string;
  label: string;
  icon?: string;
  url?: string;
  children?: MenuListItem[];
}
const menuList: MenuListItem[] = [
  {
    path: "/home",
    name: "home",
    label: "首页",
    icon: "HomeOutlined",
    url: "/home/index",
  },
  // {
  //   path: '/mail',
  //   name: 'mail',
  //   label: '商品管理',
  //   icon: 'ShopOutlined',
  //   url: '/mail/index'
  // },
  // {
  //   path: '/user',
  //   name: 'user',
  //   label: '用户管理',
  //   icon: 'UserOutlined',
  //   url: '/user/index'
  // },
  {
    path: "/exam",
    name: "exam",
    label: "考试",
    icon: "GithubOutlined",
    url: "/exam/index",
  },
  {
    path: "/examconfig",
    name: "examconfig",
    label: "试卷配置",
    icon: "GithubOutlined",
    url: "/examconfig/index",
  },
  {
    path: "/quesconfig",
    name: "quesconfig",
    label: "题目配置",
    icon: "GithubOutlined",
    url: "/quesconfig/index",
  },
  {
    path: "/impques",
    name: "impques",
    label: "导入题库",
    icon: "GithubOutlined",
    url: "/impques/index",
  },
  {
    path: "/countlist",
    name: "countlist",
    label: "统计答题人",
    icon: "GithubOutlined",
    url: "/countList/index",
  },
  {
    path: "/workday",
    name: "workday",
    label: "工作日",
    icon: "GithubOutlined",
    url: "/workday/index",
  },
  {
    path: "/topic",
    name: "topic",
    label: "题目列表",
    icon: "GithubOutlined",
    url: "/topiclist/index",
  },
  // {
  //   path: "/check",
  //   name: "check",
  //   label: "判卷",
  //   icon: "GithubOutlined",
  //   url: "/exam/check",
  // },
  // {
  //   path: '/other',
  //   label: '其他',
  //   icon: 'SettingOutlined',
  //   children: [
  //     {
  //       path: '/other/pageOne',
  //       name: 'page1',
  //       label: '页面1'
  //     },
  //     {
  //       path: '/other/pageTwo',
  //       name: 'page2',
  //       label: '页面2'
  //     }
  //   ]
  // }
];
export default menuList;
