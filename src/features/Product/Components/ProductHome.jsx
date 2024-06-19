import { useDispatch, useSelector } from "react-redux";
import {
  selectAllProduct,
  selectProductListStatus,
  selectTotalItems,
  fetchProductsByAsync,

} from "../productSlice";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";
import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../../app/constant";
import ProductPagination from "./ProductPagination";
import Loading from "../../../Pages/loading";



const ProductHome = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);

  const products = useSelector(selectAllProduct);
  const totalItems = useSelector(selectTotalItems);
  const status = useSelector(selectProductListStatus);

  const sortOptions = [

    { name: "Price: Low to High", sort: "price", order: "asc", current: false },
    {
      name: "Price: High to Low",
      sort: "price",
      order: "desc",
      current: false,
    },
  ];

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  };

  const handlPage = (page) => {
    setPage(page);
  };

  const handleFilter = (e, section, option) => {
    console.log(e.target.checked);
    const newFilter = { ...filter };

    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }

    setFilter(newFilter);


  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchProductsByAsync({ filter, sort, pagination }));
  }, [filter, sort, page, dispatch])


  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);


  return (
    <>
     
        <div className=" container-lg container-fluid px-md-4">

          <div
            className="row p-1 py-2 mt-5 "
            // style={{ borderBottom: "1px solid #CCCCCC" }}
            id="AllProducts-media"
          >
            <h1
              className="col-lg-4 col-sm-7 col-12 px-2"
              style={{ fontSize: "20px", fontWeight: "700" }}
            >
              All Product For You!
            </h1>
            <div
              className="dropdown mt-sm-0 mt-1  col-lg-1 col-xl-2  col-sm-4 col-12 ms-auto d-flex justify-content-sm-end gap-4 justify-content-between p-sm-0 p-1 align-items-center "
              style={{ fontSize: "25px", fontWeight: "550" }}
            >
              <div
                className="all-btn text-center  px-3  cursor"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                <i className="fa-solid fa-filter"></i>
              </div>

              <div
              
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className="all-btn text-center mx-3 px-3  cursor d-inline"
              >
                Sort
              </div>

              <ul
                className="dropdown-menu p-1 "
                style={{
                  backgroundColor: "#2F3940",
                  borderRadius: "7px",

                }}
              >
                {sortOptions.map((option) => (
                  <li className=" cursor" key={option.name}>
                    <p
                      className="drop dropdown-item  mb-0 "
                      onClick={(e) => handleSort(e, option)}
                    >
                      {option.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="row  d-flex justify-content-between">
            <div className=" col-12 px-lg-2">
              {status == "loading" ? (
                <Loading />
              ) : (
                <>
                  <ProductCard products={products} />

                  <ProductPagination
                    page={page}
                    setPage={setPage}
                    totalItems={totalItems}
                    handlPage={handlPage}
                    
                  />
                </>
              )}
            </div>
          </div>

          {/* mobile and tablet filter */}

          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <div className="offcanvas-header ">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ProductFilter handleFilter={handleFilter} />
            </div>
          </div>
        </div>
    </>
  );
};

export default ProductHome;
