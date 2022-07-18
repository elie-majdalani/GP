const mongoose = require("mongoose");

const ETransactionState = Object.freeze({
    New: 0,
    Pending: 1,
    Confirmed: 2,
    Cancelled: 3,
    Declined: 4,
})

const ETransactionCurrency = Object.freeze({
    Null: 'null',
    ETH: 'ETH',
    USDT: 'USDT',
    TRX: 'TRX',
})

const ETransactionType = Object.freeze({
    Withdraw: 0,
    Deposit: 1,
})

const TransactionSchema = new mongoose.Schema(
    {
        user_id: { type: String, required: true },
        email: { type: String, required: true },
        amount: {
            type: Number,
            get: v => parseInt(v, 10),
            set: v => parseInt(v, 10),
            default: 0
        },
        currency: { type: String, default: ETransactionCurrency.Null, enum: ETransactionCurrency, },
        type: { type: Number, required: true, enum: ETransactionType, },
        status: { type: Number, required: true, default: ETransactionState.New, enum: ETransactionState, },
        trx_id: { type: String },
        createdAt: { type: Date, default: Date.now }
    }
)

module.exports = mongoose.model("transaction", TransactionSchema);