import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import AllProducts from "./components/AllProducts"
import Cart from './components/Cart'

import  { CartProvider } from './context/CartContext'

import './App.css'

 /* const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductItemDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
     
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
) */

  const App = () => {
    return (
      <CartProvider>
        <Router>
          <Routes>
            
            
             
              <Route path="/products" element={<AllProducts />} />
              
              <Route path="/cart" element={<Cart />} />
          
          </Routes>
        </Router>
      </CartProvider>
    )
  }
  
  export default App