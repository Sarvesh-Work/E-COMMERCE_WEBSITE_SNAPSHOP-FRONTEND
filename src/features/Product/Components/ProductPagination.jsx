import { PropTypes } from "prop-types";
import { ITEMS_PER_PAGE } from "../../../app/constant";

const ProductPagination = ({
  page,
  handlPage,
  totalItems,
}) => {

  const totalPage = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <div className="w-100  d-sm-flex justify-content-sm-between mt-3 ">
      <div className="w-100 ">
        <nav aria-label="...">
          <ul className="pagination mt-2 d-flex justify-content-between">
            <li className="page-item ">
              <div
                className={`all-btn page-link cursor py-1 px-2  ${
                  page - 1 < 1 ? "disabled" : ""
                }`}
                onClick={() => handlPage(page - 1 < 1 ? page : page - 1)}
              >
                Previous
              </div>
            </li>

            <li className="mt-2 d-md-flex d-none">
              Showing
              <span className="mx-1">{(page - 1) * ITEMS_PER_PAGE + 1}</span>to
              <span className="mx-1">
                {page * ITEMS_PER_PAGE > totalItems
                  ? totalItems
                  : page * ITEMS_PER_PAGE}
              </span>
              of
              <span className="mx-1">{totalItems}</span>result
            </li>

            <li className="page-item ">
              <div
                className={`page-link all-btn cursor py-1 px-2   ${
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
