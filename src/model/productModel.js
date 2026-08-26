const db = require("../config/db");

class ProductModel {
  static async create(productData) {
    const {
      sku,
      name,
      description,
      price_ex_vt,
      reorder_level,
      is_active,
      product_category_id,
    } = productData;
    const query = `
            INSERT INTO products (name, description, unit_price, reorder_level, is_active, product_category_id) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
    const [result] = await db.execute(query, [
      name,
      description,
      unit_price,
      reorder_level,
      is_active ?? 1,
      product_category_id ?? null,
    ]);
    return result.insertId;
  }

  static async findAll(searchTerm = "", page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const query = `
            SELECT
                p.id,
                p.name,
                p.description,
                p.unit_price,
                p.reorder_level,
                p.is_active,
                p.product_category_id,
                pc.name AS category_name,
                SUM(i.quantity_in_stock) AS stock_quantity
            FROM products p
            LEFT JOIN product_category pc ON p.product_category_id = pc.id
            LEFT JOIN inventory i ON p.id = i.product_id
            WHERE p.name LIKE ? OR p.description LIKE ? OR p.unit_price LIKE ? 
            group by p.id ORDER BY p.id desc LIMIT ? OFFSET ?
        `;
    const [rows] = await db.execute(query, [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, parseInt(limit), parseInt(offset)]);
    return rows;
  }

  static async findAllCount() {
    const query = `
            SELECT count(p.id) as total
            FROM products p
            LEFT JOIN product_category pc ON p.product_category_id = pc.id
            LEFT JOIN inventory i ON p.id = i.product_id
        `;
    const [rows] = await db.execute(query);
    return rows[0];
  }

  static async findActive() {
    const query = `
            SELECT
                p.id,
                p.name,
                p.description,
                p.unit_price,
                p.reorder_level,
                p.is_active,
                p.product_category_id,
                pc.name AS category_name,
                SUM(i.quantity_in_stock) AS stock_quantity
            FROM products p
            LEFT JOIN product_category pc ON p.product_category_id = pc.id
            LEFT JOIN inventory i ON p.id = i.product_id
            WHERE p.is_active = 1
            GROUP BY p.id
            ORDER BY p.id
        `;
    const [rows] = await db.execute(query);
    return rows;
  }

  static async findById(id) {
    console.log("Finding product by ID:", id);
    const query = `
            SELECT
                p.id,
                p.name,
                p.description,
                p.unit_price,
                p.reorder_level,
                p.is_active,
                p.product_category_id,
                pc.name AS category_name,
                SUM(i.quantity_in_stock) AS stock_quantity,
                p.product_category_id
            FROM products p
            LEFT JOIN product_category pc ON p.product_category_id = pc.id
            LEFT JOIN inventory i ON p.id = i.product_id
            WHERE p.id = ?
            GROUP BY p.id
        `;
    const [rows] = await db.execute(query, [id]);
    console.log("Product found:", rows[0]);
    return rows[0];
  }

  static async update(id, productData) {
    const {
      name,
      description,
      unit_price,
      reorder_level,
      is_active,
      product_category_id,
    } = productData;
    console.log("Updating product with ID:", id, "and data:", productData);
    const query = `
            UPDATE products 
            SET name = ?, description = ?, unit_price = ?, reorder_level = ?, is_active = ?, product_category_id = ?
            WHERE id = ?
        `;
    console.log("Executing query:", query, "with values:");
    const [result] = await db.execute(query, [
      name,
      description,
      unit_price,
      reorder_level,
      is_active,
      product_category_id,
      id,
    ]);
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const query = "DELETE FROM products WHERE id = ?";
    const [result] = await db.execute(query, [id]);
    return result.affectedRows > 0;
  }

  // EXTRA - Get low stock products
  static async getLowStock() {
    const query = `
            SELECT p.*, i.quantity_in_stock 
            FROM products p
            LEFT JOIN inventory i ON p.id = i.product_id
            WHERE i.quantity_in_stock <= p.reorder_level
            ORDER BY i.quantity_in_stock ASC
        `;
    const [rows] = await db.execute(query);
    return rows;
  }
}

module.exports = ProductModel;
