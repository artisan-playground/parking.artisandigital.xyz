import React from 'react'
import Radium, { StyleRoot } from 'radium'
import './App.css'
import AddCar from './components/AddCar/AddCar'
import ListCar from './components/ListCar'

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
      <div>
        <ListCar />
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
