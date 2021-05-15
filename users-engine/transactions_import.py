import csv
import requests
import sys

USERS_API_URL = "http://localhost:3001/api/users/"

def _checkArgs(args):
    _email = ""
    _password = ""
    arg = 0
    while arg < len(args):
        if args[arg] == "-e":
            _email = args[arg + 1]
            arg += 1
        elif args[arg] == "-p":
            _password = args[arg + 1]
            arg += 1
        arg += 1
    return _email, _password

def _login(email, password):
    _url = USERS_API_URL + "login"
    _request = {
        "email": email,
        "password": password
    }
    res = requests.post(_url, json = _request)
    if res.status_code == 200:
        _body = res.json()
        return _body["token"]
    else:
        return None

def _logout(token):
    _url = USERS_API_URL + "logout"
    res = requests.post(_url, headers={'Authorization': _token})

def _send_transaction(token, data):
    _url = USERS_API_URL + "me/transactions"
    _token = 'Bearer ' + token
    res = requests.post(_url, headers={'Authorization': _token}, json = data)
    return "POST result: %s" % str(res.status_code)

def _import():
    _email, _password = _checkArgs(sys.argv)
    _token = _login(_email, _password)

    if _token != None:
        _file_name = "files/transactions.csv"
        _encoding = "utf-8"
        with open(_file_name, newline = "", encoding = _encoding) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter = ";")
            for row in csv_reader:
                _transaction = {
                    "country" : "BR",
                    "ticker"  : row[0],
                    "date"    : row[1],
                    "price"   : row[2],
                    "amount"  : row[3]
                }
                _message = _send_transaction(_token, _transaction)
                print(row, _message)
        _logout(_token)

if __name__ == "__main__":
    _import()