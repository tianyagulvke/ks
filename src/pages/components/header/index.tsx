import {Layout, Button, theme, Avatar, Dropdown} from 'antd'
const {Header} = Layout
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons'
import avatarImage from '@/assets/images/avatar.jpg'
import './index.scss'
import {useDispatch} from 'react-redux'
import {changeCollapse} from '@/store/reducers/tab'

const MyHeader = (props : {
    Collapsed: boolean,
}) => {
    const {
        token: {colorBgContainer,}
    } = theme.useToken();
    const dispatch = useDispatch();
    const changeCollapsed = () => {
        dispatch(changeCollapse())
    }
    const {Collapsed} = props;
    // 登出
    const logout = () => {};
    const items = [
        {
            key: '1',
            label: (<a target='_blank' rel='noopener noreferer'>个人中心</a>)
        },
        {
            key: '2',
            label: (<a target='_blank' onClick={()=>logout} rel='noopener noreferrer'>退出</a>)
        }
    ]
    return (
        <Header style={{padding: 0, background: colorBgContainer}} className='header-container'>
            <Button type='text' icon={Collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined />} 
            onClick={changeCollapsed} style={{fontSize: '16px', width: 64, height: 32}} />
            <Dropdown menu={{items}}>
                <Avatar src={<img src={avatarImage}/>} style={{marginRight: '10px'}}/>
            </Dropdown>
        </Header>
    )
}
export default MyHeader;