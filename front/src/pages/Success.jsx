import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import Loading from "../components/Loading";
import { clearCart } from "../store/cartSlice";
import { setLoading } from "../store/userSlice";

function Success() {
    const nav = useNavigate();
    const user = useSelector((state) => state.user.currentUser);
    const loading = useSelector((state) => state.cart.loading);
    const lastOrder = useSelector((state) => state.cart.lastOrder);
    const [dis, setDis] = useState(false)
    const {id} = useParams();
    console.log(id)
    const dispatch = useDispatch();


    useEffect(() => {
        axios.defaults.headers.common['token'] = `Bearer ${user.accessToken }`;
        dispatch(setLoading(true));
        const iid = id === "null" ? lastOrder : id;
        axios
          .post(
            "https://store-ltt.herokuapp.com/api/v1/order/success",
            {id:iid},
          )
          .then((res) => {
              setDis("block")
              dispatch(setLoading(false));
              dispatch(clearCart())
              setTimeout(() => {
                nav("/");
              }, 5000);
          });

    }, [])
  return dis?
    (
        <>
        <div className="bar" style={{backgroundColor:"#88B04B"}} ></div>
        <div className="success">
          <div className="card">
            <div className="sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1>Success</h1>
            <p>
              We received your purchase request;
              <br /> we'll be in touch shortly!
            </p>
          </div>
        </div>
        </>

    ):(

        <Loading />
      
 
    )
    
}
;

export default Success;
