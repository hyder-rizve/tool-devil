const db = require("../config/db");

class sub_categoryModel {

  static async findAll() {
    const query = `
            SELECT * FROM sub_category
        `;
    const [rows] = await db.execute(query);
    return rows;
  }

  static async findById(sub_categoryId) {
    const query = `
            SELECT * FROM sub_category where id = ?
        `;
    const [rows] = await db.execute(query, [sub_categoryId]);
    return rows;
  }
  
}

module.exports = sub_categoryModel;
