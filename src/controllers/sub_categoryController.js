const Sub_CategoryService = require("../services/Sub_CategoryService");

class Sub_CategoryController {
  static async createInventory(req, res) {
    try {
      const result = await InventoryService.createInventory(req.body);
      res
        .status(201)
        .json({ success: true, message: "Inventory created", data: result });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }

  static async getAllSub_Category(req, res) {
    try {
      const sub_category = await Sub_CategoryService.getAllSub_Category();
      res
        .status(200)
        .json({ success: true, count: sub_category.length, data: sub_category });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }

  static async getsub_categoryById(req, res) {
    try {
      const sub_category = await Sub_CategoryService.getSub_categoryById(
        req.params.id,
      );
      res.status(200).json({ success: true, data: sub_category });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }

  static async getsub_categoryByParentId(req, res) {
    try {
      const sub_category = await Sub_CategoryService.getSub_categoryByParentId(
        req.params.parent_id,
      );
      res.status(200).json({ success: true, data: sub_category });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }
  
}

module.exports = Sub_CategoryController;
