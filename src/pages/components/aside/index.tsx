
import React from 'react'
import { Layout, Menu } from 'antd'
import * as Icons from '@ant-design/icons'
// import Icon  from '@ant-design/icons';
import menuList,{ MenuListItem } from '@/config'
import {useNavigate} from 'react-router-dom'


interface MenuComp {
    key: string;
    icon?: React.ReactNode;
    label: string;
    children?: MenuComp[];
};
const {Sider} = Layout

const Aside = (props: {
    Collapsed: boolean
}) => {
    const { Collapsed } = props;
    // 动态获取icon
    const iconToElement = (name:string) => React.createElement(Icons[name]);
    // const iconToElement = (name: string) => <Icon component={Icons[name]} />;
    // 菜单数据处理
    const getItems = (items: MenuListItem[],  list: Array<{key: string, label: string, icon?: React.ReactNode, children?: typeof list}> = []): MenuComp[]  => {
        // const list: Array<{key: string, label: string, icon?: React.ReactNode, children?: typeof list}> = [];
        items.map(item => {           
            list.push({
                key: item.path,
                ...(item.icon? {icon: iconToElement(item?.icon)}: []),
                label: item.label,
                ...(item.children? {children: getItems(item.children)} : [])
            });
        })
        return list;
    };
    const navigate = useNavigate();
    const clickMenu = e => {
        navigate(e.key)
    }
    return (
        <Sider trigger={null} collapsible collapsed={Collapsed}>
            <h3 className='app-name'>通用后台管理系统</h3>
            <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']} items={
                getItems(menuList)
            } 
            onClick={clickMenu}
            style={{height: '100%'}}/>
        </Sider>
    )
}
export default Aside;