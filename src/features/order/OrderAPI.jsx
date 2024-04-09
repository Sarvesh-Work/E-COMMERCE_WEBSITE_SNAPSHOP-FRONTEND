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