import { useEffect, useState } from "react";
import { getAnalytics } from "../services/api";

function Dashboard() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const response = await getAnalytics();
      if (response.success) {
        setAnalytics(response.data);
      }
    };

    fetchAnalytics();
  }, []);

if (!analytics) {
  return (
    <p style={{ color: "#6b7280" }}>
      Loading dashboard data…
    </p>
  );
}


  return (
  <div>
    <h2>Dashboard</h2>

    {/* Summary Cards */}
    <div style={styles.cards}>
      <div style={styles.card}>
        <div style={styles.cardTitle}>Total Products</div>
        <div style={styles.cardValue}>
          {analytics.totalProducts}
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>Total Inventory Value</div>
        <div style={styles.cardValue}>
          ₹{analytics.totalInventoryValue}
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>Low Stock Items</div>
        <div style={styles.cardValue}>
          {analytics.lowStockCount}
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>Out of Stock</div>
        <div style={styles.cardValue}>
          {analytics.outOfStockCount}
        </div>
      </div>
    </div>

    {/* Low Stock Alerts */}
    <div style={{ marginTop: "40px" }}>
      <h3>Low Stock Alerts</h3>

      {analytics.lowStockProducts.length === 0 ? (
        <p style={{ marginTop: "10px" }}>
          No low stock products 🎉
        </p>
      ) : (
        <ul style={{ marginTop: "12px" }}>
          {analytics.lowStockProducts.map((product) => (
            <li key={product.id} style={{ marginBottom: "8px" }}>
              <strong>{product.name}</strong> — Stock: {product.stock}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

}

const styles = {
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "24px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
  },
  cardTitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "8px",
  },
  cardValue: {
    fontSize: "28px",
    fontWeight: 600,
    color: "#111827",
  },
};


export default Dashboard;
