import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useParams } from "react-router";

import ProduitList from "../components/ProduitList";

function CategorieProduit() {
  let { cat } = useParams();
  const [products, setProducts] = useState([]);
  const [fproducts, setFproducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const filterFunction = (item) => {
    if (filters.color) {
      if (filters.size) {
        let a = item.colors.find((c) => c.name === filters.color);
        if(a === undefined || a.sizes === undefined){
          return false;
        }
        return (
          item.colors.map((i) => i.name).includes(filters.color) &&
          a.sizes[
            filters.size
          ] > 0
        );
      }
      return item.colors.map((i) => i.name).includes(filters.color);
    } else if (filters.size) {
      if (item.colors.length === 0 || item.colors[0].sizes === undefined) {
        return false;
      }
      return (
        item.colors
          .map((i) => (i.sizes[filters.size] ? i.sizes[filters.size] : 0))
          .reduce((a, b) => a + b, 0) > 0
      );
    }
    return true;
  };

  useEffect(() => {
    setFproducts(products.filter(filterFunction));
  }, [filters, products]);

  useEffect(() => {
    if (sort === "newest") {
      setFproducts((prev) =>
        [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } else if (sort === "asc") {
      setFproducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFproducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  const setFilter = (e) => {
    setFilters((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    axios
      .get(`https://store-ltt.herokuapp.com/api/v1/product?category=${cat}`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {});
  }, [cat]);
  return (
    <>
      <Nav />
      <h1 className="heading">Categorie Produit</h1>
      <div className="filter">
        <div className="f">
          <span>Filter Products:</span>
          <select
            onChange={(e) => setFilter(e)}
            name={"color"}
            defaultValue="DEFAULT"
          >
            <option disabled value="DEFAULT">
              Color
            </option>
            <option>White</option>
            <option>Black</option>
            <option>Red</option>
            <option>Blue</option>
            <option>Yellow</option>
            <option>Green</option>
          </select>
          <select
            onChange={(e) => setFilter(e)}
            name={"size"}
            defaultValue="DEFAULT"
          >
            <option disabled value="DEFAULT">
              Size
            </option>
            <option value={"s"}>S</option>
            <option value={"m"}>M</option>
            <option value={"l"}>L</option>
            <option value={"xl"}>XL</option>
            <option value={"xxl"}>XXL</option>
          </select>
        </div>
        <div className="sort">
          <span>Sort Products:</span>
          <select onChange={(e) => setSort(e.target.value)}>
            <option value={"newest"}>Newest</option>
            <option value={"asc"}>Price (asc)</option>
            <option value={"desc"}>Price (desc)</option>
          </select>
        </div>
      </div>

      <ProduitList title={"ALL PRODUCTS"} produitList={fproducts} />
    </>
  );
}

export default CategorieProduit;
