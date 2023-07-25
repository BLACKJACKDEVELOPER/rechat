import { Form, Input, Button, Checkbox, DatePicker, ConfigProvider, Notification } from '@arco-design/web-react';

import {
    useNavigate
} from 'react-router-dom'

import {
    useState
} from 'react'

import '../styles/register.css'
import thTH from '@arco-design/web-react/es/locale/th-TH';


export default function Register() {
    const FormItem = Form.Item;
    const Link = useNavigate()

    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [birth, setBirth] = useState('')
    const [password, setPassword] = useState('')


    async function register() {
        
    }

    return (<>
        <ConfigProvider locale={thTH}>
            <h1 className="title">สมัครสมาชิก 💼</h1>
            <Form className="register" style={{ width: 600 }} autoComplete='off'>
                <Input onChange={() => setUsername(window.event.target.value)} placeholder='Username' />
                <Input onChange={() => setFullname(window.event.target.value)} placeholder='Fullname' />
                <Input onChange={() => setEmail(window.event.target.value)} placeholder='Email' />
                <DatePicker onChange={(d) => setBirth(d)} locale={thTH} style={{ width: "100%", height: '30px' }} placeholder="Date of Birth" />
                <Input onChange={() => setPassword(window.event.target.value)} placeholder='Password' />
                <br />
                <Checkbox>ยอมรับเงื่อนไขทั้งหมด</Checkbox>
                <br />
                <Button onClick={() => register()} type='primary'>สมัครสมาชิก</Button>

            </Form>
            {/* Already have account */}
            <h3 className="haveAccount">มีบัญชีอยู่แล้ว <span onClick={() => Link('/login')}>คลิ๊ก</span></h3>
        </ConfigProvider>
    </>)
}