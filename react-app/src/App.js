import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Radium, { StyleRoot } from 'radium'

import logo from './logo.svg'

import './App.css'
import AddCar from './components/AddCar/AddCar'

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
    <StyleRoot>
      <div className="App">
        <h1>Please Add Your Car. </h1>
        <AddCar />
      </div>
    </StyleRoot>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //   </header>
    // </div>
  )
}

export default Radium(App)
