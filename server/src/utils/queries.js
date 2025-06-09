
const getSellerStatisticsQuery = (sellerId = null) => {
    return `
        SELECT
            "User"."id",
            "User"."name",
            "User"."last_name",
            "User"."email",
            COUNT("OrderItems"."id") AS "total_sold_items",
            SUM("OrderItems"."quantity") AS "total_quantity_sold"
        FROM "users" AS "User"
        LEFT OUTER JOIN "products" AS "products" ON "User"."id" = "products"."user_id"
        LEFT OUTER JOIN "order_items" AS "OrderItems" ON "products"."id" = "OrderItems"."product_id"
        ${sellerId ? 'WHERE "User"."id" = :sellerId' : ''}
        GROUP BY "User"."id", "User"."name", "User"."last_name", "User"."email"
        ORDER BY "total_sold_items" DESC;
    `;
};

module.exports = { getSellerStatisticsQuery };

