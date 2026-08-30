const CategoryModel = require("../model/categoryModel");

class CategoryService {
  static async createCategory(categoryData) {
    const { product_id, quantity_in_stock, product_category } = categoryData;

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

  static async getAllCategories() {
    return await CategoryModel.findAll();
  }

  static async getCategoriesById(categoryId) {
    if (!categoryId || isNaN(categoryId)) {
      const error = new Error("Valid category ID is required");
      error.status = 400;
      throw error;
    }

    const category = await CategoryModel.findByCategoryId(categoryId);
    if (!category) {
      const error = new Error("Category not found");
      error.status = 404;
      throw error;
    }

    return category;
  }

}

module.exports = CategoryService;
