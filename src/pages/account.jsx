
import {
    Form,
    Input,
    ConfigProvider,
    Button,
    DatePicker,
    Notification
} from '@arco-design/web-react'
import thTH from '@arco-design/web-react/es/locale/th-TH';

// store
import { useSelector , useDispatch } from 'react-redux'
import { setMe } from '../store/me'
import { useState , useEffect } from 'react'
// axios pulling data
import  axios from 'axios'

export default function Account() {
const dispatch = useDispatch()
    // get base64 content
    function base64(file) {
        return new Promise((resolve,reject)=> {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = ()=> resolve(reader.result)
            reader.onerror = ()=> reject(false)
        })
    }

    // dom preview image
    const [preview,setPreview] = useState()
    const [pure64,setPure64] = useState(false)
    // about me
    const [username,setUsername] = useState()
    const [fullname,setFullname] = useState()
    const [email,setEmail] = useState()
    const [birth,setBirth] = useState()
    const [password,setPassword] = useState()

    // change image
    async function ChangeImage() {
        const image = document.createElement('input')
        image.setAttribute('type','file')
        image.addEventListener('change',async ()=> {
            const data = await base64(image.files[0])
            setPreview(data)
            setPure64(data.split(';base64,').pop())
            console.log(pure64)
            return
        })
        image.click()

    }

    // initial Value
    useEffect(()=> {
        axios.post(`${process.env.REACT_APP_SERVER}/auth`,{
            token:localStorage.getItem('token')
        }).then(({data:{auth}})=> {
            setPreview(`${process.env.REACT_APP_SERVER}/images/${auth.profile}`)
            setUsername(auth.username)
            setFullname(auth.fullname)
            setEmail(auth.email)
            setBirth(auth.birth)
        })
    },[])

    // change me
    async function ChangeMe() {

        // send data to req
        axios.post(`${process.env.REACT_APP_SERVER}/user`,{
            username:username,
            fullname:fullname,
            email:email,
            birth:birth,
            profile:pure64,
            token:localStorage.getItem('token')
        }).then(({data})=> {
            if (data.pass) {
                localStorage.setItem('token',data.token)
                Notification.success({content:data.msg})
                window.location.reload()
            }else{
                Notification.error({content:data.msg})
            }
        })

    }

    return (<>
        <div style={{
            borderBottom:'2px solid #0101'
        }}>
            <h2>📙 ข้อมูลส่วนตัว</h2>
        </div>

        <div onClick={()=> ChangeImage()} style={{
            maxWidth:'90%',
            height:200,
            background:'#0101',
            margin:'auto',
            borderRadius:'10px',
            marginTop:'2%',
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center'
        }}>
            <img style={{borderRadius:'10px'}} width="190" src={preview} />
        </div>

        <ConfigProvider locale={thTH}>
        <Form className="register" style={{ maxWidth: '90%',marginTop:'2%' }}>
                <Input value={username} onChange={()=> setUsername(window.event.target.value)} placeholder='Username' />
                <Input value={fullname} onChange={()=> setFullname(window.event.target.value)} placeholder='Fullname' />
                <Input value={email} onChange={()=> setEmail(window.event.target.value)} placeholder='Email' />
                <DatePicker value={birth} onChange={(date)=> setBirth(date)} locale={thTH} style={{width:"100%",height:'30px'}} placeholder="Date of Birth" />
                <br />
                <Button onClick={()=> ChangeMe()} shape="round" type='primary'>ยืนยันการแก้ไข</Button>
                <br />
                <Button shape="round" type='primary' status="danger">เปลี่ยนรหัสผ่าน</Button>
        </Form>
        </ConfigProvider>
    </>)
}