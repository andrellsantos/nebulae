#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
File: main.py
Author: Breno Leonhardt Pacheco
Email: brenoleonhardt@gmail.com
Last Modified: February 24, 2021
Description: main module
"""

import re
import sys
import os
import getopt
import requests
import scanner
import info
import control
import fio
import company
import reports
import symbol

def strip_args():
    """parse command arguments"""
    try:
        object  = False
        company = False
        out     = False
        quarter = False
        opts, object = getopt.getopt(
            sys.argv[1:], "c:o:q:hvid",
            ["company=", "output=", "quarter=", "help", "version", "debug"])
        control.debug('args - opts: ' + str(opts) + '\tobject: ' + str(object))
        for opt, arg in opts:
            if opt in ('-h', '--help'):
                info.usage()
                sys.exit(0)
            if opt in ('-v', '--version'):
                info.version()
                sys.exit(0)
            if opt in ('-o', '--output'):
                out = arg
            if opt in ('-c', '--company'):
                company = arg
            if opt in ('-q', '--quarter'):
                quarter = arg
            if opt in ('-d', '--debug'):
                os.environ['DEBUG'] = "1"
        if len(object) != 1 or object[0] not in [ "summary", "report" ]:
            control.error("Invalid arguments provided")
        return {
            "object": object[0],
            "company": company,
            "out": out,
            "quarter": quarter
        }
    except Exception as err:  # pylint: disable=broad-except
        control.error(err)

def _check_url(url):
    """docstring for _check_url"""
    try:
        request = requests.get(url)
    except requests.exceptions.ConnectionError as err:
        control.error('URL is not connecting...')

def init():
    """main logic of the program"""
    args = strip_args()
    data = {}
    if args['object'] == "summary":
        data = company.load({'company': args["company"]})
    elif args['object'] == "report":
        data = reports.load({'quarter': args['quarter'], 'company': args['company']})
    if args['out']:
        if re.match('http', args['out']):
            url = args['out']
            _check_url(url)
            if args['object'] == "summary":
                for entry in data:
                    fio.post(entry, url)
            if args['object'] == "report":
                for entry in data:
                    sym = symbol.get(entry['registryNumber'])
                    if sym:
                        fio.post(entry, url, sym + '/financials')
                    else:
                        control.warn("symbol not found for " + entry['registryNumber'])
        else:
            file = fio.fopen(args['out'], mode="w")
            fio.dump(data, file)
            file.close()
    else:
        fio.dump(data, sys.stdout)


if __name__ == "__main__":
    init()
