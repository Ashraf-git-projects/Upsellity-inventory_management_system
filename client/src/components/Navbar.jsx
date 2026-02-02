import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h3 style={styles.logo}>Inventory</h3>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/products" style={styles.link}>Products</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 24px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
  },
  logo: {
    margin: 0,
    fontWeight: 600,
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#374151",
    fontWeight: 500,
  },
};


export default Navbar;
