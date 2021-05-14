import company_loader
import financial_loader
import json
import requests
import symbol_loader
import sys

ASSETS_API_URL = "http://localhost:3002/api/assets/br/stocks/"
FINANCIAL_YEARS = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]

def _checkArgs(args):
    _symbol = ""
    _financial_year = 0
    arg = 0
    while arg < len(args):
        if args[arg] == "-c":
            _symbol = args[arg + 1]
            arg += 1
        elif args[arg] == "-f":
            _financial_year = args[arg + 1]
            if _financial_year != "--all":
                _financial_year = int(_financial_year)

            arg += 1
        arg += 1
    return _symbol.upper(), _financial_year

def _persist_data(url, entity, data):
    res = requests.get(url + entity, verify = False)
    if res.status_code == 200:
        res = requests.patch(url + entity, json = data)
        return "PATCH result: %s" % str(res.status_code)
    else:
        res = requests.post(url, json = data)
        return "POST result: %s" % str(res.status_code)


def _persist_stock(symbol, company): 
    _url = ASSETS_API_URL
    _message = _persist_data(_url, symbol, company)
    print("[%s][Company] %s" % (symbol, _message))


def _persist_financial(symbol, quarter, financial): 
    _url = ASSETS_API_URL + symbol + "/financials/"
    _message = _persist_data(_url, quarter, financial)
    print("[%s][Financial %s] %s" % (symbol, quarter, _message))

def _load():
    _symbol, _financial_year = _checkArgs(sys.argv)

    # 1 - Procura pelo simbolo no arquivo "emissor.csv" e armazena o CNPJ
    # 2 - Tendo o CPNJ, procura no arquivo "cad_cia_aberta.csv" pelos dados da empresa
    # 3 - Cria o JSON com os dados da empresa para salvar em um arquivo ou persistir no serviço de assets
    if len(_symbol) > 0:
        _registry_number = symbol_loader.get_registry_number(_symbol)
        if _registry_number != None:
            _registry_number = _registry_number[0:2] + "." + _registry_number[2:5] + "." + _registry_number[5:8] + "/" + _registry_number[8:12] + "-" + _registry_number[12:14]
            # _company = company_loader.get(_registry_number, _symbol)
            # _persist_stock(_symbol, _company)

            if isinstance(_financial_year, str) and _financial_year == "--all":
                for _year in FINANCIAL_YEARS:
                    _financials = financial_loader.get(_registry_number, _year)
                    for _quarter in _financials:
                        _persist_financial(_symbol, _quarter, _financials[_quarter])
            elif isinstance(_financial_year, int) and _financial_year > 0:
                _financials = financial_loader.get(_registry_number, _financial_year)
                for _quarter in _financials:
                    _persist_financial(_symbol, _quarter, _financials[_quarter])

if __name__ == "__main__":
    _load()