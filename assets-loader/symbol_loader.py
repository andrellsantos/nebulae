import csv

def get_symbol(registry_number):
    # The CPNJ should be without the mask
    _registry_number = registry_number.replace(".", "").replace("/", "").replace("-", "")

    with open("files/emissor.csv", newline="") as csv_file:
        csv_reader = csv.reader(csv_file, delimiter = ",", quotechar = "\"")
        for row in csv_reader:
            if row[2] == _registry_number:
                return row[0]

    return None

def get_registry_number(symbol):
    with open("files/emissor.csv", newline="", encoding="UTF-8") as csv_file:
        csv_reader = csv.reader(csv_file, delimiter = ",", quotechar = "\"")
        for row in csv_reader:
            if row[0] == symbol:
                return row[2]

    return None

if __name__ == "__main__":
    print(get_symbol("07.526.557/0001-00"))
    print(get_registry_number("ABEV"))