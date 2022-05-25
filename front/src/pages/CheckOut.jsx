import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../store/userSlice";
import Loading from "../components/Loading";
import { setOrderId } from "../store/cartSlice";

function CheckOut() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const [adr, setAdr] = React.useState(0);
  const [adrInfo, setAdrInfo] = React.useState({});
  const nav = useNavigate();
  const [etap, setEtap] = React.useState(1);
  const dispatch = useDispatch();
  const chechout = async () => {
    const items = cart.products.map((item) => {
      return {
        id: item._id,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      };
    });
    axios.defaults.headers.common["token"] = `Bearer ${user.accessToken}`;
    dispatch(setLoading(true));
    axios
      .post(
        "https://store-ltt.herokuapp.com/api/v1/checkout-stripe/create-checkout-session",
        { items, address: adrInfo }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(setLoading(false));
        window.location = res.data.url;
      });
  };
  useEffect(() => {
    dispatch(setLoading(false));
    if (etap === 2) {
      const items = cart.products.map((item) => {
        return {
          id: item._id,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        };
      });
      window.paypal
        .Buttons({
          style: {
            layout: "horizontal",
            color: "gold",
            shape: "rect",
            label: "paypal",
          },
          createOrder: function (data, actions) {
            axios.defaults.headers.common["token"] = `Bearer ${user.accessToken}`;

            return axios
              .post(
                "https://store-ltt.herokuapp.com/api/v1/checkout-pay/create-order",
                {items, address: adrInfo}
              )
              .then(function (res) {
                console.log(res.data);
                dispatch( setOrderId(res.data.id));
                return res.data.orderID;
              });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (res){
              nav(`/success/null`);
            });
          },
          onError: function (err) {
            console.log("error");
            nav(`/cancel`);
          }
          , onCancel: function (data, actions) {
            console.log("cancel");
            nav(`/cancel`);
          }
        })
        .render("#paypal-button-container");
    }
  }, [etap]);

  useEffect(() => {
    if (user) {
      setAdrInfo(user.address[adr]);
    }
  }, [user, adr]);
  return (
    <>
    <Loading />
    <div className="checkout-modal">
      <div
        className="container op"
        style={{ animation: etap === 2 ? "opp2 3s ease" : "" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => nav("/cart")}
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-arrow-left-short"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
          />
        </svg>
        <div className="title">Check Out</div>
        <div className="content">
          {etap === 1 && (
            <div className="adresses">
              <div className="title-m2">Adresse de livraison</div>
              <div class="custom-select" style={{ width: "100%" }}>
                <select
                  defaultValue={adr}
                  onChange={(e) => setAdr(e.target.value)}
                >
                  {user.address.map((a, i) => (
                    <option
                      value={i}
                      key={a._id}
                    >{`${a.city} ${a.street} ${a.zip}`}</option>
                  ))}
                </select>
              </div>
              <div className="title-m2" style={{ margin: "20px 0" }}>
                Adresse 1
              </div>
              <div class="form__group field">
                <input
                  type="input"
                  class="form__field"
                  placeholder="City"
                  name="city"
                  id="city"
                  required
                  value={adrInfo.city}
                  onChange={(e) =>
                    setAdrInfo({ ...adrInfo, city: e.target.value })
                  }
                />
                <label  htmlFor="city" className="form__label">
                  City
                </label>
              </div>
              <div className="form__group field">
                <input
                  type="input"
                  className="form__field"
                  placeholder="street"
                  name="street"
                  id="street"
                  value={adrInfo.street}
                  onChange={(e) =>
                    setAdrInfo({ ...adrInfo, street: e.target.value })
                  }
                  required
                />
                <label htmlFor="street" className="form__label">
                  Street
                </label>
              </div>
              <div className="form__group field">
                <input
                  type="input"
                  class="form__field"
                  placeholder="zip"
                  name="zip"
                  id="zip"
                  value={adrInfo.zip}
                  onChange={(e) =>
                    setAdrInfo({ ...adrInfo, zip: e.target.value })
                  }
                  required
                />
                <label htmlFor="zip" className="form__label">
                  Zip
                </label>
              </div>
              <div className="form__group field">
                <input
                  type="input"
                  className="form__field"
                  placeholder="tel"
                  name="tel"
                  id="tel"
                  required
                  value={adrInfo.tel}
                  onChange={(e) =>
                    setAdrInfo({ ...adrInfo, tel: e.target.value })
                  }
                />
                <label htmlFor="tel" className="form__label">
                  Phone Number
                </label>
              </div>
              <button className="btn btn2" onClick={() => setEtap(2)}>
                Next
              </button>
            </div>
          )}
          {etap === 2 && (
            <div className="method">
              <div id="paypal-button-container"></div>
              <button className="btn btt" onClick={chechout}>
                Pay With{" "}
                <img
                  src="https://logo-marque.com/wp-content/uploads/2021/03/Stripe-Symbole.jpg"
                  alt="Stripe"
                  style={{ width: "60px", borderRadius: 3 }}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default CheckOut;
