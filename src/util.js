  export const getTotals = (cart) => {
    let totalAmount = 0;
    let totalCost = 0;
    for(let { amount,price } of cart.values()) {
        totalAmount += amount;
        totalCost += totalAmount * price;

    }
    return {totalAmount, totalCost};
}

