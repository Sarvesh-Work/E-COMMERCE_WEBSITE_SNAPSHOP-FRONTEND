import Navbar from "./Navbar";
import ProductList from "../features/Product/Components/ProductHome";
import Footer from "./Footer";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



const Home = () => {
  const features = [
    { name: "Free Shipping", detail: "shipping for order above $200 ", icon: <i className='bi bi-truck'></i> },
    { name: "Money Guarantee", detail: "Within 30 days for an exchange", icon: <i className="bi bi-coin"></i> },
    { name: "Online Support", detail: "24 hours a day, 7 days a weak", icon: <i className="bi bi-headset"></i> },
    { name: "Flexible Payment", detail: "Pay with multiple credit card", icon: <i className="bi bi-credit-card"></i> },
  ]

  return (
    <>
      <Navbar />
      <div className="container-lg container-fluid">
        <div className="row px-md-2">
          <div className="col-12 mt-3 px-md-3">
            <>
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}

                modules={[Autoplay, Pagination]}
                className="mySwiper rounded-2"
              >
                <SwiperSlide >
                  <div id="banner1" className="d-flex p-2 d-md-flex d-none align-items-center ">
                    <div className="mx-5 text-center" style={{ fontSize: "60px", fontWeight: "600", lineHeight: "64px" }}>
                      BEST <span style={{ color: "#0066B2" }}>LAPTOP</span><br /> COLLECTIONS
                    </div>
                  </div>
                  <div id="bannerMobile1" className="d-flex p-2 d-flex d-md-none justify-content-center overflow-hidden">
                    <div className="mx-2" style={{ fontSize: "40px", fontWeight: "600", lineHeight: "45px", color: "#0066B2" }}>
                      BEST <span style={{ color: "black" }}>LAPTOP</span><br /> COLLECTIONS
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide >
                  <div id="banner2" className="d-flex p-2 d-md-flex d-none justify-content-end overflow-hidden">
                    <div className="mx-4 mt-3 text-center" style={{ fontSize: "60px", fontWeight: "600", lineHeight: "64px" }}>
                      EXCLUSIVE <br /> MOBILE <br /><span style={{ color: "#0066B2" }}>BRANDS</span>
                    </div>
                  </div>
                  <div id="bannerMobile2" className="d-flex p-2 d-flex d-md-none  overflow-hidden justify-content-end">
                    <div className="mx-2 text-end py-5" style={{ fontSize: "40px", fontWeight: "600", lineHeight: "45px", color: "white" }}>
                      EXCLUSIVE <br /> MOBILE <br /><span style={{ color: "#0066B2" }}>BRANDS</span>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </>
          </div>


        </div>
        <div className="row mt-5  rounded-3 p-md-3   justify-content-center"  >
          {
            features.map((data, index) => (
              <div className="col-md-3 col-sm-5   col-6 mt-lg-0  mt-3" key={index} >
                <div className="p-1 py-3 rounded-3" style={{ backgroundColor: "#F1F3F8" }}  >
                  <div className="p-0 text-center fs-2"   >
                    {data.icon}
                  </div>
                  <div className="text-center fs-md-4 fs-6 fw-bold">
                    {data.name}
                  </div>
                  <div className="text-center">{data.detail}</div>
                </div>
              </div >
            ))
          }

        </div>
      </div>
      <ProductList />
      <div style={{ marginTop: "60px" }}>
        <Footer />
      </div>
    </>
  );
};

export default Home;
