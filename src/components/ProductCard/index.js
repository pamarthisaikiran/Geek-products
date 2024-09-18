import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'; // Import the CSS file

const ProductCard = (props) => {
  const { details } = props;
  const { imageUrl,  name, price, quantity } = details;
  const cartContext = useContext(CartContext)
  const {addCartItem} = cartContext
 
  const onAddItem=()=>{
    addCartItem({...details,quantity})
    console.log(addCartItem)
}

  return (
    <li className='li'>
      <div className='image-container'>
        <img className='pro-img' src={imageUrl} alt={name} />
        <span className='product-name'>{name}</span> {/* Product name over the image */}
      </div>
      <div className='pri-but'>
        <p>Rs {price}</p>
        <button  onClick={onAddItem}>Add to cart</button>
      </div>
    </li>
  );
};

export default ProductCard;
