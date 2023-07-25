
// External Components
import Rooms from '../components/Rooms.jsx'

// arco-design components
import {
    Pagination
} from '@arco-design/web-react'

import { useState , useEffect } from 'react'
import axios from 'axios'
export default function Myrooms() {

const [rooms,setRooms] = useState([])

// fetching rooms
useEffect(()=> {
  axios.get(`${process.env.REACT_APP_SERVER}/rooms?token=${localStorage.getItem('token')}`).then(({data})=> {
    setRooms(data.data)
  })
},[])

    return (<>

        <div style={{borderBottom:'2px solid #0101',marginBottom:'1%',display:'flex',alignItem:'center',justifyContent:'flex-start'}}>
            <h2>📦 ห้องของคุณทั้งหมด</h2>
            <Pagination simple total={50}></Pagination>
        </div>
        
        <Rooms rooms={rooms}></Rooms>

    </>)
}