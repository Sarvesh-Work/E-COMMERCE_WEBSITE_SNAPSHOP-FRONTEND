import { PropTypes } from "prop-types";

const ProductPagination = ({
  page,
  ITEMS_PER_PAGE,
  totalItems,
  handlPage,
  totalPage,
}) => {

  
  return (
    <div
      className="w-100  d-sm-flex justify-content-sm-between mt-3 "
      style={{ borderTop: "1px solid #B6B6B4" }}
    >
      <div className="mt-2">
        Showing
        <span className="mx-1">{(page - 1) * ITEMS_PER_PAGE + 1}</span>to
        <span className="mx-1">
          {page * ITEMS_PER_PAGE > totalItems
            ? totalItems
            : page * ITEMS_PER_PAGE}
        </span>
        of
        <span className="mx-1">{totalItems}</span>result
      </div>

      <div className=" d-md-inline d-none">
        <nav aria-label="Page navigation example " className=" ms-auto">
          <ul className="pagination mt-2 t">
            <li className="page-item">
              <div
                className={`page-link text-black cursor ${
                  page - 1 < 1 ? "disabled" : ""
                }`}
                aria-label="Previous"
                onClick={() => handlPage(page - 1 < 1 ? page : page - 1)}
              >
                <span aria-hidden="true">&laquo;</span>
              </div>
            </li>

            {Array.from({
              length: totalPage,
            }).map((e, index) => (
              <li className="page-item" key={index}>
                <div
                  className={`page-link roundex-1 cursor ${
                    index + 1 === page
                      ? "text-white bg-primary"
                      : "text-black bg-white"
                  }`}
                  onClick={() => handlPage(index + 1)}
                >
                  {index + 1}
                </div>
              </li>
            ))}

            <li className="page-item">
              <div
                className={`page-link text-black cursor ${
                  page + 1 > totalPage ? "disabled" : ""
                }`}
                aria-label="Next"
                onClick={() =>
                    handlPage(page + 1 > totalPage ? page : page + 1)
                  }
              >
                <span aria-hidden="true">&raquo;</span>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      <div className="w-100 d-md-none d-block px-3">
        <nav aria-label="...">
          <ul className="pagination mt-2 d-flex justify-content-between">
            <li className="page-item rounded-1">
              <div
                className={`page-link text-black cursor rounder-1 ${
                  page - 1 < 1 ? "disabled" : ""
                }`}
                onClick={() => handlPage(page - 1 < 1 ? page : page - 1)}
              >
                Previous
              </div>
            </li>

            <li className="page-item  rounded-1">
              <div
                className={`page-link text-black cursor rounded ${
                  page + 1 > totalPage ? "disabled" : ""
                }`}
                onClick={() =>
                  handlPage(page + 1 > totalPage ? page : page + 1)
                }
              >
                Next
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProductPagination;

ProductPagination.propTypes = {
  page: PropTypes.number,
  ITEMS_PER_PAGE: PropTypes.number,
  totalItems: PropTypes.number,
  handlPage: PropTypes.func,
  totalPage: PropTypes.number,
};
