export const AddOrders = async (order) => {
  try {
    const response = await fetch("https://snapshop-backend.vercel.app/order/", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.jsxon();
    return { data };
  } catch (error) {
    console.error("Error in adding user", error);
    throw error;
  }
};

export const UpdateOrder = async (order) => {
  try {
    const response = await fetch(
      "https://snapshop-backend.vercel.app/order/UpdateOrder/" + order.id,
      {
        method: "PATCH",
        body: JSON.stringify(order),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.jsxon();
    return { data };
  } catch (error) {
    console.error("Error in adding user", error);
    throw error;
  }
};

export const fetchAllOrder = async (pagination) => {
  try {
    let queryString = "";

    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`;
    }

    const response = await fetch("https://snapshop-backend.vercel.app/order/?" + queryString);
    const data = await response.jsxon();
    const totalOrder = await response.headers.get("x-Total-Count");
    return { data: { order: data, totalOrder: +totalOrder } };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
