export const fetchAllProducts = async () => {
  try {
    const response = await fetch("http://localhost:3004/products");
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchAllProductsByFilter = async (filter,sort,pagination) => {
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
      queryString+=`${key}=${sort[key]}&`
    }

    for (let key in pagination) {
      queryString+=`${key}=${pagination[key]}&`
    }

    const response = await fetch(
      "http://localhost:3004/products?" + queryString
    );
    const data = await response.json();
    const totalItems=await response.headers.get("x-Total-Count")
    return ({ data:{products:data,totalItems:+totalItems}});
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};


export const fetchAllBrands = async () => {
  try {
    const response = await fetch("http://localhost:3004/Brands");
    const data= await response.json();
   
    return {data}
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};


export const fetchAllCategories = async () => {
  try {
    const response = await fetch(" http://localhost:3004/Categories");
    const data= await response.json();
    return {data}
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch("http://localhost:3004/products/"+id);
    const data= await response.json();
    console.log("new data",data)
    return {data}
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

