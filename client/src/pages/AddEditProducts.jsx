import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "../services/api";

function AddEditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    stock: "",
    minStock: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        const response = await getProductById(id);
        if (response.success) {
          const { name, sku, price, stock, minStock } = response.data;
          setFormData({
            name,
            sku,
            price,
            stock,
            minStock,
          });
        } else {
          setError("Failed to load product");
        }
      };

      fetchProduct();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, sku, price, stock, minStock } = formData;

    if (!name || !sku) {
      setError("Name and SKU are required");
      return;
    }

    const payload = {
      name,
      sku,
      price: Number(price),
      stock: Number(stock),
      minStock: Number(minStock),
    };

    const response = isEditMode
      ? await updateProduct(id, payload)
      : await createProduct(payload);

    if (!response.success) {
      setError(response.message || "Something went wrong");
      return;
    }

    navigate("/products");
  };

  return (
    <div>
      <h2>{isEditMode ? "Edit Product" : "Add Product"}</h2>
      <p style={{ color: "#6b7280", marginBottom: "16px" }}>
  {isEditMode
    ? "Update the product details and stock information."
    : "Fill in the details to add a new product to your inventory."}
</p>


      {error && (
  <p style={{ color: "#b91c1c", marginBottom: "10px" }}>
    {error}
  </p>
)}


      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="sku"
          placeholder="SKU"
          value={formData.sku}
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock Quantity"
          value={formData.stock}
          onChange={handleChange}
        />

        <input
          name="minStock"
          type="number"
          placeholder="Minimum Stock"
          value={formData.minStock}
          onChange={handleChange}
        />

        <button
  type="submit"
  style={{
    padding: "10px 16px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    borderRadius: "6px",
    border: "none",
    fontWeight: 500,
    marginTop: "10px",
  }}
>
  {isEditMode ? "Update Product" : "Save Product"}
</button>

      </form>
    </div>
  );
}

const styles = {
  form: {
     display: "flex",
  flexDirection: "column",
  gap: "14px",
  maxWidth: "420px",
  backgroundColor: "#ffffff",
  padding: "24px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
  },
};

export default AddEditProduct;
