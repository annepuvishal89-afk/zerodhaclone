import './App.css'
import Header from './Header'
import Products from './Products.jsx'
import Register from './Register.jsx'
import Login from './Login.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './home.jsx'
import About from './About.jsx'

function App() {
  return (
    <>
      <section style={{ textAlign: "center" }}>
        <Header />
      </section>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/about' element={<About />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />    
      </Routes>
    </>
  )
}

export default App;