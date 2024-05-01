export const createProducts = async (product) => {
  try {
    const response = await fetch("http://localhost:8080/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchAllProductsByFilter = async (filter, sort, pagination,admin) => {
  try {
    let queryString = "";
    for (let key in filter) {
      const categoryValues = filter[key];
      if (categoryValues.length) {
        const lastCategoryValue = categoryValues[categoryValues.length - 1];
        queryString += `${key}=${lastCategoryValue}&`;
      }
    }

    for (let key in sort) {
      queryString += `${key}=${sort[key]}&`;
    }

    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`;
    }
    if(admin){
      queryString += `admin=true`;
    } 

    const response = await fetch(
      "http://localhost:8080/products?" + queryString
     
    );
    const data = await response.json();
    console.log({ data });
    const totalItems = await response.headers.get("x-Total-Count");
    return { data: { products: data, totalItems: +totalItems } };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchAllBrands = async () => {
  try {
    const response = await fetch("http://localhost:8080/Brands");
    const data = await response.json();

    return { data };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchAllCategories = async () => {
  try {
    const response = await fetch(" http://localhost:8080/Categories");
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch("http://localhost:8080/products/" + id);
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const updateProduct = async (product) => {
  try {
    const response = await fetch(
      "http://localhost:8080/products/" + product.id,
      {
        method: "PATCH",
        body: JSON.stringify(product),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error in adding user", error);
    throw error;
  }
};
