const db = require("../config/db");
class OrderModel {
    // CREATE - New booking with services
    static async create(orderData) {
        const {
            user_id,
            subtotal_ex_vat,
            vat_amount,
            total,
            currency,
            order_details
        } = orderData;
        // Start transaction
        const connection = await db.getConnection();
        await connection.beginTransaction();
        try {
            const order_number = Math.floor(1000000 + Math.random() * 9000000).toString();
            // 1. Insert booking
            const orderQuery = `
                INSERT INTO order (order_number,user_id,status,subtotal_ex_vat,vat_amount,total,currency,) VALUES (?,?,"pending",?,?,?,?,);
            `;
            const [orderResult] = await connection.execute(orderQuery, [
                order_number,
                user_id,
                subtotal_ex_vat,
                vat_amount,
                total,
                currency,
            ]);
            const orderId = orderResult.insertId;

            // 2. Insert order services
            let totalAmount = 0;
            if (order_details && order_details.length > 0) {
                for (const order of order_details) {
                    const orderdetailQuery = `
                        INSERT INTO order_details (order_id,product_id,sku,product_name,unit_price_ex_vat,quantity,line_total) VALUES (?,?,?,?,?,?,?);
                    `;
                    await connection.execute(serviceQuery, [
                        orderId,
                        order.product_id,
                        order.sku,
                        order.product_name,
                        order.unit_price_ex_vat,
                        order.quantity,
                        order.line_total
                    ]);
                }
            }
            await connection.commit();
            return orderId;
        } catch (error) {
            await connection.rollback();
            throw error;
        }
    }
}

module.exports = OrderModel;