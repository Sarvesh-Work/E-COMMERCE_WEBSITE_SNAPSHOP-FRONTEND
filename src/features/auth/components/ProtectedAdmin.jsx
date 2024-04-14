import { useSelector } from "react-redux"
import { selectLoggedUser } from "../AuthSlice"
import { Navigate } from "react-router-dom"
import { PropTypes } from 'prop-types';


function  ProtectedAdmin({children}){

  const user=useSelector(selectLoggedUser)

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