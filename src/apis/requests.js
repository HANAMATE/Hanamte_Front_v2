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

export const getRequestMyMoimList = async () => {
  try {
    const response = await api.get("/moims");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getRequestMyMoim = async (walletId) => {
  try {
    const response = await api.get(`/moim/${walletId}`);
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

export const fetchWriteComment = async (commentInfo) => {
  try {
    const response = await api.post(`/moim/sns/article/comment`, commentInfo);
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

export const getArticleDetail = async (articleId) => {
  try {
    const response = await api.post(`/moim/sns/article/detail`, articleId);
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

export const writeArticleRequest = async (formData) => {
  try {
    const response = await api.post(`/moim/sns/article`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // FormData로 전송할 때 content type 설정
      },
    });
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

export const deleteArticleRequest = async (articleId) => {
  try {
    const response = await api.delete(`/moim/sns/article`, {
      data: { articleId },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
