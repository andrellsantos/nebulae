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


def read(file, codes):
    """reads contents from csv file and returns data matching codes"""
    control.debug('scanning ' + file.name)
    data = []
    indexes = {}
    header = file.readline().split(sep=";")
    for code in codes:
        if code in header:
            indexes[code] = header.index(code)
        else:
            return False
    for line in file:
        fields = line.split(sep=";")
        entry = {}
        for code in codes:
            if code in header:
                entry[code] = fields[indexes[code]]
        data.append(entry)
    return data

