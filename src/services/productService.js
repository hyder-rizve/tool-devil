const ProductModel = require("../model/productModel");

class ProductService {
  static async createProduct(productData) {
    const { product_id, quantity_in_stock, product_category } = productData;

    if (!product_id || product_id === "") {
      const error = new Error("Product ID is required");
      error.status = 400;
      throw error;
    }

    if (!product_category || product_category === "") {
      const error = new Error("Product category is required");
      error.status = 400;
      throw error;
    }

    if (
      quantity_in_stock === undefined ||
      quantity_in_stock === null ||
      quantity_in_stock < 0
    ) {
      const error = new Error("Valid quantity is required");
      error.status = 400;
      throw error;
    }

    const id = await InventoryModel.create({
      product_id,
      quantity_in_stock,
      product_category,
    });
    return { id };
  }

  static async getAllProduct() {
    return await ProductModel.findAll();
  }

  static async getByProductId(productId) {
    if (!productId || isNaN(productId)) {
      const error = new Error("Valid product ID is required");
      error.status = 400;
      throw error;
    }

    const product = await ProductModel.findByProductId(productId);
    if (!product) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    return product;
  }

  static async getProductByBrandId(brand_id) {
    if (!brand_id || isNaN(brand_id)) {
      const error = new Error("Valid brand ID is required");
      error.status = 400;
      throw error;
    }

    const product = await ProductModel.findProductByBrandId(brand_id);
    if (!product) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    return product;
  }

  static async getProductBySubCategoryId(sub_category_id) {
    if (!sub_category_id || isNaN(sub_category_id)) {
      const error = new Error("Valid sub category ID is required");
      error.status = 400;
      throw error;
    }

    const product = await ProductModel.findProductBySubCategoryId(sub_category_id);
    if (!product) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    return product;
  }

  static async getProductBySlug(slug) {
    if (!slug) {
      const error = new Error("Valid slug is required");
      error.status = 400;
      throw error;
    }

    const product = await ProductModel.findProductBySlug(slug);
    if (!product) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    return product;
  }
  
}

module.exports = ProductService;
