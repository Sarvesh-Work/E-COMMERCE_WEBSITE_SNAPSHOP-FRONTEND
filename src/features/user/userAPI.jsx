export const fetchOrdersByUserId = async (userId) => {
  try {
    const response = await fetch("http://localhost:3004/Orders/?user.id="+userId);
    const data= await response.json();
    return {data}
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};


export const fetchLogInUser  = async (userId) => {
  try {
    const response = await fetch("http://localhost:8080/users/"+userId);
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
    const response = await fetch("http://localhost:8080/users/" + userData._id, {
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