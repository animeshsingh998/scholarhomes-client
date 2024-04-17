import axios from "axios";

// const baseUrl = "http://localhost:7000";
const baseUrl = "https://scholarhomess-api.onrender.com";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": "true",
};

export const addProduct = async (name, description, category, price, phone, address, sharePhoto, token) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/product/create/${token}`,
      { name, description, category, price, phone, address, image: sharePhoto },
      { headers },
      { withCredentials: true }
    );
    if (data) {
      const res = { status: 200, message: "Product added Successfully!" };
      return res;
    }
  } catch (error) {
    const res = { status: 400, message: error.response.data.error };
    return res;
  }
};

export const addFurniture = async (
  name,
  description,
  phone,
  price,
  sharePhoto,
  token
) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/product/createFurniture/${token}`,
      { name, description, price, phone, image: sharePhoto },
      { headers },
      { withCredentials: true }
    );
    if (data) {
      const res = { status: 200, message: "Furniture added Successfully!" };
      return res;
    }
  } catch (error) {
    const res = { status: 400, message: error.response.data.error };
    return res;
  }
};

export const getMyProducts = async (token) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/product/getMyProducts/${token}`,
      { headers },
      { withCredentials: true }
    );
      if (data) {
      const res = { "status": 200, "products": data };
      return res;
    }
  } catch (error) {
    const res = { "status": 400, "message": error?.response?.data?.error };
    return res;
  }
};

export const getAllProducts = async (token) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/product/allProducts/${token}`,
      { headers },
      { withCredentials: true }
    );
    if (data) {
      const res = { "status": 200, "products": data };
      return res;
    }
  } catch (error) {
    const res = { "status": 400, "message": error?.response?.data?.error };
    return res;
  }
};

export const getAllFurnitures = async (token) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/product/allFurnitures/${token}`,
      { headers },
      { withCredentials: true }
    );
    if (data) {
      const res = { "status": 200, "products": data };
      return res;
    }
  } catch (error) {
    const res = { "status": 400, "message": error?.response?.data?.error };
    return res;
  }
};

export const getAllSaved = async (token) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/product/getAllSaved/${token}`,
      { headers },
      { withCredentials: true }
    );
    if (data) {
      const res = { "status": 200, data };
      return res;
    }
  } catch (error) {
    const res = { "status": 400, "message": error?.response?.data?.error };
    return res;
  }
};

export const normalSearch = async (searchQuery, token) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/product/normalSearch/${token}`,
      { query: searchQuery },
      { headers },
      { withCredentials: true }
    );
    if (data) {
      // console.log(data.result)
      const res = { "status": 200, "result": data.result };
      return res;
    }
  } catch (error) {
    const res = { "status": 400, "message": error?.response?.data?.error };
    return res;
  }
};

export const normalSearchFur = async (searchQuery, token) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/product/normalSearchFur/${token}`,
      { query: searchQuery },
      { headers },
      { withCredentials: true }
    );
    if (data) {
      // console.log(data.result)
      const res = { "status": 200, "result": data.result };
      return res;
    }
  } catch (error) {
    const res = { "status": 400, "message": error?.response?.data?.error };
    return res;
  }
};

export const getProductById = async (id) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/product/productById/${id}`,
      { headers },
      { withCredentials: true }
    );
    if (data) {
      const res = { "status": 200, "product": data };
      return res;
    }
  } catch (error) {
    const res = { "status": 400, "message": error?.response?.data?.error };
    return res;
  }
};


export const deleteProduct = async (id, token) => {
  try {
    const { data } = await axios.delete(
      `${baseUrl}/product/${id}/delete/${token}`,
      { headers },
      { withCredentials: true }
    );
      if (data) {
      const res = { "status": 200, "message": "Product deleted successfully!" };
      return res;
    }
  } catch (error) {
    const res = { status: 400, message: error?.response?.data?.error };
    return res;
  }
};

export const saveThing = async (id, token) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/product/saveThing/${token}`,
      { thingId: id },
      { headers },
      { withCredentials: true }
    );
      if (data) {
      const res = { "status": 200, "message": "item savved successfully!" };
      return res;
    }
  } catch (error) {
    const res = { status: 400, message: error?.response?.data?.error };
    return res;
  }
};

