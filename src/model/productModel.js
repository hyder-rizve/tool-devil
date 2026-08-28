const db = require("../config/db");

class productModel {

  static async findAll() {
    const query = `
            SELECT * FROM product 
        `;
    const [rows] = await db.execute(query);
    return rows;
  }

  static async findByProductId(productId) {
    const query = `
            SELECT * FROM product where id = ?
        `;
    const [rows] = await db.execute(query, [productId]);
    return rows;
  }

  static async findProductByBrandId(brandId) {
    const query = `
            SELECT * FROM product where brand_id = ?
        `;
    const [rows] = await db.execute(query, [brandId]);
    return rows;
  }

  static async findProductBySubCategoryId(sub_categoryId) {
    const query = `
            SELECT * FROM product where sub_category_id = ?
        `;
    const [rows] = await db.execute(query, [sub_categoryId]);
    return rows;
  }

  static async findProductBySlug(slug) {
    const query = `
            SELECT * FROM product where slug = ?
        `;
    const [rows] = await db.execute(query, [slug]);
    return rows;
  }

}

module.exports = productModel;
