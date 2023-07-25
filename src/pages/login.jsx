import { Notification, Form, Input, Button, Checkbox, Layout } from '@arco-design/web-react';

import {
    useNavigate,
    useLocation
} from 'react-router-dom'

import '../styles/register.css'
import {
    useState,
    useEffect
} from 'react'

// axios pulling data
import axios from 'axios'

export default function Login() {
    const FormItem = Form.Item;
    const Content = Layout.Content
    const Link = useNavigate()
    const msg = useLocation()
    useEffect(() => {
        
        if (msg.search.includes('?msg=')) {
            const notify = new URLSearchParams(msg.search)
            Notification.error({ content: notify.get('msg') })
        }
    }, [])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remeber, setRemember] = useState(false)


    async function login() {
        axios.post(`${process.env.REACT_APP_SERVER}/login`,{
            email:email,
            password:password,
            remember:remeber
        }).then(res=> {
            if (res.data.pass) {
                Notification.success({content:res.data.msg})
                setTimeout(()=> {
                    localStorage.setItem('token',res.data.token)
                    return window.location.href = '/'
                },1000)
            }else{
                Notification.error({content:res.data.msg})
            }
        })
    }

    return (<>
        <Content>
            <h1 className="title">เข้าสู่ระบบ 🔥</h1>
            <Form className="register" style={{ width: 600 }} autoComplete='off'>
                <Input onChange={() => setEmail(window.event.target.value)} placeholder='Email' />
                <Input onChange={() => setPassword(window.event.target.value)} placeholder='Password' />
                <br />
                <Checkbox checked={remeber} onClick={() => setRemember(!remeber)}>จดจำฉันเสมอ {remeber ? '' : '(หมดอายุใน 1 ชั่วโมง)'}</Checkbox>
                <br />
                <Button onClick={() => login()} type='primary'>เข้าสู่ระบบ</Button>
            </Form>

            {/* Already have account */}
            <h3 className="haveAccount">ยังไม่มีบัญชี <span onClick={() => Link('/register')}>คลิ๊ก</span></h3>
        </Content>
    </>)
}