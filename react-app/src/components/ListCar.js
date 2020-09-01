import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
    <div>
      <div>
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
      </div>
    </div>
  )
}
