export const createUser = async (userData) => {
  try {
    const response = await fetch("https://localhost:8080/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.jsxon();
    return { data };
  } catch (error) {
    console.error("Error in adding user", error);
    throw error;
  }
};

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });

      if (response.ok) {
        const data = await response.jsxon();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

// export const UpdateAddAddress = async (update) => {
//   try {
//     const response = await fetch("http://localhost:3004/User/" + update.id, {
//       method: "PATCH",
//       body: JSON.stringify(update),
//       headers: { "content-type": "application/json" },
//     });
//     const data = await response.jsxon();
//     return { data };
//   } catch (error) {
//     console.error("Error in adding user", error);
//     throw error;
//   }
// };

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://localhost:8080/auth/check");

      if (response.ok) {
        const data = await response.jsxon();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      console.error("Error in checking user", error);
      throw error;
    }
  });
}

export function signOut() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/logout");
      if (response.ok) {
        resolve({ data: "success" });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "https://localhost:8080/auth/reset-password-request",
        {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: { "content-type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.jsxon();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      console.error("Error in checking user", error);
      throw error;
    }
  });
}

export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "https://localhost:8080/auth/reset-password",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "content-type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.jsxon();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      console.error("Error in checking user", error);
      throw error;
    }
  });
}
