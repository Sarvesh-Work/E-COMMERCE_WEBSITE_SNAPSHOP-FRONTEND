
export const AddItemsToCart = async (items) => {
  try {
    const response = await fetch("https://snapshop-backend.vercel.app/cart/add", {
      method: "POST",
      body: JSON.stringify(items),
      headers: { "content-type": "application/json" },
    });
    const data = await response.jsxon();
    return { data };
  } catch (error) {
    console.error("Error in adding user", error);
    throw error;
  }
};


export const FetchCartsAllProducts = async () => {
  try {
    const response = await fetch("https://snapshop-backend.vercel.app/Cart/allProducts");
    const data = await response.jsxon();
    return { data };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};


export const UpdateItem = async (update) => {
  try {
    const response = await fetch(
      "https://snapshop-backend.vercel.app/cart/updateInCart/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
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

export const DeleteItem = async (itemId) => {
  try {
    const response = await fetch(
      "https://snapshop-backend.vercel.app/cart/deleteFromCart/" + itemId,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );

    return { data: { id: itemId } };
  } catch (error) {
    console.error("Error in adding user", error);
    throw error;
  }
};


export const ResetCart = async () => {
  try {
    const response = await FetchCartsAllProducts();
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

export const signOutCart= async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/user/cart/signOut");
      if (response.ok) {
        resolve({ data: "success" });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
