import axios from "axios";

// const baseUrl = "http://localhost:7000";
const baseUrl = "https://scholarhomess-api.onrender.com";
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": "true",
};

export const addToCart = async (productId, quantity, token) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/product/addToCart/${token}`,
      { productId, quantity },
      { headers },
      { withCredentials: true }
    );
    if (data) {
      const res = { status: 200, message: "Product added to cart!" };
      return res;
    }
  } catch (error) {
    const res = { status: 400, message: error?.response?.data?.error };
    return res;
  }
};

export const getUserCart = async (token) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/product/getUserCart/${token}`,
      { headers },
      { withCredentials: true }
    );
    if (data) {
      const res = { status: 200, cart: data };
      return res;
    }
  } catch (error) {
    const res = { status: 400, message: error?.response?.data?.error };
    return res;
  }
};

export const removeFromCart = async (index, token) => {
  try {
    const { data } = await axios.delete(
      `${baseUrl}/product/removeFromCart/${index}/${token}`,
      { headers },
      { withCredentials: true }
    );
    if (data) {
      const res = { status: 200, message: "Removed!" };
      return res;
    }
  } catch (error) {
    const res = { status: 400, message: error?.response?.data?.error };
    return res;
  }
};
export const clearUserCart = async (token) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/product/clearUserCart/${token}`,
      { headers },
      { withCredentials: true }
    );
    if (data) {
      const res = { status: 200, message: "cart Cleared!" };
      return res;
    }
  } catch (error) {
    const res = { status: 400, message: error?.response?.data?.error };
    return res;
  }
};
export const addVoucher = async (name, discount, token) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/product/addVoucher/${token}`,
      { name, discount },
      { headers },
      { withCredentials: true }
    );
    if (data) {
      const res = { status: 200, message: "Voucher added!" };
      return res;
    }
  } catch (error) {
    const res = { status: 400, error: error?.response?.data?.error };
    return res;
  }
};
export const checkVoucher = async (name, token) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/product/checkVoucher/${token}`,
      { name },
      { headers },
      { withCredentials: true }
    );
    if (data) {
      const res = { status: 200, discount: data.discount };
      return res;
    }
  } catch (error) {
    const res = { status: 400, error: error?.response?.data?.error };
    return res;
  }
};

//Order Actions

export const createOrder = async (products, totalPrice, address, token) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/product/createOrder/${token}`,
      { products, totalPrice, address },
      { headers },
      { withCredentials: true }
    );
    if (data) {
      const res = { status: 200, message: "Order placed successfully!" };
      return res;
    }
  } catch (error) {
    const res = { status: 400, error: error?.response?.data?.error };
    return res;
  }
};

export const getMyOrders = async (token) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/product/getMyOrders/${token}`,
      { headers },
      { withCredentials: true }
    );
    if (data) {
      const res = { status: 200, orders: data };
      return res;
    }
  } catch (error) {
    const res = { status: 400, error: error?.response?.data?.error };
    return res;
  }
};
export const updateOrder = async (productId, token) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/product/updateOrder/${token}`,
      { productId },
      { headers },
      { withCredentials: true }
    );
    if (data) {
      const res = { status: 200, message: "Order completed successfully!" };
      return res;
    }
  } catch (error) {
    const res = { status: 400, error: error?.response?.data?.error };
    return res;
  }
};

export const getMySales = async (token) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/product/getMySales/${token}`,
      { headers },
      { withCredentials: true }
    );
    if (data) {
      const res = { "status": 200, "sales": data };
      return res;
    }
  } catch (error) {
    const res = { "status": 400, "error": error?.response?.data?.error };
    return res;
  }
};

export const completeSale = async (saleId, token) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/product/completeSale/${token}`,
      { saleId },
      { headers },
      { withCredentials: true }
    );
    if (data) {
      const res = { "status": 200, "message": "Your Sale is Completed!" };
      return res;
    }
  } catch (error) {
    const res = { "status": 400, "error": error?.response?.data?.error };
    return res;
  }
};
