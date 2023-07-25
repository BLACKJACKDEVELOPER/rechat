import {
    useNavigate
} from 'react-router-dom'

import {
    useState,
    useRef,
    useEffect
} from 'react'

import '../index.css'

import { Layout, Menu, Breadcrumb, Button, Message, Badge , Avatar } from '@arco-design/web-react';
import { IconList, IconCommon, IconHome, IconUser, IconCalendar, IconCaretRight, IconCaretLeft, IconPoweroff, IconMessage } from '@arco-design/web-react/icon';

// axios
import axios from 'axios';

// store
import { useSelector , useDispatch } from 'react-redux';
import { setMe } from '../store/me'
export default function Header({ Outlet }) {
    const MenuItem = Menu.Item;
    const SubMenu = Menu.SubMenu;
    const Sider = Layout.Sider;
    const Header = Layout.Header;
    const Footer = Layout.Footer;
    const Content = Layout.Content;

    // about me
    const [data,setData] = useState({})
    // SPA Link
    const Link = useNavigate()

    // state of collapse
    const [collapse, setCollapse] = useState(false)

    // state of screenHeight
    const [screen,setScreen] = useState(parseFloat(window.innerHeight))
    
    // auth
    const dispatch = useDispatch()
    const me = useSelector(state => state.me)
    useEffect(()=> {
        axios.post(`${process.env.REACT_APP_SERVER}/auth`,{
            token:localStorage.getItem('token')
        }).then(res=> {
            if (res.data.pass) {
                res.data.auth.login = true
                console.log(res.data.auth)
                dispatch(setMe(res.data.auth))
            }else{
                Link(`/login?msg=${res.data.msg}`)
            }
        })
    },[])
    useEffect(()=> {
        // set navSide
        document.getElementById('main').style.height = screen+'px'
    },[screen])

    window.addEventListener('resize',async(e)=> {
        // detect navSide and set back
        setScreen(parseFloat(window.innerHeight))
    })

    // logout
    function Logout() {
        Message.loading({
            id: 'loading',
            content: '🤔 กำลังออกจากระบบ'
        })
        localStorage.clear()
        sessionStorage.clear()
        Message.success({
            id: 'loading',
            content: 'ออกจากระบบสำเร็จ 🎃'
        })
        Link('/login')
    }

    

    return (<>
        <Layout id='main' className='layout-collapse-demo'>
            <Sider
                collapsed={collapse}
                onCollapse={() => setCollapse(!collapse)}
                collapsible
                trigger={collapse ? <IconCaretRight /> : <IconCaretLeft />}
                breakpoint='xl'
            >
                <div style={{overflow:'hidden',borderRadius:'5px',fontWeight:'bolder',fontSize:20,textAlign:'center',opacity:'0.7'}} className='logo' >
                        {me.username ? collapse ? me.username.split(' ').shift()[0] : me.username.split(' ').shift() : 'Loading..'}
                </div>
                <Menu
                    defaultOpenKeys={['1']}
                    defaultSelectedKeys={['0_1']}
                    style={{ width: '100%' }}
                >
                    <MenuItem key='0_1' onClick={() => Link('/')}>
                        <IconHome />
                        หน้าหลัก
                    </MenuItem>
                    <MenuItem key='0_2' onClick={() => Link('/createRoom')}>
                        <IconCommon />
                        สร้างห้องแชท
                    </MenuItem>
                    <MenuItem key='0_6' onClick={() => Link('/myrooms')}>
                        <IconList />
                        ห้องแชทของคุณ
                    </MenuItem>
                    <MenuItem key='0_3' onClick={() => Link('/account')}>
                        <IconUser />
                        ข้อมูลส่วนตัว
                    </MenuItem>
                    <MenuItem key='0_4' onClick={() => Link('/messages')}>
                        <IconMessage />
                            ข้อความ <Button size='mini' shape='circle' type='primary' status='danger'>{10}</Button>
                    </MenuItem>
                    <MenuItem key='0_5' onClick={() => Logout()}>
                        <IconPoweroff />
                        ออกจากระบบ
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Layout style={{ padding: '1.4% 24px' }}>
                    <Content style={{borderRadius:'10px'}}>
                        <Outlet></Outlet>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </>)
}