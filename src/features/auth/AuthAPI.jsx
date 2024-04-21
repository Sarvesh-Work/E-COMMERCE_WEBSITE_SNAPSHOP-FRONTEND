export const createUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
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

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: { "content-type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      resolve({  data });
    } else {
      const error = await response.json();
      reject( error );
      
    }
  } catch (error) {
    reject(error );
  }
  });
}

export const UpdateAddAddress = async (update) => {
  try {
    const response = await fetch("http://localhost:3004/User/" + update.id, {
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
