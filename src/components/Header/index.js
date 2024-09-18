import {Link} from "react-router-dom"
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import CartContext from '../../context/CartContext'
import "./index.css"

const Header =()=>{
    const { cartList } = useContext(CartContext) 

    return (
        <div className="head-container">
            <h1>TeeRex Store</h1> 
            <div className="product-cart">
            <Link to="/products">   <p className="head-para">Produts</p></Link>  
            <Link to="/cart">  <FontAwesomeIcon icon={faCartShopping} /><span>{cartList.length}</span></Link>  
            </div>
        </div>
    )
}

export default Header