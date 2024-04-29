import { useDispatch } from "react-redux";
import { DeleteItemFromCartAsync } from "../features/cart/cartSlice";



export default function ConformDelete({ product,id }) {
    const dispatch=useDispatch()
    console.log(product.id)
    const DeleteItem = (id) => {
       
        dispatch(DeleteItemFromCartAsync(id));
        
      };
  return (
    
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="staticBackdropLabel">
            {product.title}
          </h1>
        </div>
        <div className="modal-body d-flex mx-3">
            <div style={{width:"60px",height:"60px"}}>
                 <img src="/public/images/warning.png" alt="" className="w-100 h-100" />
            </div>
            <p className="mt-3">
                 ARE YOU SURE YOU WANT TO REMOVE THIS ITEM
            </p>
        </div>
        <div className="modal-footer">
          <div
            
            
            className=" fw-bold p-1 mb-2 cursor"
            data-bs-dismiss="modal"
            style={{
                color: "#0066B2",
                border:"1px solid ",
                borderRadius: "5px",
                fontSize:"17px"
              }}
          >
            Close
          </div>
          <div
            className="px-2 cursor fw-bold  ms-auto mb-2 p-1"
            onClick={() => DeleteItem(id)}
            data-bs-dismiss="modal"
            style={{
              color: "white",
              background:"red",
              borderRadius: "5px",
              fontSize:"17px"
            }}
          >
            Remove
          </div>
        </div>
      </div>
    
  );
}
