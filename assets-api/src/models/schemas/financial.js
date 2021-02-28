const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const financialSchema = new Schema({
    stock: {
        type: String,
        required: true,
        ref: 'Stock'
    },
    date: {
        type: Date,
        required: true
    },
    quarter: {
        type: String,
        required: true
    },
    assets: {
        totalAssets: {
            type: Number
        },
        currentAssets: {
            type: Number
        },
        cashAndCashEquivalents: {
            type: Number
        },
        shortTermInvestments: {
            type: Number
        },
        totalReceivables: {
            type: Number
        },
        inventory: {
            type: Number
        },
        nonCurrentAssets: {
            type: Number
        },
        longTermAssets: {
            type: Number
        },
        longTermInvestments: {
            type: Number
        },
        ppeGross: {
            type: Number
        },
        intangibles: {
            type: Number
        }
        // TODO: Calculated fields
    },
    liabilities: {
        totalLiabilities: {
            type: Number
        },
        curretLiabilities: {
            type: Number
        },
        shortTermLoans: {
            type: Number
        },
        nonCurrentLiabilities: {
            type: Number
        },
        longTermLoans: {
            type: Number
        },
        equity: {
            type: Number
        }
    },
    income: {
        revenue: {
            type: Number
        },
        costRevenue: {
            type: Number
        },
        grossIncome: {
            type: Number
        },
        operatingExpenses: {
            type: Number
        },
        ebit: {
            type: Number
        },
        financialResult: {
            type: Number
        },
        ebt: {
            type: Number
        },
        taxes: {
            type: Number
        },
        netIncomeContinuingOperations: {
            type: Number
        },
        netIncomeDiscontinuedOperations: {
            type: Number
        },
        netIncome: {
            type: Number
        }
    },
    flowCash: {
        operatingActivities: {
            type: Number
        },
        depreciationAmortization: {
            type: Number
        },
        investingActivities: {
            type: Number
        },
        capex: {
            type: Number
        },
        financingActivities: {
            type: Number
        },
        dividendPaidControllingInterest: {
            type: Number
        },
        dividendPaidNonControllingInterest: {
            type: Number
        }
        // TODO: Calculated fields
    }
})

module.exports = financialSchema