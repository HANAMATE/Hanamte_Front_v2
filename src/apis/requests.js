import api from "./api";

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

export const fetchBalance = async () => {
  try {
    const response = await api.get("/my-wallet");
    if (response.data.state === 200) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const getMyWalletTransactions = async () => {
  try {
    const response = await api.get("/my-wallet/transactions");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getMyAccount = async () => {
  try {
    const response = await api.get("/my-wallet/account");
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchPostAccount = async (postData) => {
  try {
    const response = await api.post("/my-wallet/account", postData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchGetParent = async (postData) => {
  try {
    const response = await api.post("/child/my-parent", postData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchRequestAllowance = async (postData) => {
  try {
    const response = await api.post("/allowance/child", postData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getRequestHistoryChild = async () => {
  try {
    const response = await api.get("/allowance/child/pending");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getRequestHistoryParent = async () => {
  try {
    const response = await api.get("/allowance/parent/pending");
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchApprove = async (postData) => {
  try {
    const response = await api.put("/allowance/parent", postData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchGetChild = async (postData) => {
  try {
    const response = await api.post("/parent/my-child", postData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchSendAllowance = async (postData) => {
  try {
    const response = await api.post("/allowance/send", postData);
    return response;
  } catch (error) {
    throw error;
  }
};
