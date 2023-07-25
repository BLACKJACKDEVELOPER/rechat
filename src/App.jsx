import {
  Button,
  Input,
  Pagination,
  Space
} from '@arco-design/web-react'

import './App.css';

import {
  useNavigate
} from 'react-router-dom'

import Rooms from './components/Rooms.jsx'

import {
  useState,
  useEffect
} from 'react'

import axios from 'axios'

function App() {

  const Link = useNavigate()
  const InputSearch = Input.Search;


const [rooms,setRooms] = useState([])
// fetching rooms
useEffect(()=> {
  axios.get(`${process.env.REACT_APP_SERVER}/rooms?token=${localStorage.getItem('token')}`).then(({data})=> {
    setRooms(data.data)
  })
},[])



  return (<>
    <div className="options">
      <Space>
        <div className="leftOptions">
          <Space>
            <Button onClick={()=> Link('/createRoom')} type="primary" style={{ width: 100 }}>สร้างห้องใหม่</Button>
            <Button onClick={()=> Link('/myrooms')} type="outline" style={{ width: 100 }}>ดูห้องของคุณ</Button>
          </Space>
        </div>
        <InputSearch style={{ width: 500 }} placeholder="ค้นหาห้อง" className="search" allowClear type="primary" searchButton></InputSearch>
      </Space>
    </div>

    <div style={{ marginBottom:'1%',display:'flex',justifyContent:'space-between',alignItem:'center',borderBottom: '3px solid #0101' }}>
      <h1>🏠 ห้องทั้งหมด</h1>
      <Pagination simple total={50} size='large' />
    </div>
    <Rooms rooms={rooms}></Rooms>
  </>);
}

export default App;
