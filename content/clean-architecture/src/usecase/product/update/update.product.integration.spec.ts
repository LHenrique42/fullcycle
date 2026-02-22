import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const input = {
            id: product.id,
            name: "Product 1 Updated",
            price: 150,
        };

        const result = await usecase.execute(input);

        const productModel = await ProductModel.findOne({
            where: { id: product.id },
        });

        expect(result).toEqual(input);
        expect(productModel.toJSON()).toStrictEqual({
            id: input.id,
            name: input.name,
            price: input.price,
        });
    });
});
