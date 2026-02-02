const BASE_URL = "https://upsellity-inventory-management-system.onrender.com/api";

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  const data = await response.json();
  return data;
};

export const createProduct = async (productData) => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  const data = await response.json();
  return data;
};
export const getProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  const data = await response.json();
  return data;
};

export const updateProduct = async (id, productData) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  const data = await response.json();
  return data;
};
export const deleteProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();
  return data;
};
export const getAnalytics = async () => {
  const response = await fetch(`${BASE_URL}/analytics`);
  const data = await response.json();
  return data;
};
