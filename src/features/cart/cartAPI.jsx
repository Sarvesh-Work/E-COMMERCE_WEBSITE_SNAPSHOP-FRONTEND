// API for adding Items or Products to cart!
export const AddItemsToCart = async (items) => {
  try {
    const response = await fetch("http://localhost:8080/cart/", {
      method: "POST",
      body: JSON.stringify(items),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error in adding user", error);
    throw error;
  }
};
// API for adding Items or Products to cart!

// Api for fetching  the cart items using user Id

export const FetchAllProductsByUserId = async (userId) => {
  try {
    const response = await fetch("http://localhost:8080/Cart/?user=" + userId);
    const data = await response.json();
    console.log({ data });
    return { data };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Api for fetching  the cart items using user Id

// Api for updating product in cart
export const UpdateItem = async (update) => {
  try {
    const response = await fetch("http://localhost:8080/cart/updateInCart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error in adding user", error);
    throw error;
  }
};
// Api for updating product in  cart

// Api for deleting the product from cart
export const DeleteItem = async (itemId) => {
  try {
    const response = await fetch("http://localhost:8080/cart/deleteFromCart/" + itemId, {
      method: "DELETE",
      
      headers: { "content-type": "application/json" },
    });

    return { data: { id: itemId } };
  } catch (error) {
    console.error("Error in adding user", error);
    throw error;
  }
};
// Api for deleting the product from cart

export const ResetCart = async (userId) => {
  try {
    const response = await FetchAllProductsByUserId(userId);
    const items = response.data;
    for (let item of items) {
      await DeleteItem(item.id);
    }
    return { status: "success" };
  } catch (error) {
    console.error("Error in adding user", error);
    throw error;
  }
};
