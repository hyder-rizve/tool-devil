const sub_categoryModel = require("../model/sub_categoryModel");

class Sub_CategoryService {
  static async createSub_Category(Sub_CategoryData) {
    const { product_id, quantity_in_stock, product_category } = Sub_CategoryData;

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

  static async getAllSub_Category() {
    return await sub_categoryModel.findAll();
  }

  static async getSub_categoryById(sub_categoryId) {
    if (!sub_categoryId || isNaN(sub_categoryId)) {
      const error = new Error("Valid sub_category ID is required");
      error.status = 400;
      throw error;
    }

    const sub_category = await sub_categoryModel.findById(sub_categoryId);
    if (!sub_category) {
      const error = new Error("sub_category not found");
      error.status = 404;
      throw error;
    }

    return sub_category;
  }

  static async getSub_categoryByParentId(parent_id) {
    if (!parent_id || isNaN(parent_id)) {
      const error = new Error("Valid parent ID is required");
      error.status = 400;
      throw error;
    }

    const sub_category = await sub_categoryModel.findByParentId(parent_id);
    if (!parent_id) {
      const error = new Error("parent ID not found");
      error.status = 404;
      throw error;
    }

    return sub_category;
  }

}

module.exports = Sub_CategoryService;
