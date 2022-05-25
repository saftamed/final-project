import React from 'react'
import { useDispatch } from 'react-redux'
import { cmntVerif } from '../store/userApi'
import {Delete,VerifiedUser} from '@material-ui/icons';
function VerifBtn({id}) {
    const dispatch = useDispatch()
  return (
    <button className="e-d d" onClick={(e) => cmntVerif(dispatch,id)} >Verified <VerifiedUser />  </button>
  )
}

export default VerifBtn