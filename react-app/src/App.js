import React from 'react'

import './App.css'
import { Layout } from 'antd'
import AddCar from './components/AddCar/AddCar'
import ListCar from './components/ListCar'

function App() {
  const { Content } = Layout

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
  )
}

export default App
