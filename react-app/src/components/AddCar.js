import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'

export default function AddCar() {
  useEffect(() => {
    getListCar()
  })

  function getListCar() {
    axios
      .get('/api/firebase/getCar')
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error('error:', error.status, error)
      })
  }

  const initialCarState = {
    id: null,
    name: '',
    licensePlate: '',
    published: false,
  }
  const [car, setCar] = useState(initialCarState)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCar({ ...car, [name]: value })
  }

  const saveCar = () => {
    var data = {
      licensePlate: car.name,
      name: car.licensePlate,
    }
    axios
      .post('/api/firebase/add', { data })

      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        console.log(e)
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
