"""
File: symbol
Author: g:snips_author
Email: g:snips_email
Github: g:snips_github
Description: query symbol for a given company
"""

from bs4 import BeautifulSoup as bs
import requests
import base64
import cache
import control
import ssl #  TODO: fix this
import sys

_ID_URL = "https://sistemaswebb3-listados.b3.com.br/isinProxy/IsinCall/GetTextDownload/"
_DOWNLOAD_URL = "https://sistemaswebb3-listados.b3.com.br/isinProxy/IsinCall/GetFileDownload/"

def _url():
    """docstring for _download_url"""
    r = requests.get(_ID_URL, verify=False)
    if r.status_code == 200:
        codes = r.json()
        id = str(codes['geralPt']['id'])
        id_bytes = id.encode('ascii')
        base64_bytes = base64.b64encode(id_bytes)
        base64_id = base64_bytes.decode('ascii')
        url = _DOWNLOAD_URL + base64_id
        return url
    else:
        control.error("Unable to access " + _ID_URL)

# file = EMISSOR.TXT
def _parse_symbols(file):
    """docstring for _parse_symbols"""
    symbols = []
    for line in file:
        fields = line.split(sep=",")
        symbol = fields[0].strip('"')
        registry = fields[2].strip('"')
        if len(symbol) == 0 or len(registry) == 0:
            continue
        string = registry + "=" + symbol
        symbols.append(string)
    return symbols

def _normalize_registry(registryNumber):
    """docstring for _normalize_registry"""
    return registryNumber.replace('.','').replace('/','').replace('-','')

def _load_symbols():
    """docstring for _load_symbols"""
    symbols = cache.get('symbols.txt')
    if not symbols:
        zip = cache.get('symbols.zip')
        if not zip:
            url = _url()
            zip = cache.load(url, 'symbols.zip')
        file = cache.extract(zip, ["EMISSOR.TXT"])[0]
        symbol_list = _parse_symbols(file)
        file.close()
        cache.store(symbol_list, 'symbols.txt')
    return cache.get('symbols.txt')

def get(registryNumber):
    """get a ISIN base symbol given a company's registry number """
    symfile = _load_symbols()
    symbol = False
    normalized_nr = _normalize_registry(registryNumber)
    if symfile:
        for line in symfile:
            nr = line.split(sep="=")[0]
            if nr == normalized_nr:
                symbol = line.split(sep="=")[1][:-1]
                break
        symfile.close()
        return symbol
    else:
        control.error("Unable to access symbol registry")
    return False

if __name__ == "__main__":
    print(get("08.807.432/0001-10"))
