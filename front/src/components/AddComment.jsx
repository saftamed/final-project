import React from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { addComment } from "../store/userApi";
import OneComment from "./OneComment";

function AddComment({product}) {
    const [rating, setRating] = React.useState(5);
    const [comment, setComment] = React.useState("");
    const [show, setShow] = React.useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        addComment(dispatch,{rating,comment,productId:product._id});
        setShow(!show)
        setComment("");
        setRating(5);
    }
  return (
    <div className="comment">
      <div className="details">
        <div className="summary">
            <div>
                <h2>Customer Reviews
                {(product?.comments?.length ===0) &&
                <p>no comments yet</p>
  
           }
                </h2>
                <button className="btn" onClick={(e) => setShow(!show)} > Add a comment</button>
            </div>
        </div>
        <div className="addForm" style={{height:show? "300px":"0px" }}>
            <form onSubmit={(e)=>handleSubmit(e)}>
                    <label>Your comment</label>
                    <textarea className="form-control" rows="3" required onChange={(e) => setComment(e.target.value)} ></textarea>
                    <ReactStars
                        count={5}
                        size={32}
                        edit={true}
                        onChange={(value) => setRating(value)}
                        value={5}
                        activeColor="#ffd700"
                    />
                    <input type="submit" className="btn"  value="Save" />
            </form>

        </div>
        <div className="body">
           {product &&
                product.comments.map((c)=>(
                  <OneComment key={c._id} com={c}    />
                ))
           }

        </div>

      </div>
    </div>
  );
}

export default AddComment;
