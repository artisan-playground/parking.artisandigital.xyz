import React, { useEffect, useState } from 'react'
import axios from 'axios'

import logo from './logo.svg'

import './App.css'
import AddCar from './components/AddCar'

function App() {
  // useEffect(() => {
  //   getAPIVersion()
  // })

  // function getAPIVersion() {
  //   axios
  //     .get('/api/version')
  //     .then((response) => {
  //       console.log(`version=${response.data}`)
  //     })
  //     .catch((error) => {
  //       console.error('error:', error.status, error)
  //     })
  // }

  return (
    <div>
      <AddCar />
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //   </header>
    // </div>
  )
}

export default App
