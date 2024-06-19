import { useDispatch, useSelector } from "react-redux";
import {
  selectBrands,
  selectCategories,
  selectProductById,
  createProductsAsync,
  fetchProductByIdAsync,
  updateProductsAsync,
} from "../../Product/productSlice.js";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Bounce, toast } from "react-toastify";


export default function ProductForm() {
  const brand = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const selectProduct = useSelector(selectProductById);
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, reset } = useForm();
  const params = useParams();

  const Success = (name, message) =>
    toast.success(name + " " + message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  const colors = [
    {
      name: 'White',
      class: 'bg-white',
      selectedClass: 'ring-gray-400',
      id: 'white',
    },
    {
      name: 'Gray',
      class: 'bg-gray-200',
      selectedClass: 'ring-gray-400',
      id: 'gray',
    },
    {
      name: 'Black',
      class: 'bg-gray-900',
      selectedClass: 'ring-gray-900',
      id: 'black',
    },
  ];

  const handelDelete = () => {
    const product = { ...selectProduct };
    product.deleted = true;
    dispatch(updateProductsAsync(product));
    Success(product.title, "Product Removed Successfully");
  };

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    }
  }, [params.id]);

  useEffect(() => {
    if (selectProduct && params.id) {
      setValue("title", selectProduct.title);
      setValue("description", selectProduct.description);
      setValue("price", selectProduct.discountPrice);
      setValue("discountPercentage", selectProduct.discountPercentage);
      setValue("category", selectProduct.category);
      setValue("brand", selectProduct.brand);
      setValue("thumbnail", selectProduct.thumbnail);
      setValue("stock", selectProduct.stock);
      setValue("image1", selectProduct.images[0]);
      setValue("image2", selectProduct.images[1]);
      setValue("image3", selectProduct.images[2]);
      setValue("highlight1", selectProduct.highlights[0]);
      setValue("highlight2", selectProduct.highlights[1]);
      setValue("highlight3", selectProduct.highlights[2]);
      setValue("color", selectProduct.color);
    }
  }, [selectProduct, setValue]);

  return (
    <>
      <div className="container-lg container-fluid px-3  mt-3 ">
        <div className="row d-flex flex-column justify-content-center align-items-center">
          <h4 className="col-lg-8 col-12 mb-3">Add Product</h4>
        </div>
        <div className="row d-flex flex-column justify-content-center align-items-center ">
          <div
            className="col-lg-8 col-12 mb-3"
            style={{ border: "1px solid #ccc", borderRadius: "7px" }}
          >
            <form
              className="mt-2 "
              noValidate
              onSubmit={handleSubmit((data) => {
                const product = { ...data };

                product.images = [
                  product.image1,
                  product.image2,
                  product.image3,
                ];
                delete product["image1"];
                delete product["image2"];
                delete product["image3"];
                product.highlights = [
                  product.highlight1,
                  product.highlight2,
                  product.highlight3
                ]
                delete product["highlight1"];
                delete product["highlight2"];
                delete product["highlight3"];

                product.price = +product.price;
                product.stock = +product.stock;
                product.discountPercentage = +product.discountPercentage;
                product.rating = 0;
                
                 
                if (params.id) {
                  product.id = params.id;
                  dispatch(updateProductsAsync(product));
                  Success(product.title, "Updated successfully")
                } else {
                  dispatch(createProductsAsync(product));
                  Success(product.title, "new product added successfully")
                  reset;
                }
              })}
            >
              <div style={{ borderBottom: "1px solid  #B6B6B4" }}>
                <div className="mb-3 d-flex gap-4">
                  <div className="w-75 mx-auto">
                    <label htmlFor="ProductName" className="form-label">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="form-control shadow-none"
                      id="title"
                      style={{ border: "1px solid #C0C0C0" }}
                      {...register("title", {
                        required: "title is required",
                      })}
                    />
                  </div>
                </div>
                <div className="mb-3 w-75 mx-auto">
                  <label htmlFor="Description" className="form-label">
                    Description
                  </label>
                  <div className="w-100 p-0">
                    <textarea
                      style={{ border: "1px solid #C0C0C0" }}
                      className="form-control shadow-none w-100"
                      placeholder="Description about product"
                      id="description"
                      {...register("description", {
                        required: "Description is required",
                      })}
                    ></textarea>
                  </div>
                </div>
                <div className="w-75 mx-auto">
                  <label htmlFor="Thumbnail" className="form-label">
                    Thumbnail
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-none"
                    id="thumbnail"
                    style={{ border: "1px solid #C0C0C0" }}
                    {...register("thumbnail", {
                      required: "thumbnail is required",
                    })}
                  />
                </div>

                <div className="mb-3 d-flex gap-3 w-75 mx-auto mt-3">
                  <div>
                    <label htmlFor="Price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control shadow-none "
                      id="Price"
                      style={{ border: "1px solid #C0C0C0" }}
                      {...register("price", {
                        required: "Price is required",
                        min: 1,
                      })}
                    />
                  </div>
                  <div>
                    <label htmlFor=" Discount" className="form-label">
                      Discount
                    </label>
                    <input
                      type="number"
                      className="form-control shadow-none "
                      id="Discount"

                      style={{ border: "1px solid #C0C0C0" }}
                      {...register("discountPercentage", {
                        required: "Discount is required",
                        min: 1,
                        max: 90,
                      })}
                    />
                  </div>
                  <div>
                    <label htmlFor="Stock" className="form-label">
                      Stock
                    </label>
                    <input
                      type="number"
                      className="form-control shadow-none "
                      id="Stock"
                      style={{ border: "1px solid #C0C0C0" }}
                      {...register("stock", {
                        required: "Stock is required",
                        min: 0,
                      })}
                    />
                  </div>
                </div>

                <div className="mb-3 d-flex gap-3 w-75 mx-auto mt-3">
                  <div className="w-50">
                    <label htmlFor="Brand" className="form-label">
                      Brand
                    </label>
                    <div className="">
                      <select
                        className="form-select"
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "7px",
                          boxShadow: "none",
                        }}
                        {...register("brand", {
                          required: "Brand is required",
                        })}
                      >
                        <option value="">--Chose Brand--</option>
                        {brand.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-50">
                    <label htmlFor="Categories" className="form-label">
                      Categories
                    </label>
                    <div className="">
                      <select
                        className="form-select"
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "7px",
                          boxShadow: "none",
                        }}
                        {...register("category", {
                          required: "Category is required",
                        })}
                      >
                        <option value="">--Chose Categories--</option>
                        {categories.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-50">
                    <label htmlFor="Brand" className="form-label">
                      Color
                    </label>
                    <div className="">


                      {colors.map((option, index) => (
                        <>
                          {option.name}
                          < input type="checkbox" key={index} value={option.name}
                            {...register("color", {

                              min: 0,
                            })}
                          />
                        </>

                      ))}

                    </div>
                  </div>
                </div>
                <div className="mb-3 w-75 mx-auto">
                  <label htmlFor="address" className="form-label">
                    Image1
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-none "
                    id="image1"
                    style={{ border: "1px solid #C0C0C0" }}
                    aria-describedby="emailHelp"
                    {...register("image1", {
                      required: "Image1 is required",
                    })}
                  />
                </div>
                <div className="mb-3 w-75 mx-auto">
                  <label htmlFor="address" className="form-label">
                    Image2
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-none "
                    id="image2"
                    style={{ border: "1px solid #C0C0C0" }}
                    {...register("image2", {})}
                  />
                </div>
                <div className="mb-3 w-75 mx-auto">
                  <label htmlFor="address" className="form-label">
                    Image3
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-none "
                    id="image3"
                    style={{ border: "1px solid #C0C0C0" }}
                    {...register("image3", {})}
                  />
                </div>

                <div className="mb-3 w-75 mx-auto">
                  <label htmlFor="address" className="form-label">
                    highlight1
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-none "
                    id="highlight1"
                    style={{ border: "1px solid #C0C0C0" }}
                    {...register("highlight1", {})}
                  />
                </div>
                <div className="mb-3 w-75 mx-auto">
                  <label htmlFor="address" className="form-label">
                    highlight2
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-none "
                    id="highlight2"
                    style={{ border: "1px solid #C0C0C0" }}
                    {...register("highlight2", {})}
                  />
                </div>
                <div className="mb-3 w-75 mx-auto">
                  <label htmlFor="address" className="form-label">
                    highlight3
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-none "
                    id="highlight3"
                    style={{ border: "1px solid #C0C0C0" }}
                    {...register("highlight3", {})}
                  />
                </div>
              </div>
              <div className=" mt-2 d-flex justify-content-end gap-3 mb-3">
                <button
                  type="submit"
                  className="all-btn  px-3  cursor"
                  
                >
                  Save
                </button>
                {params.id && (
                  <button
                    type="submit"
                    className="all-btn   px-3  cursor"
                   
                    style={{ backgroundColor: "red" }}
                    onClick={() => handelDelete()}
                  >
                    Delete Product
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
