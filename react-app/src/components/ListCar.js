import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'
import { Card, Col, Row } from 'antd'

export default function CarsList() {
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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginRight: 16, marginLeft: 16 }}>
      <Row gutter={16}>
        {cars &&
          cars.map((car, index) => (
            <Col span={4} key={index}>
              <Card title={car.data.name} bordered={true} style={{ marginTop: 16 }}>
                {car.data.licensePlate}
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  )
}
