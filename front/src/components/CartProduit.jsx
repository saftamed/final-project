import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { changeQuantity, removeProduct } from "../store/cartSlice";

function CartProduit({item,noShow}) {
  const dispatch = useDispatch();
  
  return (
    <div className="item">
    <div className="pro">
      <NavLink to={`/produit/${item._id}`}>
        <img src={"https://store-ltt.herokuapp.com/public/"+item.img} alt=""/>
      </NavLink>
    </div>
    <div className="details">
      <h3>{item.title}</h3>
      {
        item.colors.length>0 && (
          <p>{item.colors[item.color].name} / {item.size}</p>
        )
      }
      <p>${item.price } USD</p>
    </div>
    <div className="tot">
      <p>PRICE USD</p>
      <div className="price">${Math.abs((item.price* item.quantity).toFixed(2))} USD</div>
        {  noShow === false? (<>
      <div className="qte">

         <button onClick={()=>dispatch(changeQuantity({id:item.iid,qte:-1}))}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
            </svg>
         </button>
          <span>{item.quantity}</span>
       <button onClick={()=>dispatch(changeQuantity({id:item.iid,qte:1}))}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
       </button>

      </div>
      <button onClick={()=>dispatch(removeProduct({id:item.iid}))}>Remove</button>
        </>)
        
        : (
          <div>
            <span>Quantity : </span>
          <span>{item.quantity}</span>
          </div>
        )
        
        }
    </div>
</div>
  )
}

export default CartProduit