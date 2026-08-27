const categoryService = require("../services/categoryService");

class categoryController {
  static async createCategory(req, res) {
    try {
      const result = await categoryService.createCategory(req.body);
      res
        .status(201)
        .json({ success: true, message: "Category created", data: result });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }

  static async getAllCategory(req, res) {
    try {
      const category = await categoryService.getAllCategories();
      res
        .status(200)
        .json({ success: true, count: category.length, data: category });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }

  static async getCategoryById(req, res) {
    try {
      const category = await categoryService.getCategoriesById(
        req.params.id,
      );
      res.status(200).json({ success: true, data: category });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }

}

module.exports = categoryController;
