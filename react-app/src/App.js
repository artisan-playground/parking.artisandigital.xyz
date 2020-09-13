import React from 'react'
import Radium, { StyleRoot } from 'radium'
import './App.css'
import { Card, Col, Row, Layout } from 'antd'
import AddCar from './components/AddCar/AddCar'
import ListCar from './components/ListCar'

function App() {
  const { Content } = Layout
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
    <Layout>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 24 }}>
        <div className="site-layout-background App">
          <div style={{ marginTop: 16 }}>
            <h1>Please Add Your Car. </h1>
            <AddCar />
          </div>
          <div>
            <ListCar />
          </div>
        </div>
      </Content>
    </Layout>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //   </header>
    // </div>
  )
}

export default App
