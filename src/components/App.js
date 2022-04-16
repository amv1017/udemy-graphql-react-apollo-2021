import * as React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../routes/Home'
import Details from '../routes/Details'

export default () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />  
        <Route exact path="/:id" element={<Details />} />
      </Routes>
    </Router>
  )
}
