import axios from "axios";

// const baseUrl = "http://localhost:7000";
const baseUrl = "https://scholarhomess-api.onrender.com";
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": "true",
};

export const registerUser = async (email, type, password) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/auth/register`,
      { email, type, password },
      { headers },
      { withCredentials: true }
      );
      if (data) {
          const user = JSON.stringify(data.otherDetails)
          window.localStorage.setItem("jwt", data.token);
          window.localStorage.setItem("user", user);
          window.localStorage.setItem("isAuthenticated", "true");
          const res = {"status": 200, "message": "Account created Successfully!"};
          return res;
        }
  } catch (error) {
      const res = {"status": 400, "message": error.response.data.error};
    return res;
  }
};

export const loginUser = async (email, password) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/auth/login`,
      { email, password },
      { headers },
      { withCredentials: true }
    );
    if (data) {
      const user = JSON.stringify(data.otherDetails)
      window.localStorage.setItem("jwt", data.token);
      window.localStorage.setItem("user", user);
      window.localStorage.setItem("isAuthenticated", "true");
      const res = { "status": 200, "message": "Logged in Successfully!" };
      return res;
    }
  } catch (error) {
    const res = { "status": 400, "message": error.response.data.error };
    return res;
  }
};

export const updateUser = async (name, email, studentId, token) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/auth/updateUser/${token}`,
      { name, email, studentId },
      { headers },
      { withCredentials: true }
    );
    if (data) {
      const user = JSON.stringify(data)
      window.localStorage.removeItem("user");
      window.localStorage.setItem("user", user);
      const res = { "status": 200, "message": "Profile updated successfully!" };
      return res;
    }
  } catch (error) {
    const res = { "status": 400, "message": error.response.data.error };
    return res;
  }
};
  
export const giveAdmin = async () => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/auth/giveAdmin/`,
      { headers },
      { withCredentials: true }
    );
    if (data) {
      const res = { "status": 200, "message": data.message };
      return res;
    }
  } catch (error) {
    const res = { "status": 400, "message": error.response.data.error };
    return res;
  }
};
