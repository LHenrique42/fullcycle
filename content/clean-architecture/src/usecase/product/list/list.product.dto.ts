export interface InputListProductDto {}

type ProductDto = {
    id: string;
    name: string;
    price: number;
};

export interface OutputListProductDto {
    products: ProductDto[];
}
