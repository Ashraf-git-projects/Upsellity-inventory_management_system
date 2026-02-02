const products = require("../data/products");

const getStockStatus = (stock, minStock) => {
  if (stock === 0) return "OUT_OF_STOCK";
  if (stock <= minStock) return "LOW_STOCK";
  return "IN_STOCK";
};

// Create a new product
const createProduct = (req, res) => {
  const { name, sku, price, stock, minStock } = req.body;


  // Basic validation
  if (!name || !sku) {
    return res.status(400).json({
      success: false,
      message: "Product name and SKU are required",
    });
  }

  if (price < 0 || stock < 0 || minStock < 0) {
    return res.status(400).json({
      success: false,
      message: "Price, stock, and minimum stock cannot be negative",
    });
  }

  // Check for unique SKU
  const existingProduct = products.find((p) => p.sku === sku);
  if (existingProduct) {
    return res.status(400).json({
      success: false,
      message: "SKU must be unique",
    });
  }

  const newProduct = {
    id: Date.now().toString(),
    name,
    sku,
    price,
    stock,
    minStock,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  products.push(newProduct);

  return res.status(201).json({
    success: true,
    data: newProduct,
  });
};

const getAllProducts = (req, res) => {
  const result = products.map((product) => ({
    ...product,
    status: getStockStatus(product.stock, product.minStock),
  }));

  return res.json({
    success: true,
    data: result,
  });
};

const getProductById = (req, res) => {
  const { id } = req.params;

  const product = products.find((p) => String(p.id) === String(id));


  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  return res.json({
    success: true,
    data: {
      ...product,
      status: getStockStatus(product.stock, product.minStock),
    },
  });
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, sku, price, stock, minStock } = req.body;

  const productIndex = products.findIndex(
    (p) => String(p.id) === String(id)
  );

  if (productIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  // Validate fields if provided
  if (price !== undefined && price < 0) {
    return res.status(400).json({
      success: false,
      message: "Price cannot be negative",
    });
  }

  if (stock !== undefined && stock < 0) {
    return res.status(400).json({
      success: false,
      message: "Stock cannot be negative",
    });
  }

  if (minStock !== undefined && minStock < 0) {
    return res.status(400).json({
      success: false,
      message: "Minimum stock cannot be negative",
    });
  }

  // Check SKU uniqueness (if updating SKU)
  if (sku) {
    const skuExists = products.some(
      (p, index) =>
        p.sku === sku && index !== productIndex
    );

    if (skuExists) {
      return res.status(400).json({
        success: false,
        message: "SKU must be unique",
      });
    }
  }

  const existingProduct = products[productIndex];

  const updatedProduct = {
    ...existingProduct,
    name: name ?? existingProduct.name,
    sku: sku ?? existingProduct.sku,
    price: price ?? existingProduct.price,
    stock: stock ?? existingProduct.stock,
    minStock: minStock ?? existingProduct.minStock,
    updatedAt: new Date().toISOString(),
  };

  products[productIndex] = updatedProduct;

  return res.json({
    success: true,
    data: {
      ...updatedProduct,
      status: getStockStatus(
        updatedProduct.stock,
        updatedProduct.minStock
      ),
    },
  });
};

const deleteProduct = (req, res) => {
  const { id } = req.params;

  const productIndex = products.findIndex(
    (p) => String(p.id) === String(id)
  );

  if (productIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  products.splice(productIndex, 1);

  return res.json({
    success: true,
    message: "Product deleted successfully",
  });
};


module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
