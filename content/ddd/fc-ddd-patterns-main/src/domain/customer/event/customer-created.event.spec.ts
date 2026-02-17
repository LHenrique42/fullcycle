import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedOneHandler from "./handler/customer-created-one.handler";
import CustomerCreatedTwoHandler from "./handler/customer-created-two.handler";
import CustomerCreatedEvent from "./customer-created.event";

describe("Customer created event test", () => {
    it("should create a customer created event", () => {
        const eventDispatcher = new EventDispatcher();
        const firstEventHandler = new CustomerCreatedOneHandler();
        const secondEventHandler = new CustomerCreatedTwoHandler();
        const spyFirstEventHandler = jest.spyOn(firstEventHandler, "handle");
        const spySecondEventHandler = jest.spyOn(secondEventHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", firstEventHandler);
        eventDispatcher.register("CustomerCreatedEvent", secondEventHandler);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "1",
            name: "Customer 1",
            email: "customer1@example.com",
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyFirstEventHandler).toHaveBeenCalled();
        expect(spySecondEventHandler).toHaveBeenCalled();
    });
});
