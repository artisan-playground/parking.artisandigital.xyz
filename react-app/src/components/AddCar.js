import React, { useState } from 'react'
import axios from 'axios'

export default function AddCar() {
  const initialCarState = {
    name: '',
    licensePlate: '',
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
    }
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

  return (
    <div>
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

          <button onClick={saveCar}>Submit</button>
        </div>
      )}
    </div>
  )
}
