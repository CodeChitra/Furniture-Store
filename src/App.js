import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'

import { Home, About, Cart, Products, SingleProduct, PrivateRoute, Error, Checkout, AuthWrapper } from "./pages";
function App() {
  return (
    <AuthWrapper>
      <Router>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/products' element={<Products />}></Route>
          <Route path='/products/:id' element={<SingleProduct />}></Route>
          <Route path='/checkout' element={<PrivateRoute><Checkout /></PrivateRoute>}></Route>
          <Route path='*' element={<Error />}></Route>
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  )
}

export default App
