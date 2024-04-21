import { useSelector } from "react-redux"

import { Navigate } from "react-router-dom"
import { PropTypes } from 'prop-types';
import { selectUserInfo } from "../../user/userSlice";


function  ProtectedAdmin({children}){

  const user=useSelector(selectUserInfo)

  if(!user){
    return <Navigate to="/login" replace={true}/>
  }
  if(user && user.role!=="admin")
  {
    return <Navigate to="/" replace={true}/>
  }
  return children;
 
}

export default ProtectedAdmin

ProtectedAdmin.propTypes = {
    children:PropTypes.node.isRequired
  }