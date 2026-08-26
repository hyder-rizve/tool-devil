const ProductModel = require("../model/productModel");

class ProductService {
  static async createProduct(productData) {
    const {
      name,
      description,
      unit_price,
      reorder_level,
      is_active,
      product_category_id,
    } = productData;

    if (!name || name.trim() === "") {
      const error = new Error("Name is required");
      error.status = 400;
      throw error;
    }

    if (!unit_price || parseFloat(unit_price) <= 0) {
      const error = new Error("Valid price is required");
      error.status = 400;
      throw error;
    }

    const id = await ProductModel.create({
      name: name.trim(),
      description: description ? description.trim() : null,
      unit_price: parseFloat(unit_price),
      reorder_level: reorder_level !== undefined ? reorder_level : null,
      is_active: is_active !== undefined ? is_active : 1,
      product_category_id:
        product_category_id !== undefined ? product_category_id : null,
    });

    return { id };
  }

  static async getAllProducts(searchTerm = "", page = 1, limit = 10) {
    return await ProductModel.findAll(searchTerm, page, limit);
  }

  static async getAllProductsCount() {
    return await ProductModel.findAllCount();
  }

  static async getProductById(id) {
    if (!id || isNaN(id)) {
      const error = new Error("Valid product ID is required");
      error.status = 400;
      throw error;
    }

    const product = await ProductModel.findById(id);
    if (!product) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    return product;
  }

  static async updateProduct(id, productData) {
    console.log(
      "Received request to update product with ID:",
      id,
      "and data:",
      productData,
    );
    if (!id || isNaN(id)) {
      const error = new Error("Valid product ID is required");
      error.status = 400;
      throw error;
    }
    console.log("Updating product with ID:", id, "and data:", productData);
    const existing = await ProductModel.findById(id);
    if (!existing) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    const updatePayload = {
      ...productData,
      product_category_id:
        productData.product_category_id !== undefined
          ? productData.product_category_id
          : null,
    };

    const updated = await ProductModel.update(id, updatePayload);
    console.log("Update result for product ID", id, ":", updated);
    if (!updated) {
      const error = new Error("Failed to update product");
      error.status = 500;
      throw error;
    }

    return true;
  }

  static async deleteProduct(id) {
    if (!id || isNaN(id)) {
      const error = new Error("Valid product ID is required");
      error.status = 400;
      throw error;
    }

    const existing = await ProductModel.findById(id);
    if (!existing) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    const deleted = await ProductModel.delete(id);
    if (!deleted) {
      const error = new Error("Failed to delete product");
      error.status = 500;
      throw error;
    }

    return true;
  }

  static async getLowStock() {
    return await ProductModel.getLowStock();
  }
}

module.exports = ProductService;
