import React, { useState } from "react";

function AddAddressModal({ show, closeHandle, addAddressHandler }) {
  const [adr, setAdr] = useState({})
  const updateForm = (e) => {
    setAdr({ ...adr, [e.target.name]: e.target.value })
  }
  return (
    <div className="modal" style={{ display: show ? "block" : "none" }}>
      <div className="bg" onClick={closeHandle}></div>
      <div className="ccc">
        <div className="modal-content">
          <span className="close" onClick={closeHandle}>
            &times;
          </span>
          <div className="body">
            <div className="adr">
              <div>
                <h1>Add Address</h1>
                <div>
                  <div>
                    <label>street</label>
                  </div>
                  <input
                    type="text"
                    name="street"
                   onChange={(e) =>updateForm(e) }
                  />
                </div>
                <div>
                  <div>
                    <label>city</label>
                  </div>
                  <input
                    type="text"
                    name="city"
                    onChange={(e) =>updateForm(e) }
                  />
                </div>
                <div>
                  <div>
                    <label>zip</label>
                  </div>
                  <input
                    type="text"
                    name="zip"
                    onChange={(e) =>updateForm(e) }
                  />
                </div>


                <button
                  className="btn"
                  onClick={() => {addAddressHandler(adr);closeHandle()}}
                >
                  Add New Address
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAddressModal;
