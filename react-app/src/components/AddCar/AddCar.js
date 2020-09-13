import React, { useState } from 'react'
import axios from 'axios'
import { Button, Form, Input } from 'antd'
import './AddCar.css'

export default function AddCar() {
  const initialCarState = {
    name: '',
    licensePlate: '',
    // image: null,
  }
  const [car, setCar] = useState(initialCarState)
  const [submitted, setSubmitted] = useState(false)

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCar({ ...car, [name]: value })
  }

  const saveCar = () => {
    var data = {
      name: car.name,
      licensePlate: car.licensePlate,
      img: car.image,
    }
    console.log(data)

    axios
      .post('/api/firebase/add', { data })
      .then((e) => {
        window.location.reload(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const newCar = () => {
    setCar(initialCarState)
    setSubmitted(false)
  }

  // const onChangeHandler = (event) => {
  //   setCar({ ...car, image: event.target.files[0] })
  // }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="page">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button onClick={newCar}>Add</button>
        </div>
      ) : (
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={saveCar}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="ชื่อเจ้าของรถ"
            name="name"
            rules={[{ required: true, message: 'กรุณากรอกชื่อเจ้าของรถ!' }]}
          >
            <Input
              type="text"
              id="name"
              value={car.name}
              onChange={handleInputChange}
              name="name"
            />
          </Form.Item>
          <Form.Item
            label="ทะเบียนรถ"
            name="licensePlate"
            rules={[{ required: true, message: 'กรุณากรอกทะเบียนรถ!' }]}
          >
            <Input
              type="text"
              id="licensePlate"
              value={car.licensePlate}
              onChange={handleInputChange}
              name="licensePlate"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      )}
    </div>
  )
}
