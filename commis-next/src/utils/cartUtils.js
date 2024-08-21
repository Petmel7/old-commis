const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
};

const calculateGrandTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};