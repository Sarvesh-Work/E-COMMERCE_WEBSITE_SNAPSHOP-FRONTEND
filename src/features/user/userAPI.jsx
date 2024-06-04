export const fetchOrders = async () => {
  try {
    const response = await fetch("http://localhost:8080/order/user");
    const data= await response.json();
    console.log(data)
    return ({data})
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};


export const fetchLogInUser  = async () => {
  try {
    const response = await fetch("http://localhost:8080/user/info");
    const data= await response.json();
    return {data}
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};


// export const fetchLogInUser  = async (userId) => {
//   try {
//     const response = await fetch("http://localhost:3004/User/"+userId);
//     const data= await response.json();
//     return {data}
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     throw error;
//   }
// };

export const updateUser = async (userData) => {
  console.log(userData)
  try {
    const response = await fetch("http://localhost:8080/user/update", {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error in adding user", error);
    throw error;
  }
};

export function deleteUserInfo() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/user/delete");
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
}