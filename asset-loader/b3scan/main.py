#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
File: main.py
Author: Breno Leonhardt Pacheco
Email: brenoleonhardt@gmail.com
Last Modified: February 24, 2021
Description: main module
"""

import sys
import os
import getopt
import scanner
import info
import control
import fio

DEFAULTS = [
    "1", "1.01", "2", "2.01", "2.02", "2.03", "3.01", "3.02", "3.03", "3.04",
    "3.05", "3.06", "3.07", "3.08", "3.09", "3.10", "3.11", "6.01", "6.02",
    "6.03",
]

def strip_args():
    """parse command arguments"""
    try:
        files = []
        config = ""
        out = ""
        opts, files = getopt.getopt(
            sys.argv[1:], "c:o:hvi",
            ["config=", "out=", "help", "info", "version"])
        control.debug('args - opts: ' + str(opts) + '\tfiles: ' + str(files))
        for opt, arg in opts:
            if opt in ('-h', '--help'):
                info.usage()
                sys.exit(0)
            if opt in ('-i', '--info'):
                info.info()
                sys.exit(0)
            if opt in ('-v', '--version'):
                info.version()
                sys.exit(0)
            if opt in ('-o', '--out'):
                out = arg
            if opt in ('-c', '--config'):
                config = arg
            if opt in ('-d', '--debug'):
                os.environ['DEBUG'] = 1
        if len(files) <= 0:
            raise Exception("no file provided")
        return {"files": files, "config": config, "out": out}
    except Exception as err:  # pylint: disable=broad-except
        control.error(err)


def init():
    """main logic of the program"""
    codes = DEFAULTS
    fout = sys.stdout
    args = strip_args()
    if args['config']:
        cfile = fio.fopen(args['config'])
        codes = fio.configure(cfile)
        cfile.close()
    if args['out']:
        fout = fio.fopen(args['out'], mode="w")
    data = {}
    for file in args['files']:
        fin = fio.fopen(file, mode="r")
        scanner.scan(fin, codes, data)
        fin.close()
    fio.dump(data, fout)
    fout.close()


if __name__ == "__main__":
    init()
