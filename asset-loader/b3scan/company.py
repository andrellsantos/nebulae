"""
File: company
Author: g:snips_author
Email: g:snips_email
Github: g:snips_github
Description: returns company summary data
"""

import os
import sys
import fio
import control
import scanner
import cache
import re
import symbol

URL = "http://dados.cvm.gov.br/dados/CIA_ABERTA/CAD/DADOS/cad_cia_aberta.csv"

FIELDS = [
    "CNPJ_CIA",
    "DENOM_SOCIAL",
    "DENOM_COMERC",
    "DT_REG",
    "DT_CONST",
    "SIT",
    "CD_CVM",
    "TP_MERC",
    "CATEG_REG",
    "SIT_EMISSOR",
    "MUN",
    # "DT_CANCEL",
    # "MOTIVO_CANCEL",
    # "DT_INI_SIT",
    # "SETOR_ATIV",
    # "DT_INI_CATEG",
    # "DT_INI_SIT_EMISSOR",
    # "CONTROLE_ACIONARIO",
    # "TP_ENDER",
    # "LOGRADOURO",
    # "COMPL",
    # "BAIRRO",
    # "UF",
    # "PAIS",
    # "CEP",
    # "DDD_TEL",
    # "TEL",
    # "DDD_FAX",
    # "FAX",
    # "EMAIL",
    # "TP_RESP",
    # "RESP",
    # "DT_INI_RESP",
    # "LOGRADOURO_RESP",
    # "COMPL_RESP",
    # "BAIRRO_RESP",
    # "MUN_RESP",
    # "UF_RESP",
    # "PAIS_RESP",
    # "CEP_RESP",
    # "DDD_TEL_RESP",
    # "TEL_RESP",
    # "DDD_FAX_RESP",
    # "FAX_RESP",
    # "EMAIL_RESP",
    # "CNPJ_AUDITOR",
    # "AUDITOR",
]

FILTERS = [
        { "code": "SIT",         'match': "ATIVO"            },
        { "code": "TP_MERC",     'match': "BOLSA"            },
        { "code": "CATEG_REG",   'match': "Categoria A"      },
        { "code": "SIT_EMISSOR", 'match': "FASE OPERACIONAL" },
]

MAPS = [
        { "code": "CNPJ_CIA",     "translation": "registryNumber"        },
        { "code": "DENOM_SOCIAL", "translation": "fullName"              }, # Regra para inserção: Normalizar SA, S/A e S.A. para S.A.
        { "code": "DENOM_COMERC", "translation": "shortName"             }, # Regra para inserção: Remover SA,    S/A e S.A.
        { "code": "DT_REG",       "translation": "exchangeRegistryDate"  },
        { "code": "DT_CONST",     "translation": "foundationDate"        },
        { "code": "CD_CVM",       "translation": "exchangeComissionCode" },
        { "code": "MUN",          "translation": "headquarter"           },
]

RULES = [
        { "code": "fullName",  "pat": "S[/.]?A\.?", "replace": "S.A." },
        { "code": "shortName", "pat": "S[/.]?A\.?", "replace": ""    }
]

def _map(data, maps, filters, rules):
    """docstring for map"""
    resolved_data = []
    for entry in data:
        resolved_entry = {}
        skip = False
        for filter in filters:
            if entry[filter['code']] != filter['match']:
                skip = True
        if skip:
            continue
        for map in maps:
            resolved_entry[map['translation']] = entry[map['code']]
        for rule in rules:
            resolved_entry[rule['code']] = re.sub(rule['pat'], rule['replace'],
                                                  resolved_entry[rule['code']])
        resolved_data.append(resolved_entry)
    return resolved_data

def _format(data):
    """docstring for _format"""
    result = []
    for entry in data:
        formatted = {}
        formatted['company'] = entry.copy()
        formatted['country'] = 'BR'
        formatted['symbol'] = symbol.get(entry['registryNumber'])
        formatted['exchangeComissionCode'] = entry['exchangeComissionCode']
        formatted['active'] = True
        formatted['symbol'] = symbol.get(entry['registryNumber'])
        del formatted['company']['exchangeComissionCode']
        result.append(formatted)
    return result

def load(args={}):
    """loads data from all companies"""
    file = cache.load(URL)
    if args and "company" in args and args["company"]:
        FILTERS.append( { "code": "CD_CVM", 'match': args["company"] })
    raw_data = scanner.read(file, FIELDS)
    file.close()
    data = _map(raw_data, MAPS, FILTERS, RULES)
    data = _format(data)
    return data

if __name__ == "__main__":
    print(load())
