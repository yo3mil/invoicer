
// two decimals and discount calculator
export const calculators = {
    methods: {
        twoDecimals(number) {
            return (Math.round(number * 100) / 100).toFixed(2);
        },
        discountCalculator(value, discount) {
            return value - (value * (discount / 100))
        },
        vatCalculator(value) {
            return Number(value) + Number(( value * 0.2));
        }
    }
};