import api from "./api";

// export const fetchPosts = () => axios.get("/posts");

export const fetchSignUp = async (postData) => {
  try {
    const response = await api.post("/users/sign-up", postData);
    if (response.data.state === 200) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const fetchLogin = async (postData) => {
  try {
    const response = await api.post("/users/login", postData);
    if (response.data.state === 200) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const fetchBalance = async (postData) => {
  try {
    const response = await api.post("/my-wallet", postData);
    if (response.data.state === 200) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};
