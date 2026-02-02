const products = require("../data/products");

const getStockStatus = (stock, minStock) => {
  if (stock === 0) return "OUT_OF_STOCK";
  if (stock <= minStock) return "LOW_STOCK";
  return "IN_STOCK";
};

const getInventoryAnalytics = (req, res) => {
  const totalProducts = products.length;

  let totalInventoryValue = 0;
  let lowStockCount = 0;
  let outOfStockCount = 0;
  const lowStockProducts = [];

  products.forEach((product) => {
    totalInventoryValue += product.price * product.stock;

    const status = getStockStatus(product.stock, product.minStock);

    if (status === "LOW_STOCK") {
      lowStockCount++;
      lowStockProducts.push({
        id: product.id,
        name: product.name,
        stock: product.stock,
      });
    }

    if (status === "OUT_OF_STOCK") {
      outOfStockCount++;
    }
  });

  return res.json({
    success: true,
    data: {
      totalProducts,
      totalInventoryValue,
      lowStockCount,
      outOfStockCount,
      lowStockProducts,
    },
  });
};

module.exports = {
  getInventoryAnalytics,
};
