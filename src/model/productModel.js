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

}

module.exports = productModel;
