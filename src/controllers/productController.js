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
      const products = await ProductService.getAllProducts(req.query.search || "", parseInt(req.query.page) || 1, parseInt(req.query.limit) || 10 );
      const totalCount = await ProductService.getAllProductsCount();
      res
        .status(200)
        .json({ success: true, count: totalCount.total, data: products });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }

  static async getProductById(req, res) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      console.log("Updating product with ID:", req.params.id, "and data:", req.body);
      await ProductService.updateProduct(req.params.id, req.body);
      res.status(200).json({ success: true, message: "Product updated" });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      await ProductService.deleteProduct(req.params.id);
      res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }

  static async getLowStock(req, res) {
    try {
      const lowStock = await ProductService.getLowStock();
      res.status(200).json({ success: true, data: lowStock });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }
}

module.exports = ProductController;
