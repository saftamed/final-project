import React from 'react'
import { Link } from 'react-router-dom'

function Categories() {
  return (
    <div className="categories">
    <div className="container">
      <div className="flex flex-d-c">
        <div>
          <Link to={"/produits/clothing"}>
          
          <div>
            <h3>Clothing</h3>
          </div>
          <img
            src="https://cdn.shopify.com/s/files/1/0058/4538/5314/products/lttstore_ElementalTee02_TransparencyFile_400x.png?v=1648835310"
            alt=""
      
          />
          </Link>
        </div>
        <div>
        <Link to={"/produits/gear"}>
          <div>
            <h3>Gear</h3>
          </div>
          <img
            src="https://cdn.shopify.com/s/files/1/0058/4538/5314/products/lttstore_ElementalTee02_TransparencyFile_400x.png?v=1648835310"
            alt=""
           
          />
           </Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Categories