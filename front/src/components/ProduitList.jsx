import React from "react";
import Produit from "./Produit";

function ProduitList({title,produitList}) {
  return (
    <div className="fav all">
      <div className="container">
      <h1 className="">{title}</h1>
        <div className="flex flex-d-c">
            {produitList.map(product => (
                <Produit key={product._id+title} product={product} />
            ))}
        </div>
      </div>
    </div>

  )}

export default ProduitList;
