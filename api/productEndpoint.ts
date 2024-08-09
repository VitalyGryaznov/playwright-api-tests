export const createProduct = async (request, payload) => {
  return request.post("objects", {
    data: payload,
  });
};

export const getProductById = async (request, productId) => {
  return request.get(`objects/${productId}`);
};

export const deleteProductById = async (request, productId) => {
  return request.delete(`objects/${productId}`);
};
