import { useDispatch } from "react-redux";
import { DeleteItemFromCartAsync } from "../features/cart/cartSlice";
import { PropTypes } from "prop-types";

export default function ConformDelete({
  product,
  id,
  handelRemove,
  index,
  data,
}) {
  const dispatch = useDispatch();
  {
    data && console.log({ index });
  }
  const DeleteItem = (id) => {
    dispatch(DeleteItemFromCartAsync(id));
  };
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">
          {id ? product.title : "ARE YOU SHURE YOU WANT TO DELETE THIS ADDRESS"}
        </h1>
      </div>
      <div className="modal-body d-flex mx-3">
        {id ? (
          <>
            <div style={{ width: "60px", height: "60px" }}>
              <img
                src="/public/images/warning.png"
                alt=""
                className="w-100 h-100"
              />
            </div>
            <p className="mt-3">ARE YOU SURE YOU WANT TO REMOVE THIS ITEM</p>
          </>
        ) : (
          <>
            <div>
              <div>Name: {data.Name}</div>
              <div>Email: {data.Email}</div>
              <div>Phone: {data.Phone_number}</div>
              <div>State: {data.State}</div>
              <div>Postal-code: {data.Postal_Code}</div>
            </div>
          </>
        )}
      </div>
      <div className="modal-footer">
        <div
          className=" fw-bold p-1 mb-2 cursor"
          data-bs-dismiss="modal"
          style={{
            color: "#0066B2",
            border: "1px solid ",
            borderRadius: "5px",
            fontSize: "17px",
          }}
        >
          Close
        </div>
        <div
          className="px-2 cursor fw-bold  ms-auto mb-2 p-1"
          onClick={() => {
            if (id) {
              DeleteItem(id);
            }
            handelRemove(index);
          }}
          data-bs-dismiss="modal"
          style={{
            color: "white",
            background: "red",
            borderRadius: "5px",
            fontSize: "17px",
          }}
        >
          Remove
        </div>
      </div>
    </div>
  );
}

ConformDelete.propTypes = {
  product: PropTypes.object,
  handelRemove: PropTypes.func,
  index: PropTypes.number,
  data: PropTypes.Object,
  id: PropTypes.number,
};