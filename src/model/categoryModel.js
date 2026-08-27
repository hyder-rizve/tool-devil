const db = require("../config/db");

class categoryModel {

  static async findAll() {
    const query = `
            SELECT * FROM category
        `;
    const [rows] = await db.execute(query);
    return rows;
  }

  static async findByCategoryId(categoryId) {
    const query = `
            SELECT * FROM category where id = ?
        `;
    const [rows] = await db.execute(query, [categoryId]);
    return rows;
  }

}

module.exports = categoryModel;
