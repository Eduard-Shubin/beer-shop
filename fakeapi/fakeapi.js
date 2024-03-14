import beerData from './beer.json'

let fakeData = {
    payments: [],
}

let fakeApi = {
    makePayment: function (paymentData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (
                    typeof paymentData.cardNumber === 'number' &&
                    paymentData.cardNumber.toString().length === 16 &&
                    typeof paymentData.expirationDate === 'string' &&
                    paymentData.expirationDate.length === 5 &&
                    typeof paymentData.cvv === 'number' &&
                    paymentData.cvv.toString().length === 3
                ) {
                    let payment = {
                        id: fakeData.payments.length + 1,
                        amount: paymentData.cart.reduce(
                            (total, item) => total + item.price * item.qty,
                            0
                        ),
                        receiver:
                            paymentData.firstName + ' ' + paymentData.lastName,
                    }
                    fakeData.payments.push(payment)
                    resolve(payment)
                } else {
                    reject('Неверные данные карты')
                }
            }, 1000)
        })
    },
    getPayments: function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(fakeData.payments)
            }, 1000)
        })
    },

    getBeers: function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const beerArray = []
                for (let i = 0; i < 20; i++) {
                    beerArray.push(beerData)
                }

                resolve(beerArray)
            }, 1000)
        })
    },
    getBeer: function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(beerData)
            }, 1000)
        })
    },
}

export default fakeApi
