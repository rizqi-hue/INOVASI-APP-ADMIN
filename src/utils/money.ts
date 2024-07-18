
const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0, 
});

export const toMoney = (money: number) => {
    try {
        const formatter = new Intl.NumberFormat();
        return "Rp " + formatter.format(money);
    } catch (e) {
        return "Invalid money number";
    }
};

export const money = (money: number) => {
    try {
        return formatter.format(money)
    } catch (e) {
        console.log("gagal mengambil data");
    }
};