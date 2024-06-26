import { Disclosure } from "@headlessui/react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBrands,
  selectCategories,
  fetchBrandsByAsync,
  fetchCategoriesByAsync,
} from "../productSlice.jsx";
import { useEffect } from "react";

const ProductFilter = ({ handleFilter }) => {
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const dispatch = useDispatch();

  const filters = [
    {
      id: "category",
      name: "CATEGORY",
      options: categories,
    },
    {
      id: "brand",
      name: "BRAND",
      options: brands,
    },
  ];

  useEffect(() => {
    dispatch(fetchBrandsByAsync());
    dispatch(fetchCategoriesByAsync());
  }, []);

  return (
    <>
      <div className="row  py-1" style={{ borderRight: "1px solid #cccc" }}>
        <h4 className="p-1" style={{ borderBottom: "1px solid #D9DDE0" }}>
          FILTER
        </h4>

        <div className="">
          {filters.map((section) => (
            <Disclosure
              as="div"
              key={section.id}
              className="mt-2 p-0"
              style={{ borderBottom: "1px solid  #CCCCCC" }}
            >
              {({ open="false" }) => (
                <>
                  <h3
                    className=""
                  // style={{ borderBottom: "1px solid  #D9DDE0" }}
                  >
                    <Disclosure.Button
                      className="d-flex bg-white border-0  justify-content-between w-100 align-items-center"
                      style={{ fontSize: "22px", fontWeight: "500" }}
                    >
                      <span>{section.name}</span>
                      <span className="p-1">
                        {open ? (
                          <i className="fa-solid fa-minus"></i>
                        ) : (
                          <i className="fa-solid fa-plus"></i>
                        )}
                      </span>
                    </Disclosure.Button>
                  </h3>
                  <Disclosure.Panel className="pt-6">
                    <div className="py-2 px-3  mx-2 mb-3">
                      {section.options.map((option, optionIdx) => {

                        return (
                          <>

                            <div
                              key={option.value}
                              className="d-flex gap-2 mt-0"
                              style={{ fontSize: "17px", fontWeight: "500" }}
                            >
                              <input
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                defaultChecked={option.checked}
                                onClick={(e) =>
                                  handleFilter(e, section, option)
                                }
                                className="form-check-input border-1 border-secondary cursor"
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className=""
                              >
                                {option.label}
                              </label>
                            </div>

                          </>
                        );
                      })}

                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductFilter;

ProductFilter.propTypes = {
  handleFilter: PropTypes.func,
};
