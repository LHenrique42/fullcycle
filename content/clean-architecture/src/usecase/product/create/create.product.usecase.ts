import {
    InputCreateProductDto,
    OutputCreateProductDto,
} from "./create.product.dto";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import Product from "../../../domain/product/entity/product";

export default class CreateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(
        input: InputCreateProductDto,
    ): Promise<OutputCreateProductDto> {
        const product = ProductFactory.create(
            input.type,
            input.name,
            input.price,
        ) as Product;

        await this.productRepository.create(product);

        return {
            id: product.id,
            type: input.type,
            name: product.name,
            price: product.price,
        };
    }
}
