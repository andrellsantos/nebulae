import csv
import json

def get(registry_number, symbol):
    _encoding = "latin-1"
    with open("files/cad_cia_aberta.csv", newline = "", encoding = _encoding) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter = ";")
        for row in csv_reader:
            if row[0] == registry_number:
                # 'full_name', 'full_name', 'short_name', 'registry_number', 'exchange_comission_code', 'sector', 'description'
                _full_name = row[1]
                _short_name = row[2]
                _exchange_comission_code = row[9]
                _sector = row[10].upper()
                _desciption = ""

                _company = {
                    "company" : {
                        "fullName" : _full_name,
                        "shortName" : _short_name,
                        "registryNumber" : registry_number,
                        "sector" : _sector
                    },
                    "country" : "BR",
                    "symbol" : symbol,
                    "exchangeComissionCode" : _exchange_comission_code,
                    "active" : "true"
                }

                return _company

    return None

if __name__ == "__main__":
    print(get("07.526.557/0001-00", "ABEV"))