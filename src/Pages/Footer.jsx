

export default function Footer() {
    return (
        <div className=" container-fluid px-lg-4 mt-3 " style={{ backgroundColor: "#E9ECEF" }}>

            <div className="row px-lg-5  d-flex justify-content-between">
                <div className="col-lg-4 col-md-5 col-12 mt-3 mb-3 py-1 px-lg-3" style={{ fontSize: "20px", fontWeight: "600" }}>
                    <div className="p-1">
                        SNAPSHOP
                    </div>
                    <div className="px-1" style={{ fontSize: "16px", color: "#808080" }}>
                        Sarveshmunde10@gmail.com
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12 mt-3 px-lg-3 mb-3 ">
                    <div className="d-flex justify-content-md-end gap-3 px-2">
                        <div className="p-1">
                            <a href="https://www.linkedin.com/in/sarveshmunde/" >
                                <i className="fa-brands fa-linkedin text-decoration-none" style={{ fontSize: "35px", color: "black" }}></i>
                            </a>
                        </div>
                        <div className="p-1">
                            <a href="https://github.com/Sarvesh-Work"  >
                                <i className="fa-brands fa-square-github" style={{ fontSize: "35px", color: "black" }}></i>
                            </a>
                        </div>
                    </div>
                    <div className="px-1 text-md-end" style={{ fontSize: "16px", color: "#808080", fontWeight: "600" }}>
                        Created By: Sarvesh Munde
                    </div>
                </div>
            </div>
        </div>
    )
}
