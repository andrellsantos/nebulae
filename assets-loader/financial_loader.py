import csv

ORDER_PREVIOUS = "PENÚLTIMO"
ORDER_LAST = "ÚLTIMO"

# CNPJ_CIA;DT_REFER;VERSAO;DENOM_CIA;CD_CVM;GRUPO_DFP;MOEDA;ESCALA_MOEDA;ORDEM_EXERC;DT_FIM_EXERC;CD_CONTA;DS_CONTA;VL_CONTA;ST_CONTA_FIXA
BP_HEADER = {
    "CNPJ_CIA"      : 0,
    "DT_REFER"      : 1,
    "VERSAO"        : 2,
    "DENOM_CIA"     : 3,
    "CD_CVM"        : 4,
    "GRUPO_DFP"     : 5,
    "MOEDA"         : 6,
    "ESCALA_MOEDA"  : 7,
    "ORDEM_EXERC"   : 8,
    "DT_FIM_EXERC"  : 9,
    "CD_CONTA"      : 10,
    "DS_CONTA"      : 11,
    "VL_CONTA"      : 12,
    "ST_CONTA_FIXA" : 13
}

# CNPJ_CIA;DT_REFER;VERSAO;DENOM_CIA;CD_CVM;GRUPO_DFP;MOEDA;ESCALA_MOEDA;ORDEM_EXERC;DT_INI_EXERC;DT_FIM_EXERC;CD_CONTA;DS_CONTA;VL_CONTA;ST_CONTA_FIXA
DRE_HEADER = {
    "CNPJ_CIA"      : 0,
    "DT_REFER"      : 1,
    "VERSAO"        : 2,
    "DENOM_CIA"     : 3,
    "CD_CVM"        : 4,
    "GRUPO_DFP"     : 5,
    "MOEDA"         : 6,
    "ESCALA_MOEDA"  : 7,
    "ORDEM_EXERC"   : 8,
    "DT_INI_EXERC"  : 9,
    "DT_FIM_EXERC"  : 10,
    "CD_CONTA"      : 11,
    "DS_CONTA"      : 12,
    "VL_CONTA"      : 13,
    "ST_CONTA_FIXA" : 14
}

CODES_ASSETS = {
    "1"       : "totalAssets",
    "1.01"    : "currentAssets",
    "1.01.01" : "cashAndCashEquivalents",
    "1.01.02" : "shortTermInvestments",
    "1.01.03" : "totalReceivables",
    "1.01.04" : "inventory",
    "1.02"    : "nonCurrentAssets",
    "1.02.01" : "longTermAssets",
    "1.02.02" : "longTermInvestments",
    "1.02.03" : "ppeGross",
    "1.02.04" : "intangibles"
}

CODES_LIABILITIES = {
    "2"       : "totalLiabilities",
    "2.01"    : "curretLiabilities",
    "2.01.04" : "shortTermLoans",
    "2.02"    : "nonCurrentLiabilities",
    "2.02.04" : "longTermLoans",
    "2.03"    : "equity"
}

CODES_INCOME = {
    "3.01"  : "revenue",
    "3.02"  : "costRevenue",
    "3.03"  : "grossIncome",
    "3.04"  : "operatingExpenses",
    "3.05"  : "ebit",
    "3.06"  : "financialResult",
    "3.07"  : "ebt",
    "3.08"  : "taxes",
    "3.09"  : "netIncomeContinuingOperations",
    "3.10"  : "netIncomeDiscontinuedOperations",
    "3.11"  : "netIncome"
}

CODES_FLOW_CASH = {
    "6.01"       : "operatingActivities",
    "6.01.01.04" : "depreciationAmortization",
    "6.02"       : "investingActivities",
    "6.02.01"    : "capex",
    "6.03"       : "financingActivities",
    "6.03.05"    : "dividendPaidControllingInterest",
    "6.03.06"    : "dividendPaidNonControllingInterest"
}

def _get_file_name(pattern, year):
    return "files/financials/itr_cia_aberta_" + str(year) + "/itr_cia_aberta_" + pattern + "_" + str(year) + ".csv"

def _get_quarter(date):
    _quarters = {
        "03-31" : "1T",
        "06-30" : "2T",
        "09-30" : "3T",
        "12-31" : "4T"
    }
    _quarter = _quarters[date[5:10]] + date[0:4]
    return _quarter

def _get_report(registry_number, year, header, codes, file_name, order):
    _encoding = "latin-1"
    _result = {}
    with open(file_name, newline = "", encoding = _encoding) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter = ";")
        _report = {}
        _date = None
        for row in csv_reader:
            if row[header["CNPJ_CIA"]] == registry_number and row[header["ORDEM_EXERC"]] == order:
                if row[header["DT_FIM_EXERC"]] != _date:
                    if _date != None:
                        _result[_date] = _report
                        _report = {}

                    _date = row[header["DT_FIM_EXERC"]]
                
                if row[header["CD_CONTA"]] in codes.keys():
                    _report[codes[row[header["CD_CONTA"]]]] = row[header["VL_CONTA"]]
        _result[_date] = _report

    return _result

def _get_assets(registry_number, year, order):
    _file_name = _get_file_name("BPA_ind", year)
    return _get_report(registry_number, year, BP_HEADER, CODES_ASSETS, _file_name, order)

def _get_liabilities(registry_number, year, order):
    _file_name = _get_file_name("BPP_ind", year)
    return _get_report(registry_number, year, BP_HEADER, CODES_LIABILITIES, _file_name, order)

def _get_income(registry_number, year, order):
    _file_name = _get_file_name("DRE_ind", year)
    return _get_report(registry_number, year, DRE_HEADER, CODES_INCOME, _file_name, order)

def _get_flow_cash(registry_number, year, order):
    _file_name = _get_file_name("DFC_MI_ind", year)
    return _get_report(registry_number, year, DRE_HEADER, CODES_FLOW_CASH, _file_name, order)

def _merge(dictionary1, dictionary2):
    _result = {**dictionary1, **dictionary2}
    return _result

def _return_value(key, dictionary):
    if key in dictionary:
        return dictionary[key]

    return {}

def get(registry_number, year):
    _financials = {}

    _assets = _merge(_get_assets(registry_number, year, ORDER_PREVIOUS), _get_assets(registry_number, year, ORDER_LAST))
    _liabilities = _merge(_get_liabilities(registry_number, year, ORDER_PREVIOUS), _get_liabilities(registry_number, year, ORDER_LAST))
    _income = _get_income(registry_number, year, ORDER_LAST) # TO-DO: ORDER_PREVIOUS - How to get 4TXXXX?
    _flow_cash = _get_flow_cash(registry_number, year, ORDER_LAST) # TO-DO: ORDER_PREVIOUS - How to get 4TXXXX?

    for _date in _assets:
        if _date != None:
            _quarter = _get_quarter(_date)
            _financial = {
                "date" : _date,
                "quarter" : _quarter,
                "assets" : _return_value(_date, _assets),
                "liabilities" : _return_value(_date, _liabilities),
                "income" : _return_value(_date, _income),
                "flow_cash" : _return_value(_date, _flow_cash)
            }
            _financials[_quarter] = _financial

    return _financials

if __name__ == "__main__":
    # get("07.526.557/0001-00", 2021)
    print(get("07.526.557/0001-00", 2021))