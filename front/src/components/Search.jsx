import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Search() {
  const [searchKey, setSearchKey] = useState("");
  const [searchProduct, setSearchProduct] = useState([]);

  useEffect(() => {
    if (searchKey.length > 2) {
      axios
        .get(`https://store-ltt.herokuapp.com/api/v1/product/search/${searchKey}`)
        .then((response) => {
          setSearchProduct(response.data);
        })
        .catch((error) => {});
    } else {
      setSearchProduct([]);
    }
  }, [searchKey]);

  return (
    <div>
      <input
        type="text"
        placeholder="search"
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>
      <div
        className="search-items"
        style={{ display: searchProduct.length > 0 ? "block" : "none" }}
      >
        {searchProduct.map((product) => {
          return (
            <Link
              to={`/produit/${product._id}`}
              key={product._id}
              onClick={() => setSearchKey("")}
            >
              <div className="search-item">
                <div className="search-item-img">
                  <img src={"https://store-ltt.herokuapp.com/public/"+product.img} alt="" />
                </div>
                <div className="search-item-info">
                  <h3>{product.title}</h3>
                  <p>{product.desc.substring(0, 100)} ...</p>
                </div>
                <div className="sp"></div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
