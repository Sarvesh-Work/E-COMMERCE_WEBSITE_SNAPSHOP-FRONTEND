import { useDispatch, useSelector } from "react-redux";
import {
  selectAllProduct,
  selectTotalItems,
  fetchProductsByAsync,
} from "../../Product/productSlice";
import AdminProductCard from "./AdminProductCard";
import AdminProductFilter from "./AdminProductFilter";
import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../../app/constant";
import AdminProductPagination from "./AdminProductPagination";



const AdminProductList = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const products = useSelector(selectAllProduct);
  const totalItems = useSelector(selectTotalItems);
  const totalPage = Math.ceil(totalItems / ITEMS_PER_PAGE);
 

  const sortOptions = [
    { name: "Price: Low to High", sort: "discountPrice", order: "asc", current: false },
    {
      name: "Price: High to Low",
      sort: "discountPrice",
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
    // TODO : on server it will support multiple categories
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
    console.log({ newFilter });

    setFilter(newFilter);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchProductsByAsync({ filter, sort, pagination, admin: true }));
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  return (
    <div className=" container-lg container-fluid">
      <div className="row p-3 mt-1">
        <div
          className="col-12 text-center p-0 m-0"
          style={{ fontSize: "40px", lineHeight: "1.2", fontWeight: "700" }}
        >
          <div className="m-0 p-0">Total Products: {totalItems}</div>
          
        </div>
      </div>
      <div
        className="row p-1 py-2 mt-5 "
        style={{ borderBottom: "1px solid #CCCCCC" }}
        id="AllProducts-media"
      >
        <h1
          className="col-lg-4 col-sm-7 col-12 px-1"
          style={{ fontSize: "40px", fontWeight: "700" }}
        >
          All <span>product</span>
        </h1>
        <div
          className="dropdown mt-sm-0 mt-1 px-1 col-lg-1 col-xl-1  col-sm-4 col-12 ms-auto d-flex justify-content-sm-end gap-4 justify-content-between p-sm-0 p-1 align-items-center "
          style={{ fontSize: "25px", fontWeight: "550" }}
        >
          <div
            data-bs-toggle="dropdown"
            aria-expanded="false"
            className="all-btn text-center p-1 px-3  cursor d-inline"
          >
            Sort
          </div>

          <ul
            className="dropdown-menu p-1 "
            style={{
              backgroundColor: "#2F3940",
              borderRadius: "7px",
              zIndex: "1",
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

          <div
            id="all-btn"
            className="text-center p-1 px-3  cursor d-lg-none d-inline"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <i className="fa-solid fa-filter"></i>
          </div>
        </div>
      </div>

      <div className="row  d-flex justify-content-between">
        <div className="col-3 d-lg-inline d-none">
          <AdminProductFilter handleFilter={handleFilter} />
        </div>
        <div className="col-lg-9 col-12 px-lg-3">
          <AdminProductCard products={products} />
          <AdminProductPagination
            page={page}
            totalPage={totalPage}
            totalItems={totalItems}
            handlPage={handlPage}
            ITEMS_PER_PAGE={ITEMS_PER_PAGE}
          />
        </div>
      </div>

      {/* mobile and tablet filter */}

      <div
        className="offcanvas offcanvas-end d-lg-none"
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
          <AdminProductFilter handleFilter={handleFilter} />
        </div>
      </div>
    </div>
  );
};

export default AdminProductList;
