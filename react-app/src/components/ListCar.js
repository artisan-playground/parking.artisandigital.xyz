import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'
<<<<<<< Updated upstream
import { Card, Avatar } from 'antd'
=======
import { Card, Avatar } from 'antd';

const { Meta } = Card;
>>>>>>> Stashed changes

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

    <div>
      {/* <div>
        <h4>Cars List</h4>
        <ul>
          {cars &&
            cars.map((car, index) => (
              <li key={index}>
                <p>
                  {index + 1} ชื่อเจ้าของรถ {car.data.name}{' '}
                เลขทะเบียนรถ {car.data.licensePlate}
                </p>
              </li>
            ))}
        </ul>
      </div> */}
      {cars &&
      cars.map((car,index) =>(
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
            title="Card title"
            description="This is the description"
          />
        </Card>
      ))}
    </div>
  )
}
