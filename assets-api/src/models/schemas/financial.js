const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const financialSchema = new Schema({
    quarter: {
        type: Date,
        required: true
    },
    totalAssets: {
        type: Number
    },
    currentAssets: {
        type: Number
    },
    cashEquivalents: {
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
    },
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
    },
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
    },
    cashFlowOpeatingActivities: {
        type: Number
    },
    depreciationAmortization: {
        type: Number
    },
    cashFlowInvestingActivities: {
        type: Number
    },
    capex: {
        type: Number
    },
    cashFlowFinancingActivities: {
        type: Number
    },
    dividendPaidControllingInterest: {
        type: Number
    },
    dividendPaidNonControllingInterest: {
        type: Number
    }
    // TODO: Calculated fields
})

module.exports = financialSchema