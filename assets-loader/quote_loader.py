BDI_CODE = "02"

def _get_file_name(year):
    return "files/quotes/COTAHIST_A" + str(year) + ".TXT"

def get(symbol, year):
    _result = {}
    _report = []
    _ticker = None
    _file_name = _get_file_name(year)
    _encoding = "latin-1"
    with open(_file_name, "r", encoding = _encoding) as txt_file:
        txt_reader = txt_file.readlines()
        for row in txt_reader:
            if row[12:16] == symbol and row[10:12] == BDI_CODE:
                _ticker = row[12:18].rstrip()
                _quote = {
                    "ticker" : _ticker,
                    "date"   : row[2:6] + "-" + row[6:8] + "-" + row[8:10],
                    "open"   : float(row[56:67] + "." + row[67:69]),
                    "low"    : float(row[82:93] + "." + row[93:95]),
                    "high"   : float(row[69:80] + "." + row[80:82]),
                    "close"  : float(row[108:119] + "." + row[119:121]),
                    "volume" : int(row[152:170])
                }
                if _ticker in _result.keys():
                    _report = _result[_ticker]
                    _report.append(_quote)
                    _result[_ticker] = _report
                else:
                    _result[_ticker] = [_quote]

    return _result

if __name__ == "__main__":
    print(get("ABEV", 2021))