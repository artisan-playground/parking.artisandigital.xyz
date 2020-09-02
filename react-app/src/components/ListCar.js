import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'
import { Card, Avatar } from 'antd'

export default function CarsList() {
  const { Meta } = Card
  const [cars, setCars] = useState([])

  useEffect(() => {
    getListCar()
  }, [])

  function getListCar() {
    axios
      .get('/api/firebase/getCar')
      .then((response) => {
        console.log(response.data)
        setCars(response.data)
      })
      .catch((error) => {
        console.error('error:', error.status, error)
      })
  }
  const style = {
    '@media (minWidth: 500px)': {
      width: '120px',
    },
  }
  return (
    // <div>
    //   <div>
    //     <h4>Cars List</h4>
    //     <ul>
    //       {cars &&
    //         cars.map((car, index) => (
    //           <li key={index}>
    //             <p>
    //               {index + 1} ชื่อเจ้าของรถ {car.data.name}{' '}
    //             </p>
    //             เลขทะเบียนรถ {car.data.licensePlate}
    //           </li>
    //         ))}
    //     </ul>
    //   </div>
    // </div>
    <div style={style}>
      <h1>Cars List</h1>
      <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
      >
        <Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title="เจ้าของรถ"
          description="This is the description"
        />
      </Card>
    </div>
  )
}
