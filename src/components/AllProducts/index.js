import {useState, useEffect, } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFilter } from '@fortawesome/free-solid-svg-icons';
import ProductCard from "../ProductCard";
import Header from "../Header";
import "./index.css";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  

  // State for filters
  const [filters, setFilters] = useState({
    color: [],
    gender: [],
    priceRange: [],
    type: []
  });

  const getProducts = async () => {
    try {
      const response = await fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json');
      const data = await response.json();
      if (response.ok) {
        const productsList = data.map(each => ({
          color: each.color,
          currency: each.currency,
          gender: each.gender,
          id: each.id,
          imageUrl: each.imageURL,
          name: each.name,
          price: each.price,
          quantity: each.quantity,
          type: each.type
        }));
        setProducts(productsList);
        setFilteredProducts(productsList);
      } else {
        console.error(data.error_msg);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleFilterChange = (event, category) => {
    const { id, checked } = event.target;
    setFilters(prevFilters => {
      const updatedCategory = checked
        ? [...prevFilters[category], id]
        : prevFilters[category].filter(item => item !== id);

      return { ...prevFilters, [category]: updatedCategory };
    });
  };

  useEffect(() => {
    const applyFilters = () => {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = products.filter(product => {
        const productName = product.name.toLowerCase();
        const productType = product.type.toLowerCase();
        const productColors = Array.isArray(product.color)
          ? product.color.map(color => color.toLowerCase())
          : [product.color.toLowerCase()];

        const matchesSearch =
          productName.includes(lowercasedQuery) ||
          productColors.some(color => color.includes(lowercasedQuery)) ||
          productType.includes(lowercasedQuery);

        const matchesColor = filters.color.length === 0 || filters.color.includes(product.color.toLowerCase());
        const matchesGender = filters.gender.length === 0 || filters.gender.includes(product.gender.toLowerCase());
        const matchesType = filters.type.length === 0 || filters.type.includes(product.type.toLowerCase());

        const priceRanges = {
          'z-t': [0, 250],
          'z-f': [251, 450],
          'z-t+': [451, Infinity],
        };
        const matchesPriceRange =
          filters.priceRange.length === 0 ||
          filters.priceRange.some(range => {
            const [min, max] = priceRanges[range];
            return product.price >= min && product.price <= max;
          });

        return matchesSearch && matchesColor && matchesGender && matchesType && matchesPriceRange;
      });
      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [products, searchQuery, filters]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Toggle filter visibility
  const toggleFilters = () => {
    setShowFilters(prevState => !prevState);
  };



  return (
    <div>
      <Header />
      
        <div>
        <div className="search-container">
            
          <input
            type="search"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} />

         
          </div>
          <button className="filter-toggle" onClick={toggleFilters}>
            <FontAwesomeIcon icon={faFilter} /> Filters
          </button> 
        
       

        <div className="main-container">
          
         

          {/* Filter dropdown (visibility based on showFilters) */}
          <div className={` ${showFilters ? 'visible' : ''}`}>
            {/* Color Filter */}
            <div className="filter-section">
              <h1>Color</h1>
              <div>
                <input id="red" type="checkbox" onChange={(e) => handleFilterChange(e, 'color')} />
                <label htmlFor="red">Red</label>
              </div>
              <div>
                <input id="blue" type="checkbox" onChange={(e) => handleFilterChange(e, 'color')} />
                <label htmlFor="blue">Blue</label>
              </div>
              <div>
                <input id="green" type="checkbox" onChange={(e) => handleFilterChange(e, 'color')} />
                <label htmlFor="green">Green</label>
              </div>
            </div>

            {/* Gender Filter */}
            <div className="filter-section">
              <h1>Gender</h1>
              <div>
                <input id="men" type="checkbox" onChange={(e) => handleFilterChange(e, 'gender')} />
                <label htmlFor="men">Men</label>
              </div>
              <div>
                <input id="women" type="checkbox" onChange={(e) => handleFilterChange(e, 'gender')} />
                <label htmlFor="women">Women</label>
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="filter-section">
              <h1>Price</h1>
              <div>
                <input id="z-t" type="checkbox" onChange={(e) => handleFilterChange(e, 'priceRange')} />
                <label htmlFor="z-t">0 - RS250</label>
              </div>
              <div>
                <input id="z-f" type="checkbox" onChange={(e) => handleFilterChange(e, 'priceRange')} />
                <label htmlFor="z-f">RS251 - RS450</label>
              </div>
              <div>
                <input id="z-t+" type="checkbox" onChange={(e) => handleFilterChange(e, 'priceRange')} />
                <label htmlFor="z-t+">450+</label>
              </div>
            </div>

            {/* Type Filter */}
            <div className="filter-section">
              <h1>Type</h1>
              <div>
                <input id="polo" type="checkbox" onChange={(e) => handleFilterChange(e, 'type')} />
                <label htmlFor="polo">Polo</label>
              </div>
              <div>
                <input id="hoodie" type="checkbox" onChange={(e) => handleFilterChange(e, 'type')} />
                <label htmlFor="hoodie">Hoodie</label>
              </div>
              <div>
                <input id="basic" type="checkbox" onChange={(e) => handleFilterChange(e, 'type')} />
                <label htmlFor="basic">Basic</label>
              </div>
            </div>
          </div>

          {/* Products container */}
          <div className="products-container">
            <ul className="ul">
              {filteredProducts.map(each => (
                <ProductCard details={each} key={each.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
