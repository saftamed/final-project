import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import NewsLetter from '../components/NewsLetter'
import ProduitList from '../components/ProduitList'
import Slider from '../components/Slider'


function Home() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    axios.get('https://store-ltt.herokuapp.com/api/v1/product')
      .then(response => {
        console.log(response.data)
        setProducts(response.data)
      })
      .catch(error => {

      })
  
  }, [])
  
  return (
    <>
        <Nav/>
        <Slider/>
        <ProduitList title={"OUR FAVORITES"} produitList={products?products.slice(0,4):[]}/>
        <Categories/>
        <ProduitList title={"ALL PRODUCTS"} produitList={products?products.slice(2,6):[]}/>
        <div className="acenter">
          <Link to={"/produits/all"}>
          <button className="btn">Show More</button>
          
          </Link>
        </div>
        <NewsLetter/>
        <Footer/>
    </>
  )
}

export default Home