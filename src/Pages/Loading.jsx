export default function Loading() {
  return (
    <div
      className="container d-flex justify-content-center align-content-center"
      style={{ height: "350px" }}
    >
      <div className="row d-flex justify-content-center align-content-center">
        <div
          className="col-1 mx-auto d-flex justify-content-center align-items-center flex-column"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            height: "35px",
            width: "35px",
            borderRadius: "50%",
          }}
        >
          <div
            className="spinner-border "
            role="status"
            style={{ color: "#0066B2", height: "25px", width: "25px" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
