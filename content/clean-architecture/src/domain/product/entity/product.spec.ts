import NotificationError from "../../@shared/notification/notification.error";
import Product from "./product";

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const product = new Product("", "Product 1", 100);
        }).toThrowError("Id is required");
    });

    it("should throw a notification error with all validations", () => {
        expect(() => {
            new Product("", "", -1);
        }).toThrowError(
            new NotificationError([
                { context: "product", message: "Id is required" },
                { context: "product", message: "Name is required" },
                {
                    context: "product",
                    message: "Price must be greater than zero",
                },
            ]).message,
        );
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            const product = new Product("123", "", 100);
        }).toThrowError("Name is required");
    });

    it("should throw error when price is less than zero", () => {
        expect(() => {
            const product = new Product("123", "Name", -1);
        }).toThrowError("Price must be greater than zero");
    });

    it("should change name", () => {
        const product = new Product("123", "Product 1", 100);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });

    it("should change price", () => {
        const product = new Product("123", "Product 1", 100);
        product.changePrice(150);
        expect(product.price).toBe(150);
    });
});
