export const formatPrice = (amount, currency) => {
    return `${currency} ${amount.toFixed(2)}`;
}