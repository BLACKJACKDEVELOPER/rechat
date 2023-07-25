
import { Button , Modal ,List, Avatar,Input , Notification , Skeleton , Message  } from '@arco-design/web-react'
import { IconUser, IconSearch, IconSend , IconFontColors , IconFileImage , IconFileVideo } from '@arco-design/web-react/icon';
import { useLocation } from 'react-router-dom'

import {
	useState,
	useEffect,
	useRef
} from 'react'
import axios from 'axios'
import { io } from "socket.io-client";

import { useSelector } from 'react-redux'

export default function Room() {
	// cummunication
	const socket = io(process.env.REACT_APP_SERVER)

	// get Query id
	const query = useLocation()
	const id = query.search.split('?id=').pop()

	// me 
	const me = useSelector(state => state.me)
	

	// Detail Event
	const [visible,setVisible] = useState(false)
	// msg
	const [msg,setMsg] = useState('')

	// SendMsg to Room
	async function SendMsg() {
		window.event.preventDefault()
		try {
			await socket.emit('sendMsg',{id,msg,uid:me.id,type:'text'})
			setMsg('')
		}catch(e) {
			console.log(e)
		}
	}
	// get content by base64
	function base64(file) {
		return new Promise((resolve,reject)=> {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = ()=> resolve(reader.result)
			reader.onerror = ()=> reject(false)
		})
	}

	// upload Image
	async function uploadImage() {
		const path = document.createElement('input')
		path.setAttribute('type','file')
		path.addEventListener('change',async()=> {
			const data = await base64(path.files[0])
			await socket.emit('sendMsg',{id,msg:data.split(';base64,').pop(),uid:me.id,type:'image'})
		})
		path.click()
	}
	// upload Video
	async function uploadVideo() {
		const path = document.createElement('input')
		path.setAttribute('type','file')
		path.addEventListener('change',async()=> {
			const data = await base64(path.files[0])
			await socket.emit('sendMsg',{id,msg:data.split(';base64,').pop(),uid:me.id,type:'video'})
		})
		path.click()
	}



	// main
	const main = useRef()

	// room data
	const [room,setRoom] = useState()
	// fetch infomation room
	useEffect(()=> {
		axios.get(`${process.env.REACT_APP_SERVER}/rooms?id=${id}&token=${localStorage.getItem('token')}`).then(({data})=> {
			console.log(data)
			setRoom(data)
		// Loading msg
		axios.get(`${process.env.REACT_APP_SERVER}/msgs?room=${id}&token=${localStorage.getItem('token')}`).then(({data})=> {
			if (me.id) {
				data.data.map(async msg=> {
				let content;

				switch (msg.type) {
					case 'text':
						content = `<p style="font-size:17px;margin-left:1%;padding:0.5%;border-radius:10px;background:#fff;color:#000;font-weight:bold;">${msg.msg}</p>`
					break
					case 'image':
						content = `<img style="border-radius:10px;" width="500" src="${process.env.REACT_APP_SERVER}/images/${msg.msg}" />`
					break
					case 'video':
						content = `<video controls style="border-radius:10px;" width="500" >
									<source src="${process.env.REACT_APP_SERVER}/videos/${msg.msg}" type="video/mp4">
									</video>`
					break
				}

				return main.current.innerHTML += msg.user_id == me.id ?
		`
			<div style="display:flex;justify-content:flex-end;margin-right:1%;align-items:center;">
				${ content }
			</div>
		` : 
		`
			<div style="display:flex;justify-content:flex-start;margin-left:1%;margin-top:1%;align-items:center;">
				<img width="50" src="${process.env.REACT_APP_SERVER}/images/${msg.profile}" alt="" />
				${ content }
			</div>
			<br/>
		`
			})
				Message.success({
					id:'loading',
					content:'โหลดข้อความแล้ว'
				})
				setTimeout(()=> {
					main.current.scrollTop = main.current.scrollHeight;
				},1000)
			}else{

				Message.loading({
					id:'loading',
					content:'กำหลังโหลดข้อความ'
				})
				
			}
		})
			// Socket join room
	socket.emit('joinRoom',{ id , uid:me.id })

	// NewJoin
	socket.on('newUserRoom'+id,(data)=> {
		if (data != false) {
			Notification.success({content:'ผู้ใช้งาน '+data[0].username+' เข้าห้องแล้ว!'})
		}
	})
		})
	// msg
	socket.on('msg'+id,(data)=> {
		if (me.id) {
			const msg = data
			console.log(msg)
			let content;
				switch (msg.type) {
					case 'text':
						content = `<p style="font-size:17px;margin-left:1%;padding:0.5%;border-radius:10px;background:#fff;color:#000;font-weight:bold;">${msg.msg}</p>`
					break
					case 'image':
						content = `<img style="border-radius:10px;" width="500" src="${process.env.REACT_APP_SERVER}/images/${msg.msg}" />`
					break
					case 'video':
						content = `<video controls style="border-radius:10px;" width="500" >
									<source src="${process.env.REACT_APP_SERVER}/videos/${msg.msg}" type="video/mp4">
									</video>`
					break
				}
			main.current.innerHTML += msg.user[0].id == me.id ?
		`
			<div style="display:flex;justify-content:flex-end;margin-right:1%;align-items:center;">
				${ content }
			</div>
		` : 
		`
			<div style="display:flex;justify-content:flex-start;margin-left:1%;margin-top:1%;align-items:center;">
				<img style="margin-left:1%;" width="50" src="${process.env.REACT_APP_SERVER}/images/${msg.user[0].profile}" alt="" />
				${ content }
			</div>
			<br/>
		`
		main.current.scrollTop = main.current.scrollHeight;
		setTimeout(()=> {
			main.current.scrollTop = main.current.scrollHeight;
		},1000)
	}else{
		return
	}
		
	})
	},[me])
	

	return (<>


		<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'2px solid #0101'}}>
			<div style={{display:'flex',alignItems:'center'}}><img style={{width:"7%",borderRadius:'10px',marginRight:'10px'}} src={room ? `${process.env.REACT_APP_SERVER}/images/${room.data.image}` : 'img.png'} alt="" /><h1>{room ? room.data.roomName : 'Loading...'}</h1></div>
			<Button onClick={()=> setVisible(true)} type="primary">รายละเอียด</Button>
		</div>

		<div style={{marginTop:'1%',display:'flex',justifyContent:'space-between',alignItems:'start'}}>

			<div style={{width:'100%',height:'590px'}}>
			<div ref={main} style={{overflow:'scroll',height:'590px',background:'#0101',borderRadius:'10px'}}>
			</div>
			<form onSubmit={()=> SendMsg()} style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',marginTop:'10px',borderRadius:'10px',padding:'0%',background:'#0101',width:'100%',left:'10px'}}>
				<img onClick={()=> uploadVideo()} style={{width:40,marginLeft:'5px'}} src='video.png' />
				<img onClick={()=> uploadImage()} style={{width:40,marginLeft:'5px'}} src='img.png' />
				<Input shape="round" value={msg} onChange={()=> setMsg(window.event.target.value)} style={{ height:50,width: '80%',borderRadius:'10px' }} prefix={<IconFontColors />} placeholder='พิมพ์ข้อความที่นี้...' />
				<img onClick={()=> SendMsg()} style={{width:25}} src="send.png" alt="" />
			</form>
			</div>


		<div>
			<List
      style={{ width: 400 , marginLeft:'10px' }}
      hoverable={true}
      bordered={true}
      dataSource={new Array(8).fill({
        title: 'Beijing Bytedance Technology Co., Ltd.',
        description: 'Piyapon',
      })}
      render={(item, index) => (
        <List.Item key={index}>
          <List.Item.Meta
            avatar={<Avatar shape='square'>A</Avatar>}
            title={'Piyapon'}
            description={item.description}
          />
        </List.Item>
      )}
    />
		</div>
</div>
		<Modal
        title='รายละเอียด'
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        autoFocus={false}
        focusLock={true}
      >
        <pre>
          {room ? room.data.roomDescript : 'Not found Description'}
        </pre>
      </Modal>



		</>)
}