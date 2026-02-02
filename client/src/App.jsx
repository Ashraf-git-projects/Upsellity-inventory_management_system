import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddEditProduct from "./pages/AddEditProducts";

function App() {
  return (
    <BrowserRouter>
         <Navbar />
         <div style={{ padding: "24px", maxWidth: "1100px", margin: "0 auto" }}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/new" element={<AddEditProduct />} />
        <Route path="/products/:id/edit" element={<AddEditProduct />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
