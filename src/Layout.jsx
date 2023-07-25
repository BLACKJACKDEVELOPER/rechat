import {
    useNavigate,
    Outlet
} from 'react-router-dom'
import Header from './components/Header.jsx'
import ax from 'axios'
import { ConfigProvider, Message } from '@arco-design/web-react';
import './styles/Layout.css'
import thTH from '@arco-design/web-react/es/locale/th-TH';
import {
    useEffect
} from 'react'


export default function Layout() {

    return (<>
        <ConfigProvider locale={thTH}>
            <Header Outlet={Outlet}></Header>
        </ConfigProvider>
    </>)
}