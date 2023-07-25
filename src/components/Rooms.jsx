import { Grid, Divider , Notification , Skeleton , Message , Modal , Input } from '@arco-design/web-react';
import { IconStrikethrough } from '@arco-design/web-react/icon';
import '../styles/rooms.css'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Rooms({rooms}) {
    const Row = Grid.Row;
    const Col = Grid.Col;
    const Link = useNavigate()

// joining room
const [modal,setModal] = useState(false)
const [curroom,setCurroom] = useState({})
const [enterpassword,setEnterpassword] = useState('')
async function join(id) {
  try {
    Message.loading({
        id:'loading',
        content:'กำลังติดต่อห้อง '+id
    })
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/rooms?token=${localStorage.getItem('token')}&id=${id}`)
    console.log(data)
    
    Message.success({
        id:'loading',
        content:'ติดต่อห้องสำเร็จ'
    })
    if (data.data.roomPassword != '') {
        setModal(true)
        setCurroom(data)
    }else{
        window.location.href = ('/room?id='+data.data.id)
    }
  }catch(e) {

  }
}

async function gotoRoom() {
    if (enterpassword == curroom.data.roomPassword) {
        Link('/room?id='+curroom.data.id)
    }else{
        Notification.error({
            content:'รหัสผ่านไม่ตรงกัน ❌🔐'
        })
    }
}

    return (<>
        <Row className='grid-gutter-demo' gutter={[10, 10]}>
            {
                rooms != {} ?
                (rooms.map((room,index) =>
                <Col onClick={()=> join(room.id)} span={2} key={index}>
                    <div className="room" key={index} style={{ width: '100px', height: '100px', background: '#0101' }}>
                        <img style={{borderRadius:'10px',width:"100%",height:'100px',objectFit:'cover'}} src={`${process.env.REACT_APP_SERVER}/images/${room.image}`} alt="" />
                        <h3 className="title">{room.roomName}</h3>
                    </div>
                </Col>
                ))
                // JSON.stringify(rooms)
                 : (new Array(60).fill(0).map((room,index) =>
                <Col span={2} key={index}>
                    <Skeleton text={true} animation={true} style={{ width: '100px', height: '100px', background: '#0101' }}>
                        Loading
                    </Skeleton>
                </Col>
                ))
            }
        </Row>


        <Modal
        title='ห้องต้องการรหัสผ่าน 🔑'
        visible={modal}
        onOk={() => gotoRoom()}
        onCancel={() => setModal(false)}
        autoFocus={false}
        focusLock={true}
      >
          <Input.Password value={enterpassword} onChange={()=> setEnterpassword(window.event.target.value)} prefix={<IconStrikethrough />} placeholder="กรอกรหัสผ่านที่นี้..." />
      </Modal>
    </>)
}