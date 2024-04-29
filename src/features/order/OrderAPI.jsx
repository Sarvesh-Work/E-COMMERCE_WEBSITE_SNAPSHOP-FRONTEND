export const AddOrders = async (order) => {
  try {
    const response = await fetch("http://localhost:3004/Orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error in adding user", error);
    throw error;
  }
};


export const UpdateOrder = async (order) => {
  try {
    const response = await fetch("http://localhost:3004/Orders/"+order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error in adding user", error);
    throw error;
  }
};

export const fetchAllOrder = async ( pagination) => {
  try {
    let queryString = "";

    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`;
    }

    const response = await fetch(
      "http://localhost:8080/products?" + queryString
      // "http://localhost:3004/Orders?" + queryString
    );
    const data = await response.json();
    console.log({ data });
    const totalOrder = await response.headers.get("x-Total-Count");
    return { data: { order: data, totalOrder: +totalOrder } };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
