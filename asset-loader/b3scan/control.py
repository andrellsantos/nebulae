#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
File: control.py
Author: Breno Leonhardt Pacheco
Email: brenoleonhardt@gmail.com
Last Modified: February 24, 2021
Description: helper module w/ error/log/warn functions
"""
import sys
import os

def error(err):
    """prints error exception/message to stderr and quit w/ error code"""
    print("Error: " + str(err) + ". See --help option", file=sys.stderr)
    sys.exit(1)

def warn(err):
    """prints warn exception/message to stderr"""
    print("Warn: " + str(err), file=sys.stderr)

def debug(err):
    """prints debug message"""
    if os.environ.get('DEBUG'):
        print("Debug: " + str(err), file=sys.stdout)
