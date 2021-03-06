#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
File: info.py
Author: Breno Leonhardt Pacheco
Email: brenoleonhardt@gmail.com
Last Modified: February 24, 2021
Description: information about the program.
"""

NAME = "b3scan"
VERSION = "1.00"
LICENSE = "Released under MIT License"
DESCRIPTION = """
Scans company reports from the brazilian stock exchange B3 S.A. and outputs
formatted data. Use sources provided by the brazilian's Securities and
Exchange Commission (CVM).

For available files, visit http://dados.cvm.gov.br/dados/CIA_ABERTA
"""

HELP = """
USAGE:
\tb3scan [OPTION...] OBJECT
""" + DESCRIPTION + """
OPTIONS:
\t-o, --output={FILE|URL}
\t\tOutput file name or URL for sending post request
\t\tDefault stdout
\t-c, --company=COMPANY
\t\tOutput information from a single company identified by it's registry nr.
\t-q, --quarter=QUARTER
\t\tOutput information from a single quarter, for example 2T20
\t-y, --year=YEAR
\t\tOutput information from a single year, for example 2021 #TODO
\t-d, --debug
\t\tPrint debug information.

\t-v, --version
\t\tPrint program version.
\t-h, --help
\t\tPrint help information.

OBJECT:
\tsummary
\t\tpull information from listed companies such as name and
\treports
\t\tpulls financial information from company reports

EXAMPLE:
\tb3scan summary
\tb3scan -c 004693 -q 3T11 report
\tb3scan summary -o http://localhost:8080
\tb3scan -c 004693 report -o 004693_report.json
"""

def usage():
    """Prints help pages"""
    print(HELP.expandtabs(2))

def version():
    """Prints version information"""
    print('{}\nVersion: {}\nLicense:{}\n{}'.format(NAME, VERSION, LICENSE,
                                                   DESCRIPTION).expandtabs(2))
