import { useSelector } from "react-redux";
import { selectLoggedUser } from "../auth.js";
import { Navigate } from "react-router-dom";
import { PropTypes } from "prop-types";

function Protected({ children }) {
  const user = useSelector(selectLoggedUser);

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
}

export default Protected;

Protected.propTypes = {
  children: PropTypes.node.isRequired,
};
