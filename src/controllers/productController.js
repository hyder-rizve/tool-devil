const ProductService = require("../services/productService");

class ProductController {
  static async createProduct(req, res) {
    try {
      const result = await ProductService.createProduct(req.body);
      res
        .status(201)
        .json({ success: true, message: "Product created", data: result });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }

  static async getAllProducts(req, res) {
    try {
      const product = await ProductService.getAllProduct();
      res
        .status(200)
        .json({ success: true, count: product.length, data: product });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }

  static async getByProductId(req, res) {
    try {
      const product = await ProductService.getByProductId(
        req.params.id,
      );
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }

  static async getProductByBrandId(req, res) {
    try {
      const product = await ProductService.getProductByBrandId(
        req.params.id,
      );
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }

  static async getProductBySubCategoryId(req, res) {
    try {
      const product = await ProductService.getProductBySubCategoryId(
        req.params.id,
      );
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }

  static async getProductBySlug(req, res) {
    try {
      const product = await ProductService.getProductBySlug(
        req.params.slug,
      );
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }

}

module.exports = ProductController;
