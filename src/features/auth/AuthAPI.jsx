// export const createUser = async (userData) => {
//   try {
//     // const response = await fetch("http://localhost:8080/auth/signup", {
//    const response = await fetch("http://localhost:3004/User", {
//       method: "POST",
//       body: JSON.stringify(userData),
//       headers: { "content-type": "application/json" },
//     });
//     const data = await response.json();
//     return { data };
//   } catch (error) {
//     console.error("Error in adding user", error);
//     throw error;
//   }
// };

// export function checkUser(loginInfo) {
//   return new Promise(async (resolve, reject) => {
//   try {
//     // const response = await fetch("http://localhost:8080/auth/login", {
//     const response = await fetch("http://localhost:8080/User/"+loginInfo.id, {
//       method: "POST",
//       body: JSON.stringify(loginInfo),
//       headers: { "content-type": "application/json" },
//     });

//     if (response.ok) {
//       const data = await response.json();
//       resolve({  data });
//     } else {
//       const error = await response.json();
//       reject( error );
      
//     }
//   } catch (error) {
//     reject(error );
//   }
//   });
// }

export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:3004/users', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch('http://localhost:3004/User?email=' + email);
    const data = await response.json();
    console.log({data})
    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: 'wrong credentials' });
      }
    } else {
      reject({ message: 'user not found' });
    }
    // TODO: on server it will only return some info of user (not password)
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
