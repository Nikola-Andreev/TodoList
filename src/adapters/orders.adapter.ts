export default class OrdersAdapter {
    updateStatus(currentOrder: any, newOrder: any) {
        currentOrder.status = newOrder.status;
        return currentOrder;
    }

    prepareResponse(orders: any) {
        return orders.map(order => {
            order.id = order._id;
            order.date = new Date(order.date).toISOString().split('T')[0];
            delete order._id;
            delete order._acl;
            delete order._kmd;
            return order; 
        })
    }
}
