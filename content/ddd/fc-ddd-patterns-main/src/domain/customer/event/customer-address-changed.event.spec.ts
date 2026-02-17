import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressChangedHandler from "./handler/customer-address-changes.handler";
import CustomerAddressChangedEvent from "./customer-address-changed.event";

describe("Customer address changed event test", () => {
    it("should create a customer address changed event", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new CustomerAddressChangedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            id: "1",
            name: "Customer 1",
            email: "customer1@example.com",
            address: "123 Main St",
        });

        eventDispatcher.notify(customerAddressChangedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });
});
