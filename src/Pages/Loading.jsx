export default function Loading() {
  return (
    <div className=" container">
      <div className="row  mt-3">
        <div
          className="col-1 mx-auto d-flex justify-content-center align-items-center flex-column "
          style={{
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              height:"40px",
              width:"40px",
              borderRadius:"50%"
          }}
        >
          <div className=" spinner-border" role="status" style={{color:"#0066B2"}}></div>
        </div>
      </div>
    </div>
  );
}
