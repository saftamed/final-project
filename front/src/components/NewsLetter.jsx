import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { subscribe } from '../store/userApi'


function NewsLetter() {
  const [email, setEmail] = useState("")
  const dispatch = useDispatch()
  return (
    <div className="new-letter">
    <h1>UPDATES</h1>
    <div>
      <input
        type="text"
        placeholder="Enter your email address"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={()=> subscribe(dispatch,email)} >Subscribe Now</button>
    </div>
  </div>
  )
}

export default NewsLetter