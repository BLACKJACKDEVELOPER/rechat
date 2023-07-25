import {
    Empty,
    List,
    Avatar,
    Pagination,
    Message,
    Button
} from '@arco-design/web-react'
import '../styles/messages.css'
export default function Messages() {
    

    return (<>
    
        <div style={{
            borderBottom:'2px solid #0101',
            display:'flex',
            justifyContent:'flex-start',
            alignItem:'center'
        }}>
            <h2>📢 ข้อความ <Button size='small' type='primary' status='danger' shape='circle'>{10}</Button> </h2>
            <Pagination simple total={50}></Pagination>
        </div>

        <List
      style={{ width: '100%',margin:'auto',marginTop:'2%' }}
      dataSource={new Array(10).fill({
        title: 'ราคา Bitcoin สินปีตาดว่าจะทะลุ 20,000 จัด',
        description: 'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.',
      })}
      render={(item, index) => (
        <List.Item onClick={()=> Message.success({
            id:'msg',
            content:'ข้อความที่ '+parseInt(index + 1)
        })} key={index} className='boxmsg'>
          <List.Item.Meta
            avatar={<Avatar shape='square'>{index + 1}</Avatar>}
            title={item.title}
            description={item.description}
          />
        </List.Item>
      )}
    />
        
    </>)
}