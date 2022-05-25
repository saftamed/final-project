import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CartProduit from '../components/CartProduit'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import {useParams} from 'react-router-dom'
import axios from 'axios'

function Order() {
    const [order, setOrder] = React.useState(null)
    const {id} = useParams()
    const user = useSelector((state) => state.user.currentUser);


    useEffect(() => {
        axios.defaults.headers.common['token'] = `Bearer ${user.accessToken}`
        axios.get(`https://store-ltt.herokuapp.com/api/v1/order/${id}`).then(res => {
            const p = [...res.data.products.map(p => ({
                ...p.id,
                quantity: p.quantity,
                color: p.color,
                size: p.size,
            }))]
            console.log({
                products: p,
                total: res.data.amount,
                createdAt: res.data.createdAt,
                updatedAt: res.data.updatedAt,
                id: res.data.id,
                status: res.data.status,
                address: res.data.address,
            });
            setOrder({
                products: p,
                total: res.data.amount,
                createdAt: res.data.createdAt,
                updatedAt: res.data.updatedAt,
                id: res.data.id,
                status: res.data.status,
                address: res.data.address,
            })
        }
        , (err) => {
            console.log(err)
        }
        )
    }, [])

    return (
    <>
        <Nav/>
  { order !== null &&     <div className="cart">
          <h1>YOUR Order        </h1>
          <h4 style={{textAlign:"center"}} > Date: {order.createdAt}</h4>
          <div className="content">
              <div className="items">
                  {
                        order.products.map((item,ii) => <CartProduit key={item._id+ii} item={item} noShow={true} />)
                  }
              </div>
              <div className="checkout">
                  <h2>ORDER SUMMARY</h2>
                  <div className="sum">
                      <span>SubTotal</span>
                      <span>$45.99</span>
                  </div>
                  <div className="sum">
                      <span>Estimaed Shipping</span>
                      <span>$8</span>
                  </div>
                  <div className="sum">
                      <span>Taxes</span>
                      <span>$45.99</span>
                  </div>
    
                  <div className="sum">
                      <span>Shippin Discount</span>
                      <span>$5.99</span>
                  </div>
                  <div className="sum totf">
                      <span>Total</span>
                      <span>${Math.abs((order.total).toFixed(2))}</span>
                  </div>
                  <h2 style={{color:order.status === "paid"?"green":"red"}} >
                      {order.status}
                  </h2>
                 {/* {order.status !== "paid" &&( <Link to={"/checkout"}>
                  <div className="btn">
                       Add To Cart

                  </div>
                  
                  </Link>)} */}

              </div>
          </div>
      </div>}
      <Footer />
    </>
  )
}


export default Order