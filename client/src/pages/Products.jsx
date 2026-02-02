import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../services/api";


function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      if (response.success) {
        setProducts(response.data);
      }
    };

    fetchProducts();
  }, []);

  const getStatusStyle = (status) => {
    if (status === "IN_STOCK") return { color: "green" };
    if (status === "LOW_STOCK") return { color: "orange" };
    if (status === "OUT_OF_STOCK") return { color: "red" };
    return {};
  };

 const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
  "This action will permanently delete the product. Do you want to continue?"
);


  if (!confirmDelete) return;

  const response = await deleteProduct(id);

  if (response.success) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  } else {
    alert(response.message || "Failed to delete product");
  }
};

const handleExportCSV = () => {
  if (products.length === 0) {
    alert("No products to export");
    return;
  }

  const headers = ["Name", "SKU", "Price", "Stock", "Status"];

  const rows = products.map((product) => [
    product.name,
    product.sku,
    product.price,
    product.stock,
    product.status,
  ]);

  let csvContent =
    headers.join(",") +
    "\n" +
    rows.map((row) => row.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "inventory.csv";
  link.click();

  URL.revokeObjectURL(url);
};


  return (
    <div>
      <div style={styles.header}>
  <h2>Products</h2>

  <div style={{ display: "flex", gap: "12px" }}>
    <Link
      to="/products/new"
      style={{
        padding: "8px 14px",
        backgroundColor: "#2563eb",
        color: "#ffffff",
        borderRadius: "6px",
        textDecoration: "none",
        fontWeight: 500,
      }}
    >
      Add Product
    </Link>

    <button
      onClick={handleExportCSV}
      style={{
        padding: "8px 14px",
        borderRadius: "6px",
        border: "1px solid #d1d5db",
        backgroundColor: "#ffffff",
      }}
    >
      Export CSV
    </button>
  </div>
</div>


      <table style={styles.table}>
  <thead>
    <tr>
      

      <th style={{ padding: "12px", textAlign: "left", background: "#f9fafb" }}>Name</th>
      <th style={{ padding: "12px", textAlign: "left", background: "#f9fafb" }}>SKU</th>
      <th style={{ padding: "12px", textAlign: "left", background: "#f9fafb" }}>Price</th>
      <th style={{ padding: "12px", textAlign: "left", background: "#f9fafb" }}>Stock</th>
      <th style={{ padding: "12px", textAlign: "left", background: "#f9fafb" }}>Status</th>
      <th style={{ padding: "12px", textAlign: "left", background: "#f9fafb" }}>Actions</th>
    </tr>
  </thead>

  <tbody>
  {products.length === 0 ? (
    <tr>
      <td
  colSpan="6"
  style={{
    textAlign: "center",
    padding: "30px",
    color: "#6b7280",
  }}
>
  No products found. Click <strong>“Add Product”</strong> to get started.
</td>

    </tr>
  ) : (
    products.map((product) => (
      <tr key={product.id}>
        <td style={{ padding: "12px", borderTop: "1px solid #e5e7eb" }}>{product.name}</td>
        <td style={{ padding: "12px", borderTop: "1px solid #e5e7eb" }}>{product.sku}</td>
        <td style={{ padding: "12px", borderTop: "1px solid #e5e7eb" }}>₹{product.price}</td>
        <td style={{ padding: "12px", borderTop: "1px solid #e5e7eb" }}>{product.stock}</td>
        <td style={getStatusStyle(product.status)}>
          {product.status.replaceAll("_", " ")}
        </td>
       <td>
  <Link
    to={`/products/${product.id}/edit`}
    style={{
      marginRight: "12px",
      color: "#2563eb",
      textDecoration: "none",
      fontWeight: 500,
    }}
  >
    Edit
  </Link>

  <button
    onClick={() => handleDelete(product.id)}
    style={{
      border: "1px solid #ef4444",
      color: "#ef4444",
      backgroundColor: "#ffffff",
      borderRadius: "6px",
      padding: "6px 10px",
    }}
  >
    Delete
  </button>
</td>

      </tr>
    ))
  )}
</tbody>

</table>

    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  addButton: {
    textDecoration: "none",
    padding: "8px 12px",
    border: "1px solid #333",
    color: "#333",
  },
  table: {
      width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  overflow: "hidden",
  },
};

export default Products;
