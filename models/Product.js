import { EntitySchema } from "typeorm";

export const Product = new EntitySchema({
    name: "Product",
    tableName: "products",
    columns: {
        id: { type: "int", primary: true, generated: true },
        name: { type: "varchar" },
        price: { type: "decimal" },
        description: { type: "varchar" }
    }
});