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
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 'HomeOutlined',
        url: '/home/index'
      },
      {
        path: '/mail',
        name: 'mail',
        label: '商品管理',
        icon: 'ShopOutlined',
        url: '/mail/index'
      },
      {
        path: '/user',
        name: 'user',
        label: '用户管理',
        icon: 'UserOutlined',
        url: '/user/index'
      },
      {
        path: '/exam',
        name: 'exam',
        label: '考试',
        icon: 'GithubOutlined',
        url: '/exam/index'
      },
      {
        path: '/other',
        label: '其他',
        icon: 'SettingOutlined',
        children: [
          {
            path: '/other/pageOne',
            name: 'page1',
            label: '页面1'
          },
          {
            path: '/other/pageTwo',
            name: 'page2',
            label: '页面2'
          }
        ]
      }
];
export default menuList;