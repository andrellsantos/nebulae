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
Scans csv report files from companies listed in the the brazilian stock
exchange B3 S.A. and outputs formatted json stream with specified data.
The files follow the format provided by the brazilian's Securities and
Exchange Commission.

For available files, visit http://dados.cvm.gov.br/dados/CIA_ABERTA
For report file format, see [Report file format] --info
For output format, see [Configuration file] --info
"""

HELP = """
Usage:
\tb3scan [OPTIONAL] <file>...
""" + DESCRIPTION + """
Options:
\t-c, --config=FILE
\t\tConfiguration file used to parse csv report.
\t-o, --output=FILE
\t\tOutput file name. Defaults to stdout

\t-v, --version
\t\tPrint program version.
\t-h, --help
\t\tPrint help information.
\t-i, --info
\t\tPrint information about the report file format.
\t\tPrint information about configuration file and output format.
"""

INFO = """
Report file format:
\tMultiple types of report are provided by the CVM in CSV format. The format
\tis always the same following the example below with different fields:
\t1\t  CNPJ_CIA;DT_REFER;VERSAO;DENOM_CIA;CD_CVM;...
\t2\t  00.001.180/0001-26;2011-03-31;1;CENTRAIS ELET...
\t3\t  00.001.180/0001-26;2011-03-31;1;CENTRAIS ELET...

Configuration file:
\tThe configuration file determines what to output from the report files.
\tIt must be a JSON array containing the CD_CONTA entries to be matched
\taccording to B3's report file format. Default configuration:
\t[
\t\t"1", "1.01",  "1.01.01",  "1.01.02",  "1.01.03",  "1.01.04", 
\t\t"1.02", "1.02.01",  "1.02.02",  "1.02.03",  "1.02.04",  "2", 
\t\t"2.01",  "2.01.04",  "2.02",  "2.02.04",   "2.03",   "3.01", 
\t\t"3.02", "3.03",  "3.04",  "3.05",  "3.06",  "3.07",  "3.08", 
\t\t"3.09",  "3.10",  "3.11",  "6.01",   "6.01.01.04",   "6.02", 
\t\t"6.02.01", "6.03", "6.03.05", "6.03.06"
\t]
\tOutput is a json object indexed by the company's CD_CVM and entry
\tmatches indexed by it's unique code CD_CONTA and reference date
\tDT_REFER, with value VL_CONTA. Example output:
\t\t{
\t\t    "002437": {
\t\t        "1": {
\t\t            "2011-09-30": "152944842.0000000000",
\t\t            "2012-03-30": "250944944.0000000000",
\t\t            ...
\t\t        },
\t\t        "1.01": {
\t\t            "2011-09-30": "30867487.0000000000",
\t\t            ...
\t\t        },
\t\t        ...
\t\t    },
\t\t    "014451": {
\t\t        ...
\t\t    },
\t\t    ...
\t\t}
"""

def usage():
    """Prints help pages"""
    print(HELP.expandtabs(2))

def info():
    """Prints information on configuration file and output format"""
    print(INFO.expandtabs(2))

def version():
    """Prints version information"""
    print('{}\nVersion: {}\nLicense:{}\n{}'.format(NAME, VERSION, LICENSE,
                                                   DESCRIPTION).expandtabs(2))
