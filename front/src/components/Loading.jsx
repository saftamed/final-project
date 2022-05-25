import React from 'react'
import { useSelector } from "react-redux";


function Loading() {
    const fetching = useSelector((state) => state.user.isFetching);
  return fetching && (
    <div className='loading'>
        <h1><div class="loader"></div> Loading...</h1>
    </div>
  )
}

export default Loading