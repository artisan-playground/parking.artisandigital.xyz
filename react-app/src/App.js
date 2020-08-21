import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'

function App() {
  useEffect(() => {
    getAPIVersion()
  })
  const [count, setCount] = useState(0)

  function getAPIVersion() {
    axios
      .get('/api/version')
      .then((response) => {
        console.log(`version=${response.data}`)
      })
      .catch((error) => {
        console.error('error:', error.status, error)
      })
  }

  function postAPIVersion() {
    setCount(count + 1)
    console.log(count)
    // axios
    //   .post('/api/firebase/add', 'thana')
    //   .then((response) => {
    //     console.log(`version=${response.data}`)
    //   })
    //   .catch((error) => {
    //     console.error('error:', error.status, error)
    //   })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>You clicked {count} times</p>
        <button onClick={() => postAPIVersion()}>Click me</button>
      </header>
    </div>
  )
}

export default App
