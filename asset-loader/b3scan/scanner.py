#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
File: scanner.py
Author: Breno Leonhardt Pacheco
Email: brenoleonhardt@gmail.com
Last Modified: February 24, 2021
Description: scanner function
"""

import sys
import json
import re
import control


def scan(file, codes, data):
    """ ... """
    control.debug('scanning ' + file.name)
    idx = {
        "CD_CVM": -1,
        "ORDEM_EXERC": -1,
        "DT_REFER": -1,
        "CD_CONTA": -1,
        "VL_CONTA": -1
    }
    try:
        header = file.readline().split(sep=";")
        for code in idx:
            idx[code] = header.index(code)
        for line in file:
            fields = line.split(sep=";")
            cd_cvm = fields[idx['CD_CVM']]
            dt_refer = fields[idx['DT_REFER']]
            ordem_exerc = fields[idx['ORDEM_EXERC']]
            cd_conta = fields[idx['CD_CONTA']]
            vl_conta = fields[idx['VL_CONTA']]
            if ordem_exerc == "ÚLTIMO": # ou penúltimo?
                if cd_conta in codes:
                    if cd_cvm not in data:
                        data[cd_cvm] = {}
                    if cd_conta not in data[cd_cvm]:
                        data[cd_cvm][cd_conta] = {}
                    data[cd_cvm][cd_conta][dt_refer] = vl_conta
    except Exception as e:
        raise e
