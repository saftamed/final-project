import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import ProduitList from "../components/ProduitList";
import ScrollAnimation from "react-animate-on-scroll";
import ReactStars from "react-rating-stars-component";

import axios from "axios";
import { useParams } from "react-router";
import { addProduct } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import { setNotification } from "../store/userSlice";
import AddComment from "../components/AddComment";
import Footer from "../components/Footer";
function ProduitDet() {
  const [product, setProduct] = useState(null);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState("s");
  let { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`https://store-ltt.herokuapp.com/api/v1/product/find/${id}`)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      });
  }, [id]);
  const addToCart = () => {
    dispatch(addProduct({
      ...product,
      color: color,
      size: size,
      quantity: 1,
    }));
    dispatch(setNotification({ show: true, message: "Produit ajouté au panier", type: "success" }));
  };
  return (
    <>
      <Nav />
      {product && (
        <div className="pcontainer flex-d-c">
          <div className="img">
            <img
              src={"https://store-ltt.herokuapp.com/public/" + product.img}
              alt=""
            />
          </div>
          <div className="info">
            <h1>{product.title}</h1>
            {product.rating > 0 ? (
              <ReactStars
                count={5}
                size={24}
                edit={false}
                value={product.rating}
                activeColor="#ffd700"
              />) : (<p>Pas encore noté</p>)}

            {
              product.colors.length > 0 && (

                <>
                  <div className="colors">
                    <h3>PICK COLOR: {product.colors[color].name}</h3>
                    <div>
                      {product.colors?.map((c, index) => (
                        <div
                          key={index}
                          className={index === color ? "borders" : ""}
                          style={{ backgroundColor: c.name }}
                          onClick={() => setColor(index)}
                        ></div>
                      ))}
                    </div>
                  </div>
                  {
                    product.colors[color].sizes &&
                    <><div className="sizes">
                      <h3>PICK SIZE: {size} </h3>
                      <div>
                        {Object.entries(product.colors[color].sizes).map(
                          ([sizeName, value]) => (
                            <div
                              key={sizeName}
                              style={{display:value>0 ? "flex" : "none"}}
                              className={sizeName === size ? "sles" : ""}
                              onClick={() => setSize(sizeName)}
                            >
                              {sizeName}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                      <div className="detai">
                        <details>
                          <summary>SIZE GUIDE</summary>

                          <img src="/img/sizes.png" alt="" />
                        </details>

                      </div>
                    </>
                  }
                </>
              )
            }

            {
              product.options.map((o, index) => (
                <div key={index} className="option">
                  <h3>{o.name}</h3>
                  {
                    Object.entries(o.option).map(([valueName, value]) => (
                      <div
                        key={valueName}
                      >
                        {valueName}
                      </div>
                    ))
                  }
                </div>
              ))
            }
            <div className="detai">
              <details>
                <summary>PRODUCT INFORMATION</summary>
                <br />
                <p>{product.desc}</p>
              </details>
            </div>
            <div className="add__cart">
              <div>
                <button className="btn" type="submit" onClick={() => addToCart()}>Add to cart</button>
              </div>

              <div>
                <span>${product.price} USD</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <AddComment product={product} />

      <Footer />

      {/* <ScrollAnimation animateIn="fadeIn">

      <ProduitList title={"OUR FAVORITES"}/>
</ScrollAnimation> */}
    </>
  );
}

export default ProduitDet;
