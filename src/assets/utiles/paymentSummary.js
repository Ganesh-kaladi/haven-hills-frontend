export function paymentSummary(nights, price, taxesAndFee, order, payment) {
  let subTotal = 0;
  let total = 0;

  subTotal = price * 1 * (nights * 1);
  total = subTotal + taxesAndFee;

  return {
    cabinPrice: price,
    taxesAndFee,
    total,
    subTotal,
    orderID: order,
    paymentID: payment,
  };
}
