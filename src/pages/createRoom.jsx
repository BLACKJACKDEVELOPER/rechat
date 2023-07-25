import {
    Skeleton,
    Input,
    Button,
    Space,
    Form,
    Switch,
    Modal,
    ConfigProvider,
    Notification
} from '@arco-design/web-react';
import { IconCheck, IconClose } from '@arco-design/web-react/icon';
import {
    useState
} from 'react'

import thTH from '@arco-design/web-react/es/locale/th-TH';

import {
    useNavigate
} from 'react-router-dom'

import axios from 'axios'
export default function CreateRoom() {

    // SPA HOT LINK
    const Link = useNavigate()

    const FormItem = Form.Item
    const [password, setPassword] = useState(false)
    const [image, setImage] = useState(false)
    const [visible, setVisible] = useState(false)

    // Get content file to base64 function
    function base64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = () => reject(false)
        })
    }

    // upload image
    async function uploadImage() {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', '.jpg')
        input.addEventListener('change', async () => {
            const data = await base64(input.files[0])
            setImage(data)
        })
        input.click()
    }

    // Work with form
    const [roomName,setRoomName] = useState('')
    const [roomPassword,setRoomPassword] = useState('')
    const [roomDescript,setRoomDescript] = useState('')

    async function newRoom() {
        axios.post(`${process.env.REACT_APP_SERVER}/createRoom`,{
            roomName,
            roomPassword,
            roomDescript,
            image:image.split(';base64,').pop(),
            token:localStorage.getItem('token')
        }).then(({data})=> {
            if (data.pass) {
                Notification.success({content:data.msg})
                Link('/myrooms')
            }else{
                Notification.error({content:data.msg})
            }
        })
    }

    return (<>
        <ConfigProvider locale={thTH}>
            <div style={{ borderBottom: '3px solid #0101' }}>
                <h2>🚩 สร้างห้องแชทใหม่</h2>
            </div>

            <div
                style={{ maxWidth: '90%', margin: 'auto', marginTop: '2%' ,borderRadius:'10px'}}>
                <div
                    onClick={() => uploadImage()}
                    style={{ width: '100%',height:'200px', background: '#0101',display:'flex',justifyContent:'center',alignItem:'center',borderRadius:'10px' }}>
                    {
                        image ? <img style={{ width: "100%",height:'200px', borderRadius: '10px', objectFit: 'contain' }} src={image} /> : <h1 style={{ marginTop: '4%', color: '#0109',fontSize:'180%' }}>📸 ภาพหน้าปกห้อง</h1>
                    }
                </div>
                <div style={{borderBottom:'2px solid #0101'}}>
                    <h3 style={{margin:'1.5%',padding:'0px'}}>👑 ข้อมูลห้องของคุณ</h3>
                </div>
                <Form>
                    <Input onChange={()=> setRoomName(window.event.target.value)} allowClear style={{ marginTop: '2%' }} placeholder="ชื่อห้อง"></Input>
                    <div style={{ marginTop: '1%', display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
                        <Input onChange={()=> setRoomPassword(window.event.target.value)} allowClear disabled={!password} placeholder="รหัสห้อง"></Input>
                        <Button onClick={() => setVisible(true)} type='primary' status={password ? 'danger' : 'primary'}>{password ? 'ปิด' : 'เปิด'}</Button>
                    </div>
                    <Input.TextArea
                        maxLength={500}
                        showWordLimit
                        placeholder='คำอธิบาย'
                        wrapperStyle={{ width: '100%' }}
                        style={{ marginTop: '2%',width:'100%',height:100}}
                        autoSize={false}
                        onChange={()=> setRoomDescript(window.event.target.value)}
                    />
                    <div style={{marginTop:'2%'}}>
                        <Button
                        type="primary"
                        style={{width:'100%'}}
                        onClick={()=> newRoom()}>
                            สร้าง
                        </Button>
                    </div>
                </Form>
                <div style={{display:'flex',justifyContent:'center',alignItem:'center',marginTop:'2%',borderTop:'2px solid #0101'}}>
                    <h3 style={{color:'rgb(22,93,255)',cursor:'pointer',padding:'0px',margin:'1%'}} onClick={()=> Link('/myrooms')}>ดูห้องของคุณทั้งหมด</h3>
                </div>
            </div>


            <Modal
                title='ต้องการเปิดรหัสผ่านหรือไม่'
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                autoFocus={false}
                focusLock={true}
                onOk={()=> {setPassword(!password);setVisible(!visible)}}
            >
                <p>
                    หากคุณเปิดห้องแบบมีรหัสผ่านผู้ใช้คนอื่นยังเห็นห้องของคุณอยู่แต่จะมีรหัสผ่านให้ใส่เมื่อผู้ใช้อื่นพยายามเข้าห้องของคุณ
                </p>
            </Modal>
        </ConfigProvider>
    </>)
}