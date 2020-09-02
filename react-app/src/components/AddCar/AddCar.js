import React, { useState } from 'react'
import axios from 'axios'
import { Button } from 'antd'
import './AddCar.css'

export default function AddCar() {
  const initialCarState = {
    name: '',
    licensePlate: '',
    // image: null,
  }
  const [car, setCar] = useState(initialCarState)
  const [submitted, setSubmitted] = useState(false)

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

  const style = {
    '@media (minWidth: 500px)': {
      width: '120px',
    },
  }
  // const onChangeHandler = (event) => {
  //   setCar({ ...car, image: event.target.files[0] })
  // }

  return (
    <div className="page" style={style}>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button onClick={newCar}>Add</button>
        </div>
      ) : (
        <div>
          <div>
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              id="name"
              required
              value={car.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div>
            <label htmlFor="licensePlate">licensePlate</label>
            <input
              type="text"
              id="licensePlate"
              required
              value={car.licensePlate}
              onChange={handleInputChange}
              name="licensePlate"
            />
          </div>
          {/* <div>
            <label htmlFor="licensePlate">images</label>
            <input type="file" id="file" required onChange={onChangeHandler} name="image" />
          </div> */}

          <Button type="primary" onClick={saveCar}>
            Submit
          </Button>
        </div>
      )}
    </div>
  )
}
