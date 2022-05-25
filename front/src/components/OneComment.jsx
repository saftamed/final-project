import React from 'react'
import ReactStars from 'react-rating-stars-component'

function OneComment({com}) {
  return (
    <div className="comment-item">
    <div className="comment-item-header">
        <div className="avatar">
        {com.userId.username[0].toUpperCase()}
        </div>
        <div className="name">
          <p>{com.userId.username}</p>
          <p>{com.createdAt}</p>
          <ReactStars
            count={5}
            size={24}
            edit={false}
            value={com.rating}
            activeColor="#ffd700"
        />
        </div>
    </div>
    <div className="comment-item-body">
        <p>
            {com.comment}
        </p>
    </div>
                    
</div>
  )
}

export default OneComment